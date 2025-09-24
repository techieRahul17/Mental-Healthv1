# Forums Backend Setup

## Prerequisites
1. Install MongoDB locally or use MongoDB Atlas
2. Update `.env` file with your MongoDB URI

## Local MongoDB Setup
```bash
# Install MongoDB (macOS)
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Or run manually
mongod --config /usr/local/etc/mongod.conf
```

## MongoDB Atlas Setup (Cloud)
1. Go to https://cloud.mongodb.com
2. Create free cluster
3. Get connection string
4. Update `.env` file:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mentalhealth
```

## Start Backend
```bash
npm install
npm run dev
```

## Test API
```bash
# Test MongoDB connection
node scripts/test-db.js

# Test API endpoints
./scripts/test-api.sh
```

## API Endpoints

### Forums
- `POST /forums` - Create forum
- `GET /forums` - List all forums  
- `GET /forums/:id` - Get forum with posts
- `POST /forums/:id/join` - Join forum

### Posts
- `POST /posts` - Create post
- `GET /posts/:id` - Get post with comments
- `POST /posts/:id/vote` - Vote on post

### Comments
- `POST /posts/:id/comments` - Add comment
- `POST /posts/:id/comments/:commentId/reply` - Reply to comment
