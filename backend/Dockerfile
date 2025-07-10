FROM python:3.13-rc-slim

WORKDIR /app

RUN pip install --no-cache-dir --upgrade pip poetry

RUN poetry config virtualenvs.create false

COPY pyproject.toml poetry.lock* /app/

RUN poetry install --no-interaction --no-ansi --only main --no-root

COPY ./app /app/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
