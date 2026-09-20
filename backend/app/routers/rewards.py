"""Rewards router for points balance, history, referral codes, and perk redemption."""

from datetime import datetime
from fastapi import APIRouter, HTTPException
from app.db.supabase import demo_store
from app.schemas.schemas import RewardsResponse, RedeemRequest
from app.config import get_settings

router = APIRouter(prefix="/rewards", tags=["Rewards"])


@router.get("", response_model=RewardsResponse)
def get_rewards():
    """Get rewards points, status tier, activity history, and referral code."""
    return demo_store.rewards


def _process_redemption(reward_id: str):
    points = demo_store.rewards["points"]
    now = datetime.now().strftime("%b %d, %Y")

    if reward_id == "discount-250" and points >= 250:
        demo_store.rewards["points"] -= 250
        demo_store.rewards["history"].insert(0, {"action": "Redeemed ₹50 Discount", "points": -250, "timestamp": now})
        return {"success": True, "message": "₹50 Discount Code: NIX50OFF applied!", "remaining_points": demo_store.rewards["points"]}
    elif reward_id == "free-nix-500" and points >= 500:
        demo_store.rewards["points"] -= 500
        demo_store.rewards["history"].insert(0, {"action": "Redeemed Free NIX Stick", "points": -500, "timestamp": now})
        return {"success": True, "message": "Free NIX Stick added to your account!", "remaining_points": demo_store.rewards["points"]}
    elif reward_id == "kit-benefit-750" and points >= 750:
        demo_store.rewards["points"] -= 750
        demo_store.rewards["history"].insert(0, {"action": "Redeemed Emergency Kit VIP Pass", "points": -750, "timestamp": now})
        return {"success": True, "message": "VIP Early Access Pass claimed for Emergency Kit launch!", "remaining_points": demo_store.rewards["points"]}
    else:
        raise HTTPException(status_code=400, detail="Insufficient points or invalid reward ID")


@router.post("/redeem")
def redeem_reward(payload: RedeemRequest):
    """Redeem rewards points for discounts or perks via JSON payload."""
    return _process_redemption(payload.reward_id)


@router.post("/redeem/{reward_id}")
def redeem_reward_by_id(reward_id: str):
    """Redeem rewards points for discounts or perks via path parameter."""
    return _process_redemption(reward_id)
