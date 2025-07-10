from fastapi import Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from ..db.database import get_db
from ..db.models import Sensor

async def get_sensor_or_404(sensor_id: int, db: AsyncSession = Depends(get_db)) -> Sensor:
    sensor = await db.get(Sensor, sensor_id)
    if not sensor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Sensor not found")
    return sensor
