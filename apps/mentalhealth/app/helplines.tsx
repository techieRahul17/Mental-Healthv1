import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { HelplineCard } from '@/components/ui/helpline-card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';

const HELPLINES = [
  {
    name: 'TeleManas',
    number: '14416',
    description: 'Mental health care through 24X7 tele-mental health services',
    logo: '🏥',
  },
  {
    name: 'Vandrevala Foundation',
    number: '+91 9999666555',
    description: 'Suicide prevention, depression, and other mental health concern.',
    logo: '🤝',
  },
  {
    name: 'Connecting Trust',
    number: '+91 9922004305',
    description: 'Suicide Prevention and mental health concerns.',
    logo: '💙',
  },
  {
    name: 'iCall',
    number: '+91 9152987821',
    description: 'Psychological and mental health Helpline Kiran 24/7',
    logo: '📞',
  },
];

export default function HelplinesScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];

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
        <Text style={[styles.title, Typography.heading, { color: colors.text }]}>
          Emergency{'\n'}Helplines
        </Text>
        <Text style={[styles.subtitle, Typography.body, { color: colors.textSecondary }]}>
          24/7 support when you need it most
        </Text>

        <View style={styles.helplines}>
          {HELPLINES.map((helpline, index) => (
            <HelplineCard key={index} {...helpline} />
          ))}
        </View>

        <Text style={[styles.note, Typography.body, { color: colors.textSecondary }]}>
          In case of immediate emergency, contact local emergency services.
        </Text>
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
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  helplines: {
    marginBottom: 32,
  },
  note: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 32,
  },
});
