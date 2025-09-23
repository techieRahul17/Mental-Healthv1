require('dotenv').config();
const { connectDB, getDB, ObjectId } = require('../db');

async function testAPI() {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('✅ Connected to MongoDB');
    
    // Test creating a forum
    const forum = {
      title: 'Mental Health Support',
      description: 'A safe space to discuss mental health',
      createdBy: new ObjectId('507f1f77bcf86cd799439011'),
      members: [new ObjectId('507f1f77bcf86cd799439011')],
      createdAt: new Date()
    };
    
    const result = await getDB().collection('forums').insertOne(forum);
    console.log('✅ Created forum:', result.insertedId);
    
    // Test getting forums
    const forums = await getDB().collection('forums').find({}).toArray();
    console.log('✅ Forums count:', forums.length);
    console.log('📋 Forums:', forums.map(f => ({ title: f.title, members: f.members.length })));
    
    // Test creating a post
    const post = {
      forumId: result.insertedId,
      authorId: new ObjectId('507f1f77bcf86cd799439011'),
      content: 'Welcome to our mental health support forum!',
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0,
      comments: []
    };
    
    const postResult = await getDB().collection('posts').insertOne(post);
    console.log('✅ Created post:', postResult.insertedId);
    
    console.log('🎉 All tests passed!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testAPI();
