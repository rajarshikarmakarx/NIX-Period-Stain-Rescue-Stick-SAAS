"""Pydantic schemas for request/response validation."""

from __future__ import annotations

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


# ---------------------------------------------------------------------------
# Product
# ---------------------------------------------------------------------------

class ProductVariant(BaseModel):
    id: str
    name: str
    size: str
    uses: str
    price: int
    original_price: Optional[int] = None
    in_stock: bool = True
    image: Optional[str] = None
    packaging_image: Optional[str] = None


class ProductDetail(BaseModel):
    title: str
    content: str


class BundleOption(BaseModel):
    id: str
    name: Optional[str] = None
    title: Optional[str] = None
    description: str
    price: Optional[int] = None
    discount: Optional[str] = None
    available: bool = True

    def model_post_init(self, __context):
        if not self.name and self.title:
            self.name = self.title
        elif not self.title and self.name:
            self.title = self.name


class ProductResponse(BaseModel):
    id: str
    name: str
    short_description: Optional[str] = None
    tagline: Optional[str] = None
    long_description: Optional[str] = None
    description: Optional[str] = None
    price: int
    original_price: Optional[int] = None
    currency: str
    variants: list[ProductVariant] = []
    images: list[str]
    features: list[str] = []
    highlights: list[str] = []
    details: list[ProductDetail] = []
    details_accordion: list[ProductDetail] = []
    bundles: list[BundleOption] = []
    rating: Optional[float] = None
    review_count: Optional[int] = None
    in_stock: bool = True

    def model_post_init(self, __context):
        if not self.short_description and self.tagline:
            self.short_description = self.tagline
        elif not self.tagline and self.short_description:
            self.tagline = self.short_description

        if not self.long_description and self.description:
            self.long_description = self.description
        elif not self.description and self.long_description:
            self.description = self.long_description

        if not self.features and self.highlights:
            self.features = self.highlights
        elif not self.highlights and self.features:
            self.highlights = self.features

        if not self.details and self.details_accordion:
            self.details = self.details_accordion
        elif not self.details_accordion and self.details:
            self.details_accordion = self.details


# ---------------------------------------------------------------------------
# Cart / Orders
# ---------------------------------------------------------------------------

class CartItem(BaseModel):
    product_id: str
    product_name: Optional[str] = None
    variant_id: Optional[str] = None
    variant_name: Optional[str] = None
    price: Optional[int] = None
    quantity: int = Field(ge=1)
    image: Optional[str] = None


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
    user_id: Optional[str] = None
    user_email: Optional[str] = None


class OrderTimelineStep(BaseModel):
    label: str
    completed: bool
    timestamp: Optional[str] = None


class OrderResponse(BaseModel):
    id: str
    user_id: Optional[str] = None
    user_email: Optional[str] = None
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
