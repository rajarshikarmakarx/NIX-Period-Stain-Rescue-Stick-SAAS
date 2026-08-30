"""Notes router serving NIX Notes editorial content."""

from fastapi import APIRouter, HTTPException
from app.db.supabase import demo_store
from app.schemas.schemas import ArticleResponse

router = APIRouter(prefix="/notes", tags=["Notes"])


@router.get("", response_model=list[ArticleResponse])
def get_articles():
    """Get list of NIX Notes editorial articles."""
    return demo_store.notes


@router.get("/{article_id}", response_model=ArticleResponse)
def get_article(article_id: str):
    """Get single NIX Notes article by ID."""
    for article in demo_store.notes:
        if article["id"] == article_id:
            return article
    raise HTTPException(status_code=404, detail="Article not found")
