"""FastAPI main application entry point."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.routers import product, orders, rewards, waitlist, notes, demo

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    description="Backend API for NIX & CO. (Period Stain Rescue Stick) D2C prototype & pitch platform.",
    version="1.0.0",
    debug=settings.debug,
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers under /api/v1
prefix = "/api/v1"
app.include_router(product.router, prefix=prefix)
app.include_router(orders.router, prefix=prefix)
app.include_router(rewards.router, prefix=prefix)
app.include_router(waitlist.router, prefix=prefix)
app.include_router(notes.router, prefix=prefix)
app.include_router(demo.router, prefix=prefix)


@app.get("/health", tags=["Health"])
def health_check():
    """Health check endpoint."""
    return {"status": "ok", "app": settings.app_name}
