from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserOut
# 💡 On importe verify_password et create_access_token depuis security
from app.core.security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])


# ------------------------------------
# 1. ROUTE D'INSCRIPTION (REGISTER)
# ------------------------------------
@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def register_user(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    # 1. Vérifier si l'email existe déjà
    result = await db.execute(select(User).where(User.email == user_data.email))
    existing_user = result.scalars().first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un compte avec cet email existe déjà."
        )

    # 2. Hacher le mot de passe et créer l'utilisateur
    hashed_pwd = hash_password(user_data.password)
    new_user = User(
        email=user_data.email,
        hashed_password=hashed_pwd
    )

    # 3. Enregistrer en base de données
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return new_user


# ------------------------------------
# 2. ROUTE DE CONNEXION (LOGIN)
# ------------------------------------
@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    # 1. Recherche asynchrone de l'utilisateur par son email
    result = await db.execute(select(User).where(User.email == form_data.username))
    user = result.scalars().first()
    
    # 2. Vérification de l'existence et du mot de passe
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 3. Génération du token JWT
    access_token = create_access_token(data={"sub": user.email})
    
    return {"access_token": access_token, "token_type": "bearer"}
