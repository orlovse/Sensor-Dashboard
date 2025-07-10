from __future__ import annotations

import asyncio
import random
from contextlib import asynccontextmanager
from datetime import datetime

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

from app.api import sensors, readings
from app.db.database import engine, Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(
    title="Real-Time Sensor Dashboard API",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sensors.router)
app.include_router(readings.router)


@app.websocket("/ws/readings")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    try:
        while True:
            reading = {
                "timestamp": datetime.utcnow().isoformat(),
                "sensor_id": 1,
                "temperature": round(random.uniform(20, 30), 2),
                "humidity": round(random.uniform(40, 60), 1),
            }
            await ws.send_json(reading)
            await asyncio.sleep(1)
    except Exception:
        await ws.close()
