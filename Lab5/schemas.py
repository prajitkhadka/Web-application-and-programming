# schemas.py — Pydantic models for request validation and response formatting

from pydantic import BaseModel, EmailStr
from datetime import datetime


# ------------------------------------------------------------
# INPUT SCHEMAS (data received from client)
# ------------------------------------------------------------
class UserCreate(BaseModel):
    full_name: str
    email: EmailStr     # ensures valid email format
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ------------------------------------------------------------
# OUTPUT SCHEMAS (data sent back to client)
# ------------------------------------------------------------
class UserOut(BaseModel):
    id: int
    full_name: str
    email: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True   # enables ORM model compatibility


class Token(BaseModel):
    access_token: str
    token_type: str