"""Product router serving product details, pricing, FAQs, and bundle offers."""

from fastapi import APIRouter
from app.db.supabase import demo_store
from app.schemas.schemas import ProductResponse

router = APIRouter(prefix="/product", tags=["Product"])


@router.get("", response_model=ProductResponse)
def get_product():
    """Get NIX product details, pricing, gallery images, accordion details, and bundle options."""
    return demo_store.product
