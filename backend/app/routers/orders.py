"""Orders router for creating demo orders, fetching tracking timeline, and cancelling orders."""

import uuid
import logging
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException
from app.db.supabase import demo_store, supabase_client
from app.schemas.schemas import OrderCreate, OrderResponse, OrderTimelineStep
from app.config import get_settings

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("", response_model=OrderResponse)
def create_order(order_data: OrderCreate):
    """Create a new demo order and earn rewards points."""
    settings = get_settings()

    user_identifier = order_data.user_id or order_data.user_email or (order_data.address.email if order_data.address else None)
    if not user_identifier:
        raise HTTPException(status_code=401, detail="Authentication required. Please log in to your NIX account to place an order.")

    order_id = f"NIX-{uuid.uuid4().hex[:6].upper()}"
    now = datetime.now()
    delivery_date = (now + timedelta(days=3)).strftime("%b %d, %Y")

    total = sum(item.quantity * (item.price if item.price is not None else settings.default_product_price) for item in order_data.items)

    timeline = [
        OrderTimelineStep(label="Order Confirmed", completed=True, timestamp=now.strftime("%I:%M %p, %b %d")),
        OrderTimelineStep(label="Packed & Prepared", completed=True, timestamp=(now + timedelta(hours=2)).strftime("%I:%M %p, %b %d")),
        OrderTimelineStep(label="Shipped", completed=False, timestamp=None),
        OrderTimelineStep(label="Out for Delivery", completed=False, timestamp=None),
        OrderTimelineStep(label="Delivered", completed=False, timestamp=delivery_date),
    ]

    order = {
        "id": order_id,
        "user_id": order_data.user_id,
        "user_email": order_data.user_email or order_data.address.email,
        "items": [item.model_dump() for item in order_data.items],
        "address": order_data.address.model_dump(),
        "total": total,
        "currency": settings.currency_symbol,
        "status": "Confirmed",
        "delivery_estimate": delivery_date,
        "timeline": [t.model_dump() for t in timeline],
        "created_at": now.isoformat(),
    }

    # Save to in-memory store
    demo_store.orders.insert(0, order)

    # Save to Supabase table if available
    if supabase_client:
        try:
            supabase_client.table("orders").upsert({
                "id": order["id"],
                "user_id": order["user_id"],
                "user_email": order["user_email"],
                "items": order["items"],
                "address": order["address"],
                "total": order["total"],
                "currency": order["currency"],
                "status": order["status"],
                "delivery_estimate": order["delivery_estimate"],
                "timeline": order["timeline"],
                "created_at": order["created_at"],
                "updated_at": now.isoformat(),
            }).execute()
        except Exception as e:
            logger.warning(f"Could not persist order {order_id} to Supabase orders table: {e}")

    # Award rewards points for purchase
    points_earned = settings.points_per_purchase
    demo_store.rewards["points"] += points_earned
    demo_store.rewards["history"].insert(
        0,
        {
            "action": f"Purchased Order #{order_id}",
            "points": points_earned,
            "timestamp": now.strftime("%b %d, %Y"),
        },
    )

    return order


@router.get("", response_model=list[OrderResponse])
def get_orders():
    """Get all past orders for the demo user."""
    if supabase_client:
        try:
            res = supabase_client.table("orders").select("*").order("created_at", desc=True).execute()
            if res.data and len(res.data) > 0:
                return res.data
        except Exception as e:
            logger.warning(f"Could not query orders from Supabase: {e}")
    return demo_store.orders


@router.get("/{order_id}", response_model=OrderResponse)
def get_order_by_id(order_id: str):
    """Get order status and tracking timeline by ID."""
    if supabase_client:
        try:
            res = supabase_client.table("orders").select("*").ilike("id", order_id).execute()
            if res.data and len(res.data) > 0:
                return res.data[0]
        except Exception as e:
            logger.warning(f"Could not query order {order_id} from Supabase: {e}")

    for order in demo_store.orders:
        if order["id"].upper() == order_id.upper():
            return order
    raise HTTPException(status_code=404, detail="Order not found")


@router.post("/{order_id}/cancel", response_model=OrderResponse)
def cancel_order(order_id: str):
    """Cancel an active order."""
    now = datetime.now().strftime("%I:%M %p, %b %d")
    now_iso = datetime.now().isoformat()

    # Cancel in Supabase
    if supabase_client:
        try:
            res = supabase_client.table("orders").select("*").ilike("id", order_id).execute()
            if res.data and len(res.data) > 0:
                existing = res.data[0]
                if existing["status"] == "Cancelled":
                    raise HTTPException(status_code=400, detail="Order is already cancelled")
                if existing["status"] == "Delivered":
                    raise HTTPException(status_code=400, detail="Delivered orders cannot be cancelled")

                updated_timeline = list(existing.get("timeline", []))
                updated_timeline.append({
                    "label": "Order Cancelled",
                    "completed": True,
                    "timestamp": now
                })

                up_res = supabase_client.table("orders").update({
                    "status": "Cancelled",
                    "timeline": updated_timeline,
                    "updated_at": now_iso
                }).ilike("id", order_id).execute()

                if up_res.data and len(up_res.data) > 0:
                    return up_res.data[0]
        except HTTPException:
            raise
        except Exception as e:
            logger.warning(f"Could not cancel order {order_id} in Supabase: {e}")

    for order in demo_store.orders:
        if order["id"].upper() == order_id.upper():
            if order["status"] == "Cancelled":
                raise HTTPException(status_code=400, detail="Order is already cancelled")
            if order["status"] == "Delivered":
                raise HTTPException(status_code=400, detail="Delivered orders cannot be cancelled")

            order["status"] = "Cancelled"
            order["timeline"].append({
                "label": "Order Cancelled",
                "completed": True,
                "timestamp": now
            })
            return order

    raise HTTPException(status_code=404, detail="Order not found")

