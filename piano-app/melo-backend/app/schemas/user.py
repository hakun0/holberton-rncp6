from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime

# 1. Schéma pour la création d'un utilisateur (ce que l'utilisateur envoie)
class UserCreate(BaseModel):
    email: EmailStr
    password: str

# 2. Schéma pour la réponse (ce que l'API renvoie sans le mot de passe)
class UserOut(BaseModel):
    id: UUID  # <-- Déclaré en UUID pour corriger l'erreur 500 précédente !
    email: EmailStr
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
