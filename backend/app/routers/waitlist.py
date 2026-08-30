"""Waitlist router for Emergency Kit registration."""

from datetime import datetime
from fastapi import APIRouter
from app.db.supabase import demo_store
from app.schemas.schemas import WaitlistCreate, WaitlistResponse

router = APIRouter(prefix="/waitlist", tags=["Waitlist"])


@router.post("", response_model=WaitlistResponse)
def join_waitlist(data: WaitlistCreate):
    """Register email for the Emergency Kit launch waitlist."""
    email_clean = data.email.strip().lower()
    
    # Check if already registered
    for entry in demo_store.waitlist:
        if entry["email"] == email_clean:
            return WaitlistResponse(
                success=True,
                message="You're already on the Emergency Kit waitlist!",
                already_registered=True,
            )
            
    demo_store.waitlist.append({
        "email": email_clean,
        "created_at": datetime.now().isoformat()
    })
    
    return WaitlistResponse(
        success=True,
        message="You're on the list! We'll notify you as soon as the Emergency Kit drops.",
        already_registered=False,
    )
