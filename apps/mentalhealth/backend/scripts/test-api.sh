#!/bin/bash

echo "🧪 Testing Forums API..."

# Test MongoDB connection first
echo "📡 Testing MongoDB connection..."
node test-db.js

echo ""
echo "🏗️ Testing API endpoints..."

# Create a test student ID (mock)
STUDENT_ID="507f1f77bcf86cd799439011"

# Test create forum
echo "1. Creating forum..."
curl -X POST http://localhost:3001/forums \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Mental Health Support\",\"description\":\"A safe space to discuss mental health\",\"createdBy\":\"$STUDENT_ID\"}"

echo ""
echo "2. Getting all forums..."
curl http://localhost:3001/forums

echo ""
echo "✅ API tests completed"
