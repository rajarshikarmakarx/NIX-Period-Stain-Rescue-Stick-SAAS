"""Pydantic schemas for request/response validation."""

from __future__ import annotations

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


# ---------------------------------------------------------------------------
# Product
# ---------------------------------------------------------------------------

class ProductDetail(BaseModel):
    title: str
    content: str


class BundleOption(BaseModel):
    id: str
    name: str
    description: str
    price: Optional[int] = None
    available: bool = False


class ProductResponse(BaseModel):
    id: str
    name: str
    short_description: str
    long_description: str
    price: int
    currency: str
    images: list[str]
    features: list[str]
    details: list[ProductDetail]
    bundles: list[BundleOption]


# ---------------------------------------------------------------------------
# Cart / Orders
# ---------------------------------------------------------------------------

class CartItem(BaseModel):
    product_id: str
    quantity: int = Field(ge=1)


class AddressInfo(BaseModel):
    name: str
    email: str
    phone: str = ""
    address: str = ""
    city: str = ""
    state: str = ""
    pincode: str = ""


class OrderCreate(BaseModel):
    items: list[CartItem]
    address: AddressInfo


class OrderTimelineStep(BaseModel):
    label: str
    completed: bool
    timestamp: Optional[str] = None


class OrderResponse(BaseModel):
    id: str
    items: list[CartItem]
    address: AddressInfo
    total: int
    currency: str
    status: str
    delivery_estimate: str
    timeline: list[OrderTimelineStep]
    created_at: str


# ---------------------------------------------------------------------------
# Rewards
# ---------------------------------------------------------------------------

class RewardHistoryEntry(BaseModel):
    action: str
    points: int
    timestamp: str


class RewardsResponse(BaseModel):
    points: int
    tier: str
    history: list[RewardHistoryEntry]
    referral_code: str


class RedeemRequest(BaseModel):
    reward_id: str


# ---------------------------------------------------------------------------
# Waitlist
# ---------------------------------------------------------------------------

class WaitlistCreate(BaseModel):
    email: str


class WaitlistResponse(BaseModel):
    success: bool
    message: str
    already_registered: bool = False


# ---------------------------------------------------------------------------
# Notes
# ---------------------------------------------------------------------------

class ArticleResponse(BaseModel):
    id: str
    title: str
    excerpt: str
    image: str
    category: str
    read_time: str
    featured: bool = False


# ---------------------------------------------------------------------------
# Demo
# ---------------------------------------------------------------------------

class DemoResetResponse(BaseModel):
    success: bool
    message: str
