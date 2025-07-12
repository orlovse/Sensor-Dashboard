from typing import List

from fastapi import APIRouter, Depends, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from ..db.database import get_db
from ..db.models import Sensor

router = APIRouter(prefix="/api/sensors", tags=["sensors"], redirect_slashes=False)

class SensorIn(BaseModel):
    name: str
    location: str | None = None

class SensorOut(SensorIn):
    id: int

@router.get("", response_model=List[SensorOut])
async def list_sensors(db: AsyncSession = Depends(get_db)):
    sensors = (await db.execute(select(Sensor))).scalars().all()
    return sensors

@router.post("", response_model=SensorOut, status_code=status.HTTP_201_CREATED)
async def create_sensor(data: SensorIn, db: AsyncSession = Depends(get_db)):
    sensor = Sensor(**data.model_dump())
    db.add(sensor)
    await db.commit()
    await db.refresh(sensor)
    return sensor
