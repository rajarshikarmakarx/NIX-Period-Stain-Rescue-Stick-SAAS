from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Supabase
    supabase_url: str = ""
    supabase_key: str = ""

    # App
    app_name: str = "NIX & CO. API"
    debug: bool = True
    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ]

    # Product defaults
    default_product_price: int = 349
    currency: str = "INR"
    currency_symbol: str = "₹"

    # Rewards
    points_per_purchase: int = 100
    points_per_referral: int = 50
    points_per_profile: int = 25
    points_per_note_read: int = 25

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


@lru_cache
def get_settings() -> Settings:
    return Settings()
