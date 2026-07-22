# Utilise une image Python légère officielle
FROM python:3.10-slim

# Définit le dossier de travail dans le conteneur
WORKDIR /app

# Copie le fichier de dépendances
COPY requirements.txt .

# Installe les paquets Python
RUN pip install --no-cache-dir -r requirements.txt

# Copie tout le reste du code dans le conteneur
COPY . .

# Expose le port sur lequel FastAPI tourne
EXPOSE 8000

# Commande pour démarrer le serveur FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
