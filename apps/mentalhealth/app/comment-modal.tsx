import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { Button } from '@/components/ui/button';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { mongoService } from '@/services/mongodb';

export default function CommentModalScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { postId, postContent, commentIndex, commentContent, type } = useLocalSearchParams();
  
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter some content');
      return;
    }

    setLoading(true);
    try {
      if (type === 'reply') {
        await mongoService.addReply(postId, commentIndex, {
          authorId: '507f1f77bcf86cd799439011', // Mock student ID
          content: content.trim()
        });
      } else {
        await mongoService.addComment(postId, {
          authorId: '507f1f77bcf86cd799439011', // Mock student ID
          content: content.trim()
        });
      }
      
      Alert.alert('Success', `${type === 'reply' ? 'Reply' : 'Comment'} added successfully!`);
      router.back();
    } catch (error) {
      console.error('Submit error:', error);
      Alert.alert('Error', 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, Typography.heading, { color: colors.text }]}>
          {type === 'reply' ? 'Add Reply' : 'Add Comment'}
        </Text>
      </View>

      <View style={styles.content}>
        {/* Show original content */}
        <View style={[styles.originalContent, { backgroundColor: colors.card }]}>
          <Text style={[styles.originalLabel, Typography.medium, { color: colors.textSecondary }]}>
            {type === 'reply' ? 'Replying to comment:' : 'Commenting on post:'}
          </Text>
          <Text style={[styles.originalContent, Typography.body, { color: colors.text }]}>
            {type === 'reply' ? commentContent : postContent}
          </Text>
        </View>

        {/* Input section */}
        <View style={styles.inputSection}>
          <Text style={[styles.inputLabel, Typography.medium, { color: colors.text }]}>
            Your {type === 'reply' ? 'reply' : 'comment'}:
          </Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: colors.card, color: colors.text }]}
            value={content}
            onChangeText={setContent}
            placeholder={`Write your ${type === 'reply' ? 'reply' : 'comment'} here...`}
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Action buttons */}
        <View style={styles.actions}>
          <Button
            title="Cancel"
            onPress={() => router.back()}
            variant="secondary"
            style={styles.cancelButton}
          />
          <Button
            title={loading ? 'Submitting...' : 'Submit'}
            onPress={handleSubmit}
            variant="primary"
            style={styles.submitButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  originalContent: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  originalLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  textInput: {
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
    fontSize: 16,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
  },
  submitButton: {
    flex: 1,
  },
});
