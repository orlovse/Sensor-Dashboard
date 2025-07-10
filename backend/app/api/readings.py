from typing import List, Optional
from datetime import datetime

from fastapi import APIRouter, Depends, Query, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from ..api.deps import get_sensor_or_404
from ..db.database import get_db
from ..db.models import Reading, Sensor

router = APIRouter(prefix="/api/readings", tags=["readings"])

class ReadingIn(BaseModel):
    temperature: float
    humidity: float
    timestamp: datetime | None = None

class ReadingOut(ReadingIn):
    id: int
    sensor_id: int

@router.get("/", response_model=List[ReadingOut])
async def list_readings(
    sensor_id: int,
    limit: int = Query(100, le=500),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(Reading)
        .where(Reading.sensor_id == sensor_id)
        .order_by(Reading.timestamp.desc())
        .limit(limit)
    )
    readings = (await db.execute(stmt)).scalars().all()
    return readings

@router.post("/", response_model=ReadingOut, status_code=status.HTTP_201_CREATED)
async def add_reading(
    sensor: Sensor = Depends(get_sensor_or_404),
    data: ReadingIn = ...,
    db: AsyncSession = Depends(get_db),
):
    reading = Reading(
        sensor_id=sensor.id,
        timestamp=data.timestamp or datetime.utcnow(),
        temperature=data.temperature,
        humidity=data.humidity,
    )
    db.add(reading)
    await db.commit()
    await db.refresh(reading)
    return reading
