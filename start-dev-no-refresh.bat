@echo off
echo Starting Next.js development server without Fast Refresh...
set FAST_REFRESH=false
set NODE_OPTIONS=--max-old-space-size=4096
npm run dev





