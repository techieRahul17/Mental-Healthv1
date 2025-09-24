require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, getDB, ObjectId } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Users Routes
app.post('/users', async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = {
      username,
      email,
      createdAt: new Date(),
      joinedForums: []
    };
    const result = await getDB().collection('students').insertOne(user);
    res.json({ _id: result.insertedId, ...user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await getDB().collection('students').findOne({ _id: new ObjectId(req.params.id) });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Forums Routes
app.post('/forums', async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;
    
    // Handle createdBy - convert to ObjectId if it's a valid hex string, otherwise use as string
    let createdByValue;
    try {
      if (createdBy && createdBy.length === 24 && /^[0-9a-fA-F]{24}$/.test(createdBy)) {
        createdByValue = new ObjectId(createdBy);
      } else {
        createdByValue = createdBy; // Use as string for user-generated IDs
      }
    } catch (e) {
      createdByValue = createdBy; // Fallback to string
    }
    
    const forum = {
      title,
      description,
      createdBy: createdByValue,
      members: [createdByValue],
      createdAt: new Date()
    };
    
    const result = await getDB().collection('forums').insertOne(forum);
    res.json({ _id: result.insertedId, ...forum });
  } catch (error) {
    console.error('Create forum error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/forums', async (req, res) => {
  try {
    const forums = await getDB().collection('forums').find({}).toArray();
    res.json(forums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/forums/:id', async (req, res) => {
  try {
    const forum = await getDB().collection('forums').findOne({ _id: new ObjectId(req.params.id) });
    const posts = await getDB().collection('posts').find({ forumId: new ObjectId(req.params.id) }).toArray();
    res.json({ ...forum, posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/forums/:id/posts', async (req, res) => {
  try {
    const posts = await getDB().collection('posts').find({ forumId: new ObjectId(req.params.id) }).toArray();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/forums/:id/join', async (req, res) => {
  try {
    const { studentId } = req.body;
    await getDB().collection('forums').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $addToSet: { members: new ObjectId(studentId) } }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Posts Routes
app.post('/posts', async (req, res) => {
  try {
    const { forumId, authorId, content } = req.body;
    
    // Handle IDs properly
    let forumObjectId, authorValue;
    try {
      forumObjectId = new ObjectId(forumId);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid forum ID' });
    }
    
    try {
      if (authorId && authorId.length === 24 && /^[0-9a-fA-F]{24}$/.test(authorId)) {
        authorValue = new ObjectId(authorId);
      } else {
        authorValue = authorId; // Use as string
      }
    } catch (e) {
      authorValue = authorId;
    }
    
    const post = {
      forumId: forumObjectId,
      authorId: authorValue,
      content,
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0,
      comments: []
    };
    
    const result = await getDB().collection('posts').insertOne(post);
    res.json({ _id: result.insertedId, ...post });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/posts/:id', async (req, res) => {
  try {
    const post = await getDB().collection('posts').findOne({ _id: new ObjectId(req.params.id) });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/posts/:id/vote', async (req, res) => {
  try {
    const { type } = req.body; // 'up' or 'down'
    const field = type === 'up' ? 'upvotes' : 'downvotes';
    await getDB().collection('posts').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $inc: { [field]: 1 } }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Comments Routes
app.post('/posts/:id/comments', async (req, res) => {
  try {
    const { authorId, content } = req.body;
    
    let authorValue;
    try {
      if (authorId && authorId.length === 24 && /^[0-9a-fA-F]{24}$/.test(authorId)) {
        authorValue = new ObjectId(authorId);
      } else {
        authorValue = authorId; // Use as string for user-generated IDs
      }
    } catch (e) {
      authorValue = authorId;
    }
    
    const comment = {
      _id: new ObjectId(),
      authorId: authorValue,
      content,
      createdAt: new Date(),
      replies: []
    };
    await getDB().collection('posts').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $push: { comments: comment } }
    );
    res.json(comment);
  } catch (error) {
    console.error('Comment error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/posts/:id/comments/:commentId/reply', async (req, res) => {
  try {
    const { authorId, content } = req.body;
    const reply = {
      _id: new ObjectId(),
      authorId: new ObjectId(authorId),
      content,
      createdAt: new Date()
    };
    await getDB().collection('posts').updateOne(
      { _id: new ObjectId(req.params.id), 'comments._id': new ObjectId(req.params.commentId) },
      { $push: { 'comments.$.replies': reply } }
    );
    res.json(reply);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add reply to comment (supports nested replies)
app.post('/posts/:postId/comments/:commentPath/replies', async (req, res) => {
  try {
    const { postId, commentPath } = req.params;
    const { authorId, content } = req.body;
    
    let authorValue;
    try {
      if (authorId && authorId.length === 24 && /^[0-9a-fA-F]{24}$/.test(authorId)) {
        authorValue = new ObjectId(authorId);
      } else {
        authorValue = authorId;
      }
    } catch (e) {
      authorValue = authorId;
    }
    
    const reply = {
      authorId: authorValue,
      content,
      createdAt: new Date(),
      replies: []
    };
    
    // Handle nested comment paths like "0-1-2" for deeply nested replies
    const pathParts = commentPath.split('-');
    let updatePath = 'comments';
    
    for (let i = 0; i < pathParts.length; i++) {
      updatePath += `.${pathParts[i]}`;
      if (i < pathParts.length - 1) {
        updatePath += '.replies';
      }
    }
    updatePath += '.replies';
    
    const result = await getDB().collection('posts').updateOne(
      { _id: new ObjectId(postId) },
      { $push: { [updatePath]: reply } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({ success: true, reply });
  } catch (error) {
    console.error('Add reply error:', error);
    res.status(500).json({ error: error.message });
  }
});

connectDB().then(() => {
  app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${process.env.PORT} (accessible from all interfaces)`);
  });
});
