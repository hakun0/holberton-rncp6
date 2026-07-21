from sqlalchemy import Column, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from app.core.database import Base

class Conversion(Base):
    __tablename__ = "conversions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=True) # Null si invité
    
    # Informations sur le fichier
    original_filename = Column(String, nullable=False)
    status = Column(String, default="PENDING") # PENDING, PROCESSING, COMPLETED, FAILED
    error_message = Column(String, nullable=True)
    
    # Chemins de stockage des fichiers sur le serveur
    original_file_path = Column(String, nullable=False)
    midi_file_path = Column(String, nullable=True)
    sheet_pdf_path = Column(String, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relation inverse vers l'utilisateur
    user = relationship("User", back_populates="conversions")
