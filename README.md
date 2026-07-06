# Chifles Mini App

Mini sales platform: FastAPI backend + React frontend (Vite + TypeScript).

## Run the backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API docs at http://localhost:8000/docs

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

App at http://localhost:5173 (the Vite proxy forwards `/api` to the backend).

## Architecture — the house rules

**Backend** (layered, hexagonal style):

```
api/routes.py          → inbound adapter: pure HTTP, no business logic
domain/services.py     → use cases: business logic lives here
domain/repository.py   → port: the interface the domain defines
infrastructure/        → outbound adapter: a JSON file today, Postgres tomorrow
```

Dependencies always point toward the domain: `api → domain ← infrastructure`.

**Frontend**:

```
components/            → presentation: receive data via props, never fetch
hooks/                 → state + data: they call api/client
api/client.ts          → single HTTP access point
```

A component never calls `fetch` directly; it goes through a hook → `api/client`.

> `recharts` is already in the dependencies in case you need to chart something.
