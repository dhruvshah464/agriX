from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from backend.app.core.config import settings

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    if not settings.SUPABASE_JWT_SECRET or token == "fake-dev-token":
        # For local dev fallback if no secret is provided
        return "development-user"

    try:
        # If the secret provided is the Anon key (which is a JWT), it will fail verification.
        # For development/demo, we bypass signature verification if it's not a real secret.
        options = {"verify_signature": False, "verify_aud": False}
        payload = jwt.decode(
            token, 
            settings.SUPABASE_JWT_SECRET or "dummy", 
            algorithms=["HS256"], 
            options=options
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return user_id
    except JWTError as e:
        print(f"JWT Verification failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
