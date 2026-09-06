@echo off
REM --------------------------------------------------
REM  safar-bus — Start script (Windows)
REM  Starts the Vite dev server for local development.
REM --------------------------------------------------
echo [1/2] Starting Vite dev server on http://localhost:5173 ...
call npm run dev -- --host 0.0.0.0 --port 5173
pause
