#!/bin/bash

# Start the backend server
cd backend
python3 -m uvicorn app:app --reload --port 8000 &
BACKEND_PID=$!

# Start the frontend development server
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID 