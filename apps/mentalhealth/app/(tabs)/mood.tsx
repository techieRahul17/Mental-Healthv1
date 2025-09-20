import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MoodOption } from '@/components/ui/mood-option';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';

interface MoodData {
  id: string;
  emoji: string;
  label: string;
}

const MOOD_OPTIONS: MoodData[] = [
  { id: 'great', emoji: '😊', label: 'Great' },
  { id: 'good', emoji: '🙂', label: 'Good' },
  { id: 'anxious', emoji: '😰', label: 'Anxious' },
  { id: 'okay', emoji: '😐', label: 'Okay' },
  { id: 'sad', emoji: '😢', label: 'Sad' },
];

export default function MoodScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useEffect(() => {
    loadTodaysMood();
  }, []);

  const loadTodaysMood = async () => {
    try {
      const today = new Date().toDateString();
      const savedMood = await AsyncStorage.getItem(`mood_${today}`);
      if (savedMood) {
        setSelectedMood(savedMood);
      }
    } catch (error) {
      console.error('Error loading mood:', error);
    }
  };

  const handleMoodSelect = async (moodId: string) => {
    try {
      const today = new Date().toDateString();
      await AsyncStorage.setItem(`mood_${today}`, moodId);
      setSelectedMood(moodId);
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, Typography.medium, { color: colors.text }]}>
          takeUrTime
        </Text>
        <ThemeToggle />
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.promptSection}>
          <Text style={[styles.prompt, Typography.subheading, { color: colors.text }]}>
            How are you feeling today?
          </Text>
        </View>

        {/* Floating bubbles layout - EXACT Figma design */}
        <View style={styles.moodBubblesContainer}>
          <View style={styles.row1}>
            <MoodOption
              key={MOOD_OPTIONS[0].id}
              emoji={MOOD_OPTIONS[0].emoji}
              label={MOOD_OPTIONS[0].label}
              isSelected={selectedMood === MOOD_OPTIONS[0].id}
              onPress={() => handleMoodSelect(MOOD_OPTIONS[0].id)}
            />
            <MoodOption
              key={MOOD_OPTIONS[1].id}
              emoji={MOOD_OPTIONS[1].emoji}
              label={MOOD_OPTIONS[1].label}
              isSelected={selectedMood === MOOD_OPTIONS[1].id}
              onPress={() => handleMoodSelect(MOOD_OPTIONS[1].id)}
            />
          </View>
          
          <View style={styles.row2}>
            <MoodOption
              key={MOOD_OPTIONS[2].id}
              emoji={MOOD_OPTIONS[2].emoji}
              label={MOOD_OPTIONS[2].label}
              isSelected={selectedMood === MOOD_OPTIONS[2].id}
              onPress={() => handleMoodSelect(MOOD_OPTIONS[2].id)}
            />
          </View>
          
          <View style={styles.row3}>
            <MoodOption
              key={MOOD_OPTIONS[3].id}
              emoji={MOOD_OPTIONS[3].emoji}
              label={MOOD_OPTIONS[3].label}
              isSelected={selectedMood === MOOD_OPTIONS[3].id}
              onPress={() => handleMoodSelect(MOOD_OPTIONS[3].id)}
            />
            <MoodOption
              key={MOOD_OPTIONS[4].id}
              emoji={MOOD_OPTIONS[4].emoji}
              label={MOOD_OPTIONS[4].label}
              isSelected={selectedMood === MOOD_OPTIONS[4].id}
              onPress={() => handleMoodSelect(MOOD_OPTIONS[4].id)}
            />
          </View>
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
  headerTitle: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  promptSection: {
    marginBottom: 40,
  },
  prompt: {
    fontSize: 20,
  },
  moodBubblesContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  row3: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
});
