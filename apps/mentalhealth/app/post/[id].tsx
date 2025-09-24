import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { mongoService } from '@/services/mongodb';

export default function PostDetailScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const data = await mongoService.getPost(id);
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const handleVote = async (type) => {
    try {
      await mongoService.votePost(id, type);
      fetchPost(); // Refresh post data
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    
    setLoading(true);
    try {
      await mongoService.addComment(id, {
        authorId: '507f1f77bcf86cd799439011', // Mock student ID
        content: comment.trim()
      });
      setComment('');
      fetchPost(); // Refresh to show new comment
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!post) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, Typography.body, { color: colors.text }]}>
          Loading post...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backText, Typography.medium, { color: colors.text }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <ThemeToggle />
      </View>
      
      <ScrollView style={styles.content}>
        {/* Post Content */}
        <View style={[styles.postCard, { backgroundColor: colors.card }]}>
          <View style={styles.postHeader}>
            <Text style={[styles.postAuthor, Typography.body, { color: colors.textSecondary }]}>
              u/user • {new Date(post.createdAt).toLocaleDateString()}
            </Text>
          </View>
          
          <Text style={[styles.postContent, Typography.body, { color: colors.text }]}>
            {post.content}
          </Text>

          <View style={styles.postActions}>
            <View style={styles.voteSection}>
              <TouchableOpacity 
                style={styles.voteButton}
                onPress={() => handleVote('up')}
              >
                <Text style={[styles.voteText, { color: colors.tint }]}>↑</Text>
              </TouchableOpacity>
              <Text style={[styles.voteCount, Typography.body, { color: colors.text }]}>
                {(post.upvotes || 0) - (post.downvotes || 0)}
              </Text>
              <TouchableOpacity 
                style={styles.voteButton}
                onPress={() => handleVote('down')}
              >
                <Text style={[styles.voteText, { color: colors.textSecondary }]}>↓</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.commentCount, Typography.body, { color: colors.textSecondary }]}>
              💬 {post.comments?.length || 0} comments
            </Text>
          </View>
        </View>

        {/* Add Comment */}
        <View style={[styles.addCommentCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.addCommentLabel, Typography.medium, { color: colors.text }]}>
            Add a comment
          </Text>
          <TextInput
            style={[styles.commentInput, { backgroundColor: colors.background, color: colors.text }]}
            value={comment}
            onChangeText={setComment}
            placeholder="What are your thoughts?"
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={3}
          />
          <Button
            title={loading ? "Posting..." : "Comment"}
            onPress={handleAddComment}
            variant="primary"
            style={styles.commentButton}
          />
        </View>

        {/* Comments */}
        <View style={styles.commentsSection}>
          {post.comments?.map((comment, index) => (
            <View key={index} style={[styles.commentCard, { backgroundColor: colors.card }]}>
              <View style={styles.commentHeader}>
                <Text style={[styles.commentAuthor, Typography.body, { color: colors.textSecondary }]}>
                  u/user • {new Date(comment.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <Text style={[styles.commentContent, Typography.body, { color: colors.text }]}>
                {comment.content}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  backText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingText: {
    textAlign: 'center',
    padding: 40,
  },
  postCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  postHeader: {
    marginBottom: 12,
  },
  postAuthor: {
    fontSize: 12,
  },
  postContent: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  voteSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteButton: {
    padding: 8,
  },
  voteText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  voteCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 12,
  },
  commentCount: {
    fontSize: 14,
  },
  addCommentCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  addCommentLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  commentInput: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    minHeight: 80,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  commentButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 8,
    minHeight: 36,
  },
  commentsSection: {
    marginBottom: 32,
  },
  commentCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    marginLeft: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  commentHeader: {
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 12,
  },
  commentContent: {
    fontSize: 14,
    lineHeight: 20,
  },
});
