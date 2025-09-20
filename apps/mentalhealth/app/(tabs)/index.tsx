import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';

export default function HomeScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const handleBookAppointment = () => {
    router.push('/(tabs)/appointments');
  };

  const handleStartChat = () => {
    router.push('/(tabs)/chat');
  };

  const handleBreathingExercises = () => {
    router.push('/breathing');
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
        {/* Main Heading - CONSISTENT Outfit Bold Font */}
        <View style={styles.mainSection}>
          <Text style={[styles.mainHeading, Typography.heading, { color: colors.text }]}>
            Because your{'\n'}mental health{'\n'}matters.
          </Text>
          
          <Text style={[styles.description, Typography.body, { color: colors.text }]}>
            Take a step towards healing with a{'\n'}stigma-free, accessible, and secure{'\n'}mental wellness companion.
          </Text>
        </View>

        {/* Action Buttons*/}
        <View style={styles.buttonSection}>
          <Button
            title="Book Appointment"
            onPress={handleBookAppointment}
            variant="primary"
            style={styles.primaryButton}
          />
          <Button
            title="Start Chat"
            onPress={handleStartChat}
            variant="secondary"
            style={styles.secondaryButton}
          />
        </View>

        {/* Looking for more section*/}
        <View style={styles.moreSection}>
          <Text style={[styles.moreText, Typography.body, { color: colors.text }]}>
            Looking for more? Check the{'\n'}menu above to explore self-care,{'\n'}music, journals, and more
          </Text>
        </View>

        {/* Quick Access - Styled like Start Chat button */}
        <View style={styles.quickAccessSection}>
          <Button
            title="🫁 Breathing Exercises"
            onPress={handleBreathingExercises}
            variant="secondary"
            style={styles.quickAccessButton}
          />
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
  mainSection: {
    marginBottom: 48,
  },
  mainHeading: {
    fontSize: 36,
    lineHeight: 44,
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.8,
  },
  buttonSection: {
    marginBottom: 48,
  },
  primaryButton: {
    marginBottom: 16,
  },
  secondaryButton: {
    marginBottom: 0,
  },
  moreSection: {
    marginBottom: 32,
  },
  moreText: {
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.8,
  },
  quickAccessSection: {
    marginBottom: 48,
  },
  quickAccessButton: {
    marginBottom: 0,
  },
});
