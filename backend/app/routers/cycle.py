"""Cycle prediction & stain preparedness router."""

from fastapi import APIRouter
from pydantic import BaseModel, Field
from datetime import datetime, timedelta
from typing import List, Optional

router = APIRouter(prefix="/cycle", tags=["Cycle Predictor"])


class CyclePredictRequest(BaseModel):
    last_period_date: str = Field(..., description="First day of last period in YYYY-MM-DD format")
    cycle_length: int = Field(28, ge=21, le=45, description="Average cycle length in days")
    period_length: int = Field(5, ge=2, le=10, description="Period duration in days")
    flow_intensity: Optional[str] = Field("Medium", description="Flow intensity (Light, Medium, Heavy)")


class CyclePredictResponse(BaseModel):
    last_period_date: str
    cycle_length: int
    period_length: int
    current_cycle_day: int
    current_phase: str
    stain_risk_level: str
    stain_advisory: str
    next_period_start: str
    days_until_next_period: int
    next_ovulation_date: str
    fertile_window_start: str
    fertile_window_end: str
    annual_cycles_count: int
    annual_stain_risk_days: int


@router.post("/predict", response_model=CyclePredictResponse)
def predict_cycle(req: CyclePredictRequest):
    """Calculate cycle phases, next period date, ovulation, and stain risk advisory."""
    try:
        last_date = datetime.strptime(req.last_period_date, "%Y-%m-%d").date()
    except ValueError:
        last_date = datetime.now().date() - timedelta(days=14)

    today = datetime.now().date()
    diff_days = (today - last_date).days

    cycles_passed = max(0, diff_days // req.cycle_length)
    if diff_days >= 0:
        current_cycle_day = (diff_days % req.cycle_length) + 1
    else:
        current_cycle_day = 1

    # Next period start
    next_period_start = last_date + timedelta(days=(cycles_passed + (1 if diff_days >= 0 else 0)) * req.cycle_length)
    days_until_next_period = (next_period_start - today).days

    # Ovulation
    ovulation_offset = max(1, req.cycle_length - 14)
    next_ovulation = last_date + timedelta(days=(cycles_passed * req.cycle_length) + ovulation_offset - 1)
    if next_ovulation < today:
        next_ovulation += timedelta(days=req.cycle_length)

    fertile_start = next_ovulation - timedelta(days=3)
    fertile_end = next_ovulation + timedelta(days=1)

    # Determine Phase & Risk Level
    if current_cycle_day <= req.period_length:
        phase = "Menstrual Phase"
        risk_level = "High"
        advisory = "Active flow window! Carry your NIX Rescue Stick in your purse or bag."
    elif current_cycle_day >= ovulation_offset - 2 and current_cycle_day <= ovulation_offset + 1:
        phase = "Ovulatory Phase"
        risk_level = "Medium"
        advisory = "Peak fertility window with potential light mid-cycle spotting. Keep NIX handy."
    elif days_until_next_period <= 3:
        phase = "Late Luteal Phase (Pre-Period)"
        risk_level = "High"
        advisory = "Period expected within 3 days. Refill NIX stick & pack backup wipes."
    else:
        phase = "Follicular Phase" if current_cycle_day < ovulation_offset else "Luteal Phase"
        risk_level = "Low"
        advisory = "Low stain risk period. Great time to verify stick supply."

    annual_cycles = round(365 / req.cycle_length)
    annual_risk_days = annual_cycles * req.period_length

    return CyclePredictResponse(
        last_period_date=last_date.strftime("%Y-%m-%d"),
        cycle_length=req.cycle_length,
        period_length=req.period_length,
        current_cycle_day=current_cycle_day,
        current_phase=phase,
        stain_risk_level=risk_level,
        stain_advisory=advisory,
        next_period_start=next_period_start.strftime("%Y-%m-%d"),
        days_until_next_period=days_until_next_period,
        next_ovulation_date=next_ovulation.strftime("%Y-%m-%d"),
        fertile_window_start=fertile_start.strftime("%Y-%m-%d"),
        fertile_window_end=fertile_end.strftime("%Y-%m-%d"),
        annual_cycles_count=annual_cycles,
        annual_stain_risk_days=annual_risk_days,
    )
