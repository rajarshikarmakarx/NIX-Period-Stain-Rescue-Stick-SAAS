import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "NIX & CO. D2C API"
    app_name: str = "NIX & CO. D2C API"
    debug: bool = True
    cors_origins: list[str] = ["*"]
    API_V1_STR: str = "/api/v1"

    # Store settings
    default_product_price: int = 349
    currency_symbol: str = "₹"
    points_per_purchase: int = 100

    # Supabase Credentials
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_PUBLIC_KEY: str = os.getenv("SUPABASE_PUBLIC_KEY", os.getenv("SUPABASE_ANON_KEY", ""))
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    SUPABASE_JWT_SECRET: str = os.getenv("SUPABASE_JWT_SECRET", "super-secret-jwt-key")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()

def get_settings() -> Settings:
    return settings
