#!/bin/bash

echo "Building FinAI Application..."

# Build frontend
echo "Building frontend..."
cd frontend
npm run build
FRONTEND_EXIT_CODE=$?
cd ..

# Build backend
echo "Building backend..."
cd backend
npm run build
BACKEND_EXIT_CODE=$?
cd ..

# Check results
if [ $FRONTEND_EXIT_CODE -eq 0 ] && [ $BACKEND_EXIT_CODE -eq 0 ]; then
    echo "Build successful!"
    exit 0
else
    echo "Build failed!"
    exit 1
fi