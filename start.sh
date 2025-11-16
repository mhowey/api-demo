#!/bin/bash

# Script to start both the API and frontend servers

echo "Starting API server..."
node main.js &
API_PID=$!

echo "Waiting for API to start..."
sleep 2

echo "Starting frontend server..."
cd frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "================================"
echo "Servers are running!"
echo "API: http://localhost:3001"
echo "Frontend: http://localhost:3000"
echo "================================"
echo ""
echo "Press Ctrl+C to stop all servers"

# Trap Ctrl+C and kill both processes
trap "kill $API_PID $FRONTEND_PID; exit" INT

# Wait for both processes
wait
