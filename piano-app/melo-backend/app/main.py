from fastapi import FastAPI
from app.core.database import engine, Base
import app.models.user
import app.models.conversion

app = FastAPI(title="MELO API", version="1.0.0")

# Événement au démarrage du serveur : crée les tables SQL si elles n'existent pas
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get("/")
async def root():
    return {"message": "Bienvenue sur l'API MELO ! 🎵"}
