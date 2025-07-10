from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import random
from datetime import datetime

app = FastAPI(title="Real-Time Sensor Dashboard API")

# CORS для фронта на 3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/healthz")
async def health():
    return {"status": "ok"}

@app.websocket("/ws/readings")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    try:
        while True:
            # фейковое значение датчика
            reading = {
                "timestamp": datetime.utcnow().isoformat(),
                "sensor_id": 1,
                "temperature": round(random.uniform(20, 30), 2),
                "humidity": round(random.uniform(40, 60), 1)
            }
            await ws.send_json(reading)
            await asyncio.sleep(1)
    except Exception:
        await ws.close()
