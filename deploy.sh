#!/bin/bash

echo "Deploying FinAI Application..."

# Check if we're on the main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
    echo "Warning: You are not on the main branch. Do you want to continue? (y/n)"
    read -r response
    if [ "$response" != "y" ]; then
        echo "Deployment cancelled."
        exit 1
    fi
fi

# Run tests first
echo "Running tests before deployment..."
./run-tests.sh
if [ $? -ne 0 ]; then
    echo "Tests failed. Deployment cancelled."
    exit 1
fi

# Build the application
echo "Building application..."
./build.sh
if [ $? -ne 0 ]; then
    echo "Build failed. Deployment cancelled."
    exit 1
fi

# Deploy with Docker
echo "Deploying with Docker..."
docker-compose up -d

echo "Deployment complete!"
echo "Frontend available at: http://localhost:3000"
echo "Backend API available at: http://localhost:3001"