import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { Button } from '@/components/ui/button';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { useUser } from '@/contexts/user-context';
import { mongoService } from '@/services/mongodb';

export default function CreatePostScreen() {
  const { theme } = useTheme();
  const { user } = useUser();
  const colors = Colors[theme];
  const { forumId } = useLocalSearchParams();
  
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter some content');
      return;
    }

    setLoading(true);
    try {
      await mongoService.createPost({
        forumId,
        content: content.trim(),
        authorId: user?.id || '507f1f77bcf86cd799439011', // Mock student ID
      });
      
      Alert.alert('Success', 'Post created successfully!');
      router.back();
    } catch (error) {
      console.error('Create post error:', error);
      Alert.alert('Error', 'Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, Typography.heading, { color: colors.text }]}>
          Create Post
        </Text>

        <View style={styles.form}>
          <Text style={[styles.label, Typography.medium, { color: colors.text }]}>
            What's on your mind?
          </Text>
          <TextInput
            style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
            value={content}
            onChangeText={setContent}
            placeholder="Share your thoughts, ask questions, or start a discussion..."
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={8}
            textAlignVertical="top"
          />

          <View style={styles.actions}>
            <Button
              title="Cancel"
              onPress={() => router.back()}
              variant="secondary"
              style={styles.cancelButton}
            />
            <Button
              title={loading ? "Posting..." : "Create Post"}
              onPress={handleSubmit}
              variant="primary"
              style={styles.submitButton}
            />
          </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  form: {
    gap: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  textArea: {
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    minHeight: 200,
    marginBottom: 24,
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
