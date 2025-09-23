import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams, useFocusEffect } from 'expo-router';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { useUser } from '@/contexts/user-context';
import { mongoService } from '@/services/mongodb';
import { formatTimeAgo } from '@/utils/timeFormat';

export default function ForumDetailScreen() {
  const { theme } = useTheme();
  const { user } = useUser();
  const colors = Colors[theme];
  const { id } = useLocalSearchParams();
  
  const [forum, setForum] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState(new Set());

  const fetchForum = async () => {
    try {
      const forumData = await mongoService.getForum(id as string);
      const postsData = await mongoService.getPostsByForum(id as string);
      setForum(forumData);
      setPosts(postsData || []);
    } catch (error) {
      console.error('Fetch forum error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForum();
  }, [id]);

  useFocusEffect(
    React.useCallback(() => {
      fetchForum();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchForum();
    setRefreshing(false);
  };

  const renderComment = (comment: any, commentIndex: any, postId: string, depth: number) => {
    const marginLeft = depth * 16;
    const replyCount = comment.replies?.length || 0;
    
    return (
      <View key={`${commentIndex}-${depth}`} style={[styles.commentContainer, { backgroundColor: colors.card, marginLeft }]}>
        <View style={styles.commentHeader}>
          <Text style={[styles.commentAuthor, Typography.body, { color: colors.textSecondary }]}>
            u/{user?.username || 'user'} • {formatTimeAgo(comment.createdAt)}
          </Text>
        </View>
        <Text style={[styles.commentContent, Typography.body, { color: colors.text }]}>
          {comment.content}
        </Text>
        
        {/* Reply Link */}
        <TouchableOpacity 
          style={styles.replyLink}
          onPress={() => handleReply(postId, `${commentIndex}`, comment.content)}
        >
          <Text style={[styles.replyLinkText, { color: colors.tint }]}>
            ↳ Reply{replyCount > 0 ? ` (${replyCount})` : ''}
          </Text>
        </TouchableOpacity>

        {/* Nested Replies */}
        {comment.replies?.map((reply: any, replyIndex: number) => 
          renderComment(reply, `${commentIndex}-${replyIndex}`, postId, depth + 1)
        )}
      </View>
    );
  };

  const handleVote = async (postId: string, type: string) => {
    try {
      await mongoService.votePost(postId, type);
      fetchForum();
    } catch (error) {
      console.error('Vote error:', error);
    }
  };

  const handlePostPress = (postId: string) => {
    setExpandedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleAddComment = (postId: string, postContent: string) => {
    router.push({
      pathname: '/comment-modal',
      params: { postId, postContent, type: 'comment' }
    });
  };

  const handleReply = (postId: string, commentIndex: string, commentContent: string) => {
    router.push({
      pathname: '/comment-modal',
      params: { postId, commentIndex, commentContent, type: 'reply' }
    });
  };

  const handleCreatePost = () => {
    router.push({
      pathname: '/create-post',
      params: { forumId: id }
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, Typography.body, { color: colors.text }]}>
          Loading...
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

      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.forumInfo}>
          <Text style={[styles.title, Typography.heading, { color: colors.text }]}>
            {forum?.title}
          </Text>
          <Text style={[styles.description, Typography.body, { color: colors.textSecondary }]}>
            {forum?.description}
          </Text>
          <Text style={[styles.memberCount, Typography.body, { color: colors.tint }]}>
            {forum?.members?.length || 0} members
          </Text>
        </View>

        <View style={styles.postsSection}>
          <View style={styles.postsHeader}>
            <Text style={[styles.postsTitle, Typography.subheading, { color: colors.text }]}>
              Posts
            </Text>
            <Button
              title="Create Post"
              onPress={handleCreatePost}
              variant="primary"
            />
          </View>

          {posts.length === 0 ? (
            <View style={styles.emptyPosts}>
              <Text style={[styles.emptyText, Typography.body, { color: colors.textSecondary }]}>
                No posts yet. Be the first to post!
              </Text>
            </View>
          ) : (
            posts.map((post: any, postIndex: number) => (
              <View key={postIndex} style={styles.postContainer}>
                <View style={[styles.postCard, { backgroundColor: colors.card }]}>
                  <View style={styles.postHeader}>
                    <Text style={[styles.postAuthor, Typography.body, { color: colors.textSecondary }]}>
                      u/{user?.username || 'user'} • {formatTimeAgo(post.createdAt)}
                    </Text>
                  </View>
                  
                  <TouchableOpacity onPress={() => handlePostPress(post._id)}>
                    <Text style={[styles.postContent, Typography.body, { color: colors.text }]}>
                      {post.content}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.postActions}>
                    <View style={styles.voteSection}>
                      <TouchableOpacity 
                        style={styles.voteButton}
                        onPress={() => handleVote(post._id, 'up')}
                      >
                        <Text style={[styles.voteText, { color: colors.tint }]}>↑</Text>
                      </TouchableOpacity>
                      <Text style={[styles.voteCount, Typography.body, { color: colors.text }]}>
                        {(post.upvotes || 0) - (post.downvotes || 0)}
                      </Text>
                      <TouchableOpacity 
                        style={styles.voteButton}
                        onPress={() => handleVote(post._id, 'down')}
                      >
                        <Text style={[styles.voteText, { color: colors.textSecondary }]}>↓</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.commentButton}
                      onPress={() => handlePostPress(post._id)}
                    >
                      <Text style={[styles.commentText, Typography.body, { color: colors.textSecondary }]}>
                        💬 Comment ({post.comments?.length || 0})
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {expandedPosts.has(post._id) && (
                  <View style={[styles.commentsSection, { backgroundColor: colors.background }]}>
                    <TouchableOpacity 
                      style={styles.addCommentLink}
                      onPress={() => handleAddComment(post._id, post.content)}
                    >
                      <Text style={[styles.addCommentLinkText, { color: colors.tint }]}>
                        💬 Add a comment
                      </Text>
                    </TouchableOpacity>

                    {post.comments?.map((comment: any, commentIndex: number) => 
                      renderComment(comment, commentIndex, post._id, 0)
                    )}
                  </View>
                )}
              </View>
            ))
          )}
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
  forumInfo: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  memberCount: {
    fontSize: 12,
    marginTop: 4,
  },
  postsSection: {
    flex: 1,
  },
  postsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  postsTitle: {
    fontSize: 18,
  },
  emptyPosts: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
  postContainer: {
    marginBottom: 16,
  },
  postCard: {
    padding: 16,
    borderRadius: 8,
  },
  postHeader: {
    marginBottom: 8,
  },
  postAuthor: {
    fontSize: 12,
  },
  postContent: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  voteCount: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  commentButton: {
    padding: 8,
  },
  commentText: {
    fontSize: 14,
  },
  commentsSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  addCommentLink: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  addCommentLinkText: {
    fontSize: 14,
    fontWeight: '500',
  },
  commentContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentHeader: {
    marginBottom: 6,
  },
  commentAuthor: {
    fontSize: 12,
  },
  commentContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  replyLink: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  replyLinkText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
