import logging
from typing import Optional, Dict, Any, List
from app.config import settings

logger = logging.getLogger(__name__)

# Supabase Client Initialization
try:
    from supabase import create_client, Client
    if settings.SUPABASE_URL and (settings.SUPABASE_PUBLIC_KEY or settings.SUPABASE_SERVICE_ROLE_KEY):
        key = settings.SUPABASE_SERVICE_ROLE_KEY or settings.SUPABASE_PUBLIC_KEY
        supabase_client: Optional[Client] = create_client(settings.SUPABASE_URL, key)
    else:
        supabase_client = None
except Exception as e:
    logger.warning(f"Could not initialize Supabase client: {e}. Falling back to in-memory DemoStore.")
    supabase_client = None


class DemoStore:
    """In-memory store to guarantee flawless prototype demos without external DB dependency."""
    def __init__(self):
        self.reset()

    def reset(self):
        self.product: Dict[str, Any] = {
            "id": "nix-rescue-stick-01",
            "name": "NIX Period Stain Rescue Stick",
            "tagline": "Instant, discreet emergency stain removal on the go.",
            "price": 79,
            "original_price": 99,
            "currency": "₹",
            "variants": [
                {
                    "id": "10ml",
                    "name": "10ml (5 uses)",
                    "size": "10ml",
                    "uses": "5 uses",
                    "price": 79,
                    "original_price": 99,
                    "in_stock": True,
                    "image": "/images/10ml-without-packaging.png",
                    "packaging_image": "/images/10ml-with-packaging.png",
                },
                {
                    "id": "20ml",
                    "name": "20ml (10 uses)",
                    "size": "20ml",
                    "uses": "10 uses",
                    "price": 129,
                    "original_price": 159,
                    "in_stock": True,
                    "image": "/images/20ml-without-packaging.png",
                    "packaging_image": "/images/20ml-with-packaging.png",
                },
            ],
            "rating": 4.9,
            "review_count": 1284,
            "in_stock": True,
            "description": "NIX is a compact, handbag-ready period stain emergency rescue stick formulated with active plant enzymes to instantly dissolve fresh or set-in period blood stains without water rinsing required.",
            "images": [
                "/images/10ml-with-packaging.png",
                "/images/10ml-without-packaging.png",
                "/images/20ml-with-packaging.png",
                "/images/20ml-without-packaging.png"
            ],
            "highlights": [
                "Plant-Based Enzyme Formula",
                "Color-Safe on All Fabrics",
                "Pocket-Sized Handbag Companion",
                "Zero Water Rinsing Required"
            ],
            "details_accordion": [
                {
                    "title": "How to Use",
                    "content": "Dab NIX directly onto stain. Massage gently for 15-30 seconds. Blot with dry tissue. No water required."
                },
                {
                    "title": "Clean Ingredients",
                    "content": "Water, Plant-derived Protease Enzymes, Coconut Surfactant, Botanical Fragrance, Preservative System."
                },
                {
                    "title": "Fabric Compatibility",
                    "content": "Safe on cotton, linen, denim, polyester, silk, and activewear. Test on a hidden area for delicate fabrics."
                }
            ],
            "bundles": [
                {
                    "id": "bundle-1",
                    "title": "Starter Pocket Stick (10ml)",
                    "description": "1x 10ml NIX Stick (5 emergency uses)",
                    "price": 79,
                    "discount": "Save 20%"
                },
                {
                    "id": "bundle-2",
                    "title": "Standard Care Stick (20ml)",
                    "description": "1x 20ml NIX Stick (10 emergency uses)",
                    "price": 129,
                    "discount": "Most Popular — Save 20%"
                },
                {
                    "id": "bundle-3",
                    "title": "Duo Pack (2x 20ml)",
                    "description": "2x NIX 20ml Sticks (1 Handbag + 1 Desk)",
                    "price": 229,
                    "discount": "Best Value — Save 28%"
                }
            ]
        }
        self.orders: List[Dict[str, Any]] = [
          {
            "id": "NIX-884201",
            "items": [{"product_id": "nix-rescue-stick-01-20ml", "variant_id": "20ml", "variant_name": "20ml (10 uses)", "price": 129, "quantity": 2}],
            "address": {
              "name": "Ananya Sharma",
              "email": "ananya@example.com",
              "phone": "+91 98765 43210",
              "address": "Flat 402, Sunset Heights, North Campus",
              "city": "New Delhi",
              "state": "Delhi",
              "pincode": "110007"
            },
            "total": 258,
            "currency": "₹",
            "status": "In Transit",
            "delivery_estimate": "Tomorrow by 5 PM",
            "timeline": [
              {"label": "Order Confirmed", "completed": True, "timestamp": "Aug 28, 10:15 AM"},
              {"label": "Packed & Prepared", "completed": True, "timestamp": "Aug 28, 02:30 PM"},
              {"label": "Shipped", "completed": True, "timestamp": "Aug 29, 09:00 AM"},
              {"label": "Out for Delivery", "completed": False},
              {"label": "Delivered", "completed": False}
            ],
            "created_at": "2026-08-28T10:15:00Z"
          }
        ]
        self.rewards = {
          "points": 120,
          "tier": "Member",
          "history": [
            {"action": "Welcome Bonus", "points": 50, "timestamp": "Aug 1, 2026"},
            {"action": "Profile Completed", "points": 25, "timestamp": "Aug 5, 2026"},
            {"action": "Read NIX Note", "points": 45, "timestamp": "Aug 15, 2026"}
          ],
          "referral_code": "NIX-CARE4U"
        }
        self.waitlist: List[Dict[str, Any]] = [
          {"email": "earlybird@example.com", "created_at": "2026-08-20T12:00:00Z"}
        ]

demo_store = DemoStore()
