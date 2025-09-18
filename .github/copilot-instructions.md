# HealthDash — AI Agent Instructions

## Project Overview

HealthDash is a fullstack dashboard for medical patient management. It consists of:

- **Frontend:** React + TypeScript (Vite, Material UI, Zustand, React Router)
- **Backend:** FastAPI (Python)
- **Containerization:** Docker, docker-compose

## Architecture & Data Flow

- **Frontend** (`src/`):
  - Route-level pages in `src/pages/` (e.g. `Home.tsx`, `PatientList.tsx`, `Analytics.tsx`)
  - Shared UI in `src/components/`, layouts in `src/layouts/`, feature modules in `src/features/`
  - State managed via Zustand (`src/store/appStore.ts`)
  - Patient data types in `src/types/patient.ts`
  - API calls in `src/services/api.ts` (communicate with FastAPI backend)
  - Mock data for development in `src/mocks/patients.ts` (mirrors backend schema)
- **Backend** (`backend/`):
  - REST API endpoints in `main.py` (CRUD for `/patients`)
  - Data stored in `backend/data/patients.json` (JSON array, matches frontend types)
  - CORS enabled for local frontend

## Developer Workflows

- **Local Development:**
  - Frontend: `npm install && npm run dev` (http://localhost:3000)
  - Backend: `python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && uvicorn main:app --reload --host 0.0.0.0 --port 8000` (http://localhost:8000)
- **Docker Compose:**
  - `docker-compose up --build` (runs both services)
- **Testing:**
  - Frontend: `npm run test` (Vitest, React Testing Library)
  - Backend: Add tests in `backend/` (not present by default)
- **Linting:**
  - `npm run lint` (ESLint config in `eslint.config.js`)

## Conventions & Patterns

- **TypeScript:** All patient data strictly typed (`src/types/patient.ts`).
- **State:** Use Zustand store for notifications, user state (`src/store/appStore.ts`).
- **API:** All patient CRUD via REST endpoints (`src/services/api.ts`).
- **Routing:** See `src/routes.tsx` for route definitions.
- **UI:** Material UI components, CSS-in-JS styling.
- **Mock Data:** `src/mocks/patients.ts` for frontend, `backend/data/patients.json` for backend. Keep schemas in sync.
- **Sidebar Navigation:** See `src/layouts/DashboardLayout.tsx` for main navigation structure.

## Integration Points

- **Frontend <-> Backend:** All patient operations (list, view, create, update, delete) use REST API (`/patients`).
- **Docker:** Nginx serves built frontend; backend runs in FastAPI container. See `Dockerfile` and `docker-compose.yml`.

## Examples

- To add a new patient field, update `src/types/patient.ts`, `backend/data/patients.json`, and relevant frontend/backend logic.
- To add a new route, update `src/routes.tsx` and create a page in `src/pages/`.
- To add a notification, use `useAppStore().addNotification`.

## Quick Reference

- Frontend entry: `src/main.tsx`
- Backend entry: `backend/main.py`
- Patient API: `src/services/api.ts`, `backend/main.py`
- Mock data: `src/mocks/patients.ts`, `backend/data/patients.json`

---

Keep instructions concise and codebase-specific. Update this file as architecture or workflows evolve.
