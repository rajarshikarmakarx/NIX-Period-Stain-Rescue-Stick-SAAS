#!/usr/bin/env bash
set -e

# ── NIX Period Stain Rescue Stick — dev launcher ──────────────────────────────
# Starts the FastAPI backend and Vite frontend concurrently.
# Press Ctrl-C once to stop both.

ROOT="$(cd "$(dirname "$0")" && pwd)"
BACKEND="$ROOT/backend"
VENV="$BACKEND/venv"

# ── Backend ────────────────────────────────────────────────────────────────────
echo "▶ Starting FastAPI backend..."

if [ ! -d "$VENV" ]; then
  echo "  Creating Python venv..."
  python3 -m venv "$VENV"
fi

# Install/sync dependencies
"$VENV/bin/pip" install -q -r "$BACKEND/requirements.txt"

# Run uvicorn in the background
"$VENV/bin/uvicorn" app.main:app --reload --app-dir "$BACKEND" --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
echo "  Backend PID: $BACKEND_PID  →  http://localhost:8000"

# ── Frontend ───────────────────────────────────────────────────────────────────
echo "▶ Starting Vite frontend..."
cd "$ROOT"
npm run dev &
FRONTEND_PID=$!
echo "  Frontend PID: $FRONTEND_PID"

# ── Cleanup on exit ────────────────────────────────────────────────────────────
cleanup() {
  echo ""
  echo "⏹ Stopping servers..."
  kill "$BACKEND_PID"  2>/dev/null || true
  kill "$FRONTEND_PID" 2>/dev/null || true
  wait
  echo "Done."
}

trap cleanup INT TERM

# Keep the script alive until Ctrl-C
wait
