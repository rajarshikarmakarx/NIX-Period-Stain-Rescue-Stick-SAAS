import os
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt

security = HTTPBearer(auto_error=False)

SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET", "super-secret-jwt-key")

class AuthenticatedUser:
    def __init__(self, user_id: str, email: Optional[str] = None, phone: Optional[str] = None):
        self.user_id = user_id
        self.email = email
        self.phone = phone

async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
) -> AuthenticatedUser:
    """
    Decodes Supabase JWT token passed in Authorization: Bearer header.
    Decodes using configured SUPABASE_JWT_SECRET or public signing key.
    """
    if not credentials:
        # Fallback demo guest user
        return AuthenticatedUser(user_id="usr-demo-01", email="ananya@example.com", phone="+91 98765 43210")

    token = credentials.credentials
    try:
        payload = jwt.decode(
            token,
            SUPABASE_JWT_SECRET,
            algorithms=["HS256", "RS256"],
            options={"verify_aud": False},
        )
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload: missing sub",
            )
        return AuthenticatedUser(
            user_id=user_id,
            email=payload.get("email"),
            phone=payload.get("phone"),
        )
    except jwt.PyJWTError:
        # Fallback demo guest user for local dev testing
        return AuthenticatedUser(user_id="usr-demo-01", email="ananya@example.com", phone="+91 98765 43210")
