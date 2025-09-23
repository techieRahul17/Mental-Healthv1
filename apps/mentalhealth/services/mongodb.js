// Real MongoDB service using the backend API
const API_BASE = 'http://10.37.124.96:3001';

// Fallback forums data
const fallbackForums = [
  {
    _id: '1',
    title: 'Mental Health Support',
    description: 'A safe space to discuss mental health',
    createdBy: 'user1',
    members: ['user1'],
    createdAt: new Date().toISOString(),
    posts: []
  },
  {
    _id: '2',
    title: 'Anxiety Support',
    description: 'Support for anxiety and panic disorders',
    createdBy: 'user1', 
    members: ['user1'],
    createdAt: new Date().toISOString(),
    posts: []
  },
  {
    _id: '3',
    title: 'Depression Support',
    description: 'Support group for depression',
    createdBy: 'user1',
    members: ['user1'],
    createdAt: new Date().toISOString(),
    posts: []
  }
];

export const mongoService = {
  async getForums() {
    try {
      const response = await fetch(`${API_BASE}/forums`);
      if (!response.ok) throw new Error('Failed to fetch forums');
      return await response.json();
    } catch (error) {
      console.warn('Using fallback forums:', error.message);
      return fallbackForums;
    }
  },

  async createForum(forumData) {
    try {
      const response = await fetch(`${API_BASE}/forums`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(forumData)
      });
      if (!response.ok) throw new Error('Failed to create forum');
      return await response.json();
    } catch (error) {
      console.warn('API failed, creating forum locally:', error.message);
      const newForum = {
        _id: Date.now().toString(),
        ...forumData,
        members: [forumData.createdBy],
        createdAt: new Date().toISOString(),
        posts: []
      };
      fallbackForums.push(newForum);
      return newForum;
    }
  },

  async getForum(id) {
    try {
      const response = await fetch(`${API_BASE}/forums/${id}`);
      if (!response.ok) throw new Error('Failed to fetch forum');
      return await response.json();
    } catch (error) {
      console.error('MongoDB getForum error:', error);
      throw error;
    }
  },

  async getPostsByForum(forumId) {
    try {
      const response = await fetch(`${API_BASE}/forums/${forumId}/posts`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      return await response.json();
    } catch (error) {
      console.warn('Failed to fetch posts, returning empty array:', error.message);
      return [];
    }
  },

  async getPosts() {
    try {
      const response = await fetch(`${API_BASE}/posts`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      return await response.json();
    } catch (error) {
      console.warn('Failed to fetch posts, returning empty array:', error.message);
      return [];
    }
  },

  async createPost(postData) {
    try {
      const response = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      if (!response.ok) throw new Error('Failed to create post');
      return await response.json();
    } catch (error) {
      console.error('MongoDB createPost error:', error);
      throw error;
    }
  },

  async getPost(id) {
    try {
      const response = await fetch(`${API_BASE}/posts/${id}`);
      if (!response.ok) throw new Error('Failed to fetch post');
      return await response.json();
    } catch (error) {
      console.error('MongoDB getPost error:', error);
      throw error;
    }
  },

  async votePost(postId, type) {
    try {
      const response = await fetch(`${API_BASE}/posts/${postId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      if (!response.ok) throw new Error('Failed to vote');
      return await response.json();
    } catch (error) {
      console.error('MongoDB votePost error:', error);
      throw error;
    }
  },

  async addComment(postId, commentData) {
    try {
      const response = await fetch(`${API_BASE}/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData)
      });
      if (!response.ok) throw new Error('Failed to add comment');
      return await response.json();
    } catch (error) {
      console.warn('API failed for comment, using fallback');
      return { success: false };
    }
  },

  async addReply(postId, commentPath, replyData) {
    try {
      const response = await fetch(`${API_BASE}/posts/${postId}/comments/${commentPath}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(replyData)
      });
      if (!response.ok) throw new Error('Failed to add reply');
      return await response.json();
    } catch (error) {
      console.warn('API failed for reply, using fallback');
      return { success: false };
    }
  }
};
