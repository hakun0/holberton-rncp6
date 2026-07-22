from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Récupération de l'URL de la base de données
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql+asyncpg://melo_user:melo_password@localhost:5432/melo_db"
)

# Moteur de connexion asynchrone (pour de super performances)
engine = create_async_engine(DATABASE_URL, echo=True)

# Fabrique de sessions pour interagir avec la DB
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Classe de base pour créer nos tables
Base = declarative_base()

# Fonction d'aide pour obtenir une session dans les routes API
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
