require('dotenv').config();
const express = require('express');
const { connectDB, getDB } = require('../db');

async function testServer() {
  try {
    await connectDB();
    console.log('✅ MongoDB connected');
    
    // Test getting forums from database
    const forums = await getDB().collection('forums').find({}).toArray();
    console.log('✅ Found', forums.length, 'forums in database');
    
    // Test API response format
    console.log('📋 Sample forum data:');
    forums.forEach(forum => {
      console.log(`- ${forum.title}: ${forum.members.length} members`);
    });
    
    console.log('🎉 Server test completed successfully!');
    
  } catch (error) {
    console.error('❌ Server test failed:', error.message);
  }
  
  process.exit(0);
}

testServer();
