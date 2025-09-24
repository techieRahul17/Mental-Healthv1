import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Button } from '@/components/ui/button';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { useUser } from '@/contexts/user-context';
import { mongoService } from '@/services/mongodb';

export default function CreateForumScreen() {
  const { theme } = useTheme();
  const { user } = useUser();
  const colors = Colors[theme];
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await mongoService.createForum({
        title: title.trim(),
        description: description.trim(),
        createdBy: user?.id || '507f1f77bcf86cd799439011', // Mock student ID
      });
      
      Alert.alert('Success', 'Forum created successfully!');
      router.back();
    } catch (error) {
      console.error('Create forum error:', error);
      Alert.alert('Error', 'Failed to create forum. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, Typography.heading, { color: colors.text }]}>
          Create Forum
        </Text>

        <View style={styles.form}>
          <Text style={[styles.label, Typography.medium, { color: colors.text }]}>
            Forum Title
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter forum title"
            placeholderTextColor={colors.textSecondary}
          />

          <Text style={[styles.label, Typography.medium, { color: colors.text }]}>
            Description
          </Text>
          <TextInput
            style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe what this forum is about"
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
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
              title={loading ? "Creating..." : "Create Forum"}
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
  input: {
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
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
