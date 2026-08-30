"""Supabase client initialization with in-memory fallback for demo mode."""

from __future__ import annotations

import uuid
from datetime import datetime, timedelta
from typing import Any

from app.config import get_settings

# ---------------------------------------------------------------------------
# Try to initialise the real Supabase client. If credentials are missing we
# fall back to a simple in-memory store so the demo works without a database.
# ---------------------------------------------------------------------------

_supabase_client = None

try:
    from supabase import create_client, Client

    settings = get_settings()
    if settings.supabase_url and settings.supabase_key:
        _supabase_client = create_client(settings.supabase_url, settings.supabase_key)
except Exception:
    _supabase_client = None


def get_supabase() -> "Client | None":
    """Return the Supabase client (may be ``None`` in demo mode)."""
    return _supabase_client


# ---------------------------------------------------------------------------
# In-memory demo store
# ---------------------------------------------------------------------------

class DemoStore:
    """Simple in-memory data store used when Supabase is unavailable."""

    def __init__(self) -> None:
        self.reset()

    # -- seed helpers -------------------------------------------------------

    def reset(self) -> None:
        settings = get_settings()

        self.product: dict[str, Any] = {
            "id": "nix-rescue-stick-01",
            "name": "NIX Period Stain Rescue Stick",
            "short_description": "Portable pre-treatment care for fresh menstrual stains.",
            "long_description": (
                "A compact stain-treatment stick made to live in your everyday bag. "
                "NIX is designed for the moment a stain happens — not for the laundry room."
            ),
            "price": settings.default_product_price,
            "currency": settings.currency_symbol,
            "images": [
                "/images/product-hero.webp",
                "/images/product-closeup.webp",
                "/images/product-in-hand.webp",
                "/images/product-in-bag.webp",
                "/images/product-packaging.webp",
            ],
            "features": [
                "Portable",
                "Discreet",
                "Easy to carry",
                "Designed for fresh stains",
                "Pre-treatment format",
            ],
            "details": [
                {
                    "title": "What is NIX?",
                    "content": "NIX is a portable pre-treatment stick designed specifically for fresh menstrual stains. Small enough to keep in your everyday bag.",
                },
                {
                    "title": "How does it work?",
                    "content": "Blot excess moisture, apply NIX directly to the stain, gently work it in, then wash normally when you get home.",
                },
                {
                    "title": "When should I use it?",
                    "content": "Use NIX as soon as you notice a fresh period stain. The sooner you treat it, the better the result.",
                },
                {
                    "title": "How do I carry it?",
                    "content": "NIX is designed to fit in a handbag, college bag, gym bag, or travel pouch. Keep it wherever you keep your essentials.",
                },
                {
                    "title": "Product details",
                    "content": "Compact stick format. Specific formulation details will be available soon.",
                },
                {
                    "title": "Shipping & returns",
                    "content": "Free shipping on orders above ₹499. Easy returns within 7 days of delivery.",
                },
            ],
            "bundles": [
                {
                    "id": "single",
                    "name": "Single",
                    "description": "1 NIX Stick",
                    "price": settings.default_product_price,
                    "available": True,
                },
                {
                    "id": "duo",
                    "name": "Duo",
                    "description": "2 NIX Sticks",
                    "price": None,
                    "available": False,
                },
                {
                    "id": "campus-pack",
                    "name": "Campus Pack",
                    "description": "Multiple sticks / bundle",
                    "price": None,
                    "available": False,
                },
                {
                    "id": "refill",
                    "name": "Refill / Reorder",
                    "description": "Repeat purchase option",
                    "price": None,
                    "available": False,
                },
            ],
        }

        self.orders: list[dict[str, Any]] = []

        self.rewards: dict[str, Any] = {
            "points": 0,
            "tier": "Starter",
            "history": [],
            "referral_code": f"NIX-{uuid.uuid4().hex[:4].upper()}",
        }

        self.waitlist: list[dict[str, Any]] = []

        self.notes: list[dict[str, Any]] = [
            {
                "id": "note-1",
                "title": "What to Do When You Get a Period Stain in Public",
                "excerpt": "It happens to almost everyone. Here's how to handle it calmly and effectively.",
                "image": "/images/note-1.webp",
                "category": "Tips",
                "read_time": "3 min",
                "featured": True,
            },
            {
                "id": "note-2",
                "title": "Why Fresh Stains Are Easier to Treat",
                "excerpt": "The science behind why acting quickly makes all the difference.",
                "image": "/images/note-2.webp",
                "category": "Science",
                "read_time": "4 min",
                "featured": False,
            },
            {
                "id": "note-3",
                "title": "What to Keep in Your Period Emergency Pouch",
                "excerpt": "A simple checklist for being prepared wherever you go.",
                "image": "/images/note-3.webp",
                "category": "Essentials",
                "read_time": "2 min",
                "featured": False,
            },
            {
                "id": "note-4",
                "title": "Period Essentials for Your College Bag",
                "excerpt": "Campus life doesn't stop for periods. Here's what to carry.",
                "image": "/images/note-4.webp",
                "category": "College",
                "read_time": "3 min",
                "featured": False,
            },
            {
                "id": "note-5",
                "title": "How to Handle Stains While Travelling",
                "excerpt": "Practical tips for managing unexpected stains away from home.",
                "image": "/images/note-5.webp",
                "category": "Travel",
                "read_time": "3 min",
                "featured": False,
            },
        ]

        self.user: dict[str, Any] = {
            "name": "Demo User",
            "email": "demo@nixandco.in",
            "phone": "",
        }


# Singleton
demo_store = DemoStore()
