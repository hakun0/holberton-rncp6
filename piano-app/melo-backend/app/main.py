import sys
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import engine, Base
import app.models.user
import app.models.conversion
from app.routers import auth  # Import du module auth

app = FastAPI(title="MELO API", version="1.0.0")

# Configuration CORS pour autoriser React à contacter FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"], # L'adresse du front
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Branchement des routes /auth
app.include_router(auth.router)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get("/")
async def root():
    return {"message": "Bienvenue sur l'API MELO ! 🎵"}
