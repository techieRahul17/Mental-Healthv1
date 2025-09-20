import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';

const BREATHING_EXERCISES = [
  {
    id: 'calm-breathing',
    title: 'Calm Breathing',
    description: '4-6 breathing pattern',
    emoji: '🫁',
  },
  {
    id: 'visual-breathing',
    title: 'Visual Breathing',
    description: 'Guided visualization',
    emoji: '👁️',
  },
  {
    id: 'box-breathing',
    title: 'Box Breathing',
    description: '4-4-4-4 pattern',
    emoji: '📦',
  },
  {
    id: 'deep-breathing',
    title: 'Deep Breathing',
    description: 'Slow, deep breaths',
    emoji: '🌊',
  },
];

export default function BreathingExercisesScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const handleExercisePress = (exerciseId: string) => {
    if (exerciseId === 'calm-breathing') {
      router.push('/breathing/calm-breathing');
    } else {
      console.log('Exercise not implemented yet:', exerciseId);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={[styles.backText, Typography.medium, { color: colors.text }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <ThemeToggle />
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={[styles.title, Typography.heading, { color: colors.text }]}>
            Let's do some{'\n'}breathing exercise!
          </Text>
          <Text style={[styles.description, Typography.body, { color: colors.text }]}>
            Choose from our collection of guided breathing{'\n'}exercises to help you relax and center yourself.
          </Text>
        </View>

        <View style={styles.exercisesGrid}>
          {BREATHING_EXERCISES.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={[
                styles.exerciseCard,
                {
                  backgroundColor: colors.card,
                  shadowColor: colors.tint,
                }
              ]}
              onPress={() => handleExercisePress(exercise.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.exerciseEmoji}>{exercise.emoji}</Text>
              <Text style={[styles.exerciseTitle, Typography.subheading, { color: colors.text }]}>
                {exercise.title}
              </Text>
              <Text style={[styles.exerciseDescription, Typography.body, { color: colors.textSecondary }]}>
                {exercise.description}
              </Text>
            </TouchableOpacity>
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
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleSection: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.8,
  },
  exercisesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exerciseCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  exerciseEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  exerciseTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  exerciseDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
});
