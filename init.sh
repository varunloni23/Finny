#!/bin/bash

echo "Initializing FinAI Project..."

# Create database
echo "Creating database tables..."
# psql -U postgres -d finance_manager -f init-database.sql

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo "Project initialization complete!"
echo ""
echo "To start the development servers:"
echo "  1. Start PostgreSQL and Redis databases"
echo "  2. Run './start-dev.sh' to start both frontend and backend"
echo "  3. Or run 'npm run start:dev' in the backend directory"
echo "  4. And run 'npm run dev' in the frontend directory"
echo ""
echo "Frontend will be available at: http://localhost:3000"
echo "Backend API will be available at: http://localhost:3001"