from datetime import datetime, timedelta, timezone
from typing import Optional
import jwt
from passlib.context import CryptContext

# 🔑 Configuration des tokens JWT
SECRET_KEY = "votre_cle_secrete_super_securisee_a_changer"  # À personnaliser
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # Validité : 24 heures

# Utilisation de PBKDF2 qui est standard, ultra-sécurisé et 100% stable
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")


def hash_password(password: str) -> str:
    """Hache le mot de passe pour le stocker en sécurité."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Vérifie si le mot de passe saisi correspond au hachage."""
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Génère un token d'accès JWT pour l'utilisateur."""
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
