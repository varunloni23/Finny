#!/bin/bash

# Start the backend in the background
echo "Starting backend server..."
cd backend
npm run start:dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Start the frontend in the background
echo "Starting frontend server..."
cd frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Function to clean up processes on exit
cleanup() {
    echo "Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Trap SIGINT and SIGTERM to clean up
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID