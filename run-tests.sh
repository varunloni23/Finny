#!/bin/bash

echo "Running FinAI Tests..."

# Run frontend tests
echo "Running frontend tests..."
cd frontend
npm run test
FRONTEND_EXIT_CODE=$?
cd ..

# Run backend tests
echo "Running backend tests..."
cd backend
npm run test
BACKEND_EXIT_CODE=$?
cd ..

# Check results
if [ $FRONTEND_EXIT_CODE -eq 0 ] && [ $BACKEND_EXIT_CODE -eq 0 ]; then
    echo "All tests passed!"
    exit 0
else
    echo "Some tests failed!"
    exit 1
fi