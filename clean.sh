#!/bin/bash

echo "Cleaning FinAI Project..."

# Clean frontend
echo "Cleaning frontend..."
cd frontend
rm -rf node_modules
rm -rf .next
rm -rf coverage
cd ..

# Clean backend
echo "Cleaning backend..."
cd backend
rm -rf node_modules
rm -rf dist
rm -rf coverage
cd ..

# Clean logs
echo "Cleaning logs..."
rm -f *.log
rm -f frontend/*.log
rm -f backend/*.log

echo "Clean complete!"