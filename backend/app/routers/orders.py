"""Orders router for creating demo orders and fetching order tracking timeline."""

import uuid
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException
from app.db.supabase import demo_store
from app.schemas.schemas import OrderCreate, OrderResponse, OrderTimelineStep
from app.config import get_settings

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("", response_model=OrderResponse)
def create_order(order_data: OrderCreate):
    """Create a new demo order and earn rewards points."""
    settings = get_settings()
    
    order_id = f"NIX-{uuid.uuid4().hex[:6].upper()}"
    now = datetime.now()
    delivery_date = (now + timedelta(days=3)).strftime("%b %d, %Y")
    
    total = sum(item.quantity * settings.default_product_price for item in order_data.items)
    
    timeline = [
        OrderTimelineStep(label="Order Confirmed", completed=True, timestamp=now.strftime("%I:%M %p, %b %d")),
        OrderTimelineStep(label="Packed & Prepared", completed=True, timestamp=(now + timedelta(hours=2)).strftime("%I:%M %p, %b %d")),
        OrderTimelineStep(label="Shipped", completed=False, timestamp=None),
        OrderTimelineStep(label="Out for Delivery", completed=False, timestamp=None),
        OrderTimelineStep(label="Delivered", completed=False, timestamp=delivery_date),
    ]
    
    order = {
        "id": order_id,
        "items": [item.model_dump() for item in order_data.items],
        "address": order_data.address.model_dump(),
        "total": total,
        "currency": settings.currency_symbol,
        "status": "Confirmed",
        "delivery_estimate": delivery_date,
        "timeline": [t.model_dump() for t in timeline],
        "created_at": now.isoformat(),
    }
    
    demo_store.orders.insert(0, order)
    
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
    return demo_store.orders


@router.get("/{order_id}", response_model=OrderResponse)
def get_order_by_id(order_id: str):
    """Get order status and tracking timeline by ID."""
    for order in demo_store.orders:
        if order["id"].upper() == order_id.upper():
            return order
    raise HTTPException(status_code=404, detail="Order not found")
