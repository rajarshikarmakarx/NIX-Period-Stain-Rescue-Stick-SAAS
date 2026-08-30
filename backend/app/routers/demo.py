"""Demo router for resetting application state prior to presentations."""

from fastapi import APIRouter
from app.db.supabase import demo_store
from app.schemas.schemas import DemoResetResponse

router = APIRouter(prefix="/demo", tags=["Demo"])


@router.post("/reset", response_model=DemoResetResponse)
def reset_demo_state():
    """Reset cart, order history, rewards, and waitlist state back to seed values."""
    demo_store.reset()
    return DemoResetResponse(
        success=True,
        message="Demo state successfully reset to initial presentation values."
    )
