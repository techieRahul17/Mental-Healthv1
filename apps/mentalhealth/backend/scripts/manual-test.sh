#!/bin/bash

echo "🚀 Starting Express server..."
echo "📍 Server will run on http://localhost:3001"
echo ""
echo "🧪 Test endpoints manually:"
echo "curl http://localhost:3001/forums"
echo "curl -X POST http://localhost:3001/forums -H 'Content-Type: application/json' -d '{\"title\":\"Test Forum\",\"description\":\"Test description\",\"createdBy\":\"507f1f77bcf86cd799439011\"}'"
echo ""
echo "Press Ctrl+C to stop server"
echo ""

cd /Users/pranav/Projects/mentalhealV2/apps/mentalhealth/backend
node server.js
