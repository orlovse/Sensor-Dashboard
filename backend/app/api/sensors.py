from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
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

@router.put("/{sensor_id}/", response_model=SensorOut)
async def update_sensor(
    sensor_id: int, data: SensorIn, db: AsyncSession = Depends(get_db)
):
    sensor = await db.get(Sensor, sensor_id)
    if not sensor:
        raise HTTPException(status_code=404, detail="Sensor not found")

    sensor.name = data.name
    sensor.location = data.location
    await db.commit()
    await db.refresh(sensor)
    return sensor


@router.delete("/{sensor_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_sensor(sensor_id: int, db: AsyncSession = Depends(get_db)):
    sensor = await db.get(Sensor, sensor_id)
    if not sensor:
        raise HTTPException(status_code=404, detail="Sensor not found")

    await db.delete(sensor)
    await db.commit()
