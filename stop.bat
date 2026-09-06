@echo off
REM --------------------------------------------------
REM  safar-bus — Stop script (Windows)
REM  Attempts to kill any lingering Vite/dev-server
REM  process so the port is freed.  Safe to run even
REM  if nothing is listening.
REM --------------------------------------------------
echo [1/2] Looking for Vite / node dev processes …
taskkill /F /IM node.exe >nul 2>&1
echo [2/2] Done.  Port 5173 should be free now.
timeout /t 2 /nobreak >nul
