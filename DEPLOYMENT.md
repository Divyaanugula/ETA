# 🚀 Fast Deployment Guide for RailETA

RailETA can be deployed in multiple ways depending on your preferred cloud platform.

---

## Option 1: 1-Click Render Cloud Deployment (Full-Stack All-in-One, Free)

1. Push this repository to your GitHub:
   ```bash
   git push origin main
   ```
2. Go to [Render Dashboard](https://dashboard.render.com).
3. Click **New +** -> **Blueprint**.
4. Connect your GitHub repo (`Divyaanugula/ETA`).
5. Render reads `render.yaml` automatically and builds both frontend and backend in one unified container!
6. Done! Your app is live with SSL HTTPS at `https://raileta-xxxx.onrender.com`.

---

## Option 2: Frontend on Vercel + Backend on Render / Railway

### Step A: Backend (Render or Railway)
- **Render**: New Web Service -> Select repository -> Root directory: `.` -> Docker build (it uses root `Dockerfile`) or Python runtime with start command:
  ```bash
  uvicorn backend.main:app --host 0.0.0.0 --port $PORT
  ```
- Copy your live backend URL (e.g. `https://raileta-api.onrender.com`).

### Step B: Frontend (Vercel)
1. Go to [Vercel](https://vercel.com) and import your repo.
2. Set **Root Directory** to `frontend`.
3. Framework Preset: **Vite**.
4. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com/api`
5. Click **Deploy**.

---

## Option 3: Docker / Self-Hosted VPS / Cloud Server (1 Command)

If you have a server with Docker installed:
```bash
docker compose up --build -d
```
Your full app is running on port `8000`!

---

## Option 4: Local Production Run

```bash
# 1. Build frontend
cd frontend
npm run build
cd ..

# 2. Run backend (which serves the frontend dist automatically)
cd backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```
Open `http://localhost:8000` in your browser.
