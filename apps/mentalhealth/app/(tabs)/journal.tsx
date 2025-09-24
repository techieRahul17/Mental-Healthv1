import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import { WeekSelector } from '@/components/ui/week-selector';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';

const DAILY_AFFIRMATIONS = [
  "I love myself and I love my life.",
  "Every day brings new opportunities for growth.",
  "You have the strength to overcome any challenge.",
  "Your mental health matters and deserves attention.",
  "You are making progress, even when it doesn't feel like it.",
];

export default function JournalScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [journalEntry, setJournalEntry] = useState('');
  const [markedDates, setMarkedDates] = useState<any>({});
  const [dailyAffirmation, setDailyAffirmation] = useState('');

  useEffect(() => {
    loadJournalEntry(selectedDate);
    loadMarkedDates();
    setDailyAffirmation(DAILY_AFFIRMATIONS[Math.floor(Math.random() * DAILY_AFFIRMATIONS.length)]);
  }, [selectedDate]);

  const loadJournalEntry = async (date: string) => {
    try {
      const entry = await AsyncStorage.getItem(`journal_${date}`);
      setJournalEntry(entry || '');
    } catch (error) {
      console.error('Error loading journal entry:', error);
    }
  };

  const loadMarkedDates = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const journalKeys = keys.filter(key => key.startsWith('journal_'));
      const marked: any = {};
      
      journalKeys.forEach(key => {
        const date = key.replace('journal_', '');
        marked[date] = {
          marked: true,
          dotColor: colors.tint,
        };
      });

      setMarkedDates(marked);
    } catch (error) {
      console.error('Error loading marked dates:', error);
    }
  };

  const saveJournalEntry = async (text: string) => {
    try {
      if (text.trim()) {
        await AsyncStorage.setItem(`journal_${selectedDate}`, text);
      } else {
        await AsyncStorage.removeItem(`journal_${selectedDate}`);
      }
      loadMarkedDates();
    } catch (error) {
      console.error('Error saving journal entry:', error);
    }
  };

  const handleTextChange = (text: string) => {
    setJournalEntry(text);
    setTimeout(() => saveJournalEntry(text), 1000);
  };

  const onDateSelect = (date: string) => {
    setSelectedDate(date);
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
        <View style={styles.titleSection}>
          <Text style={[styles.title, Typography.heading, { color: colors.text }]}>
            Gratitude Journal
          </Text>
        </View>

        {/* Minimalist Week Selector */}
        <WeekSelector
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          markedDates={markedDates}
        />

        {/* Journal Entry*/}
        <View style={styles.entrySection}>
          <Text style={[styles.entryPrompt, Typography.medium, { color: colors.text }]}>
            I'm grateful for ....
          </Text>
          <TextInput
            style={[
              styles.textInput,
              Typography.body,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                color: colors.text,
              }
            ]}
            value={journalEntry}
            onChangeText={handleTextChange}
            placeholder="Write what you're grateful for today..."
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Daily Affirmation*/}
        <View style={[styles.affirmationCard, { backgroundColor: colors.tint }]}>
          <Text style={[styles.affirmationTitle, Typography.subheading, { color: colors.card }]}>
            Daily Affirmation
          </Text>
          <Text style={[styles.affirmationText, Typography.body, { color: colors.card }]}>
            {dailyAffirmation}
          </Text>
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
  titleSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
  },
  entrySection: {
    marginBottom: 32,
  },
  entryPrompt: {
    fontSize: 18,
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    fontSize: 16,
    minHeight: 140,
  },
  affirmationCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
  },
  affirmationTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  affirmationText: {
    fontSize: 16,
    lineHeight: 22,
    fontStyle: 'italic',
  },
});
