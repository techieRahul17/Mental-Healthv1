import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';

export default function ChatScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const handleStartChat = () => {
    console.log('Starting chat session...');
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
      
      <View style={styles.content}>
        {/* Greeting Sectio*/}
        <View style={styles.greetingSection}>
          <Text style={[styles.greeting, Typography.heading, { color: colors.text }]}>
            Hi User,
          </Text>
          <Text style={[styles.prompt, Typography.heading, { color: colors.text }]}>
            Whats{'\n'}Happening?
          </Text>
        </View>

        {/* Chat Prompt Section*/}
        <View style={styles.promptSection}>
          <TouchableOpacity 
            style={[styles.promptContainer, { backgroundColor: colors.card }]}
            onPress={handleStartChat}
          >
            <Text style={[styles.promptText, Typography.body, { color: colors.text }]}>
              Feeling stressed? Let's talk...
            </Text>
            <View style={[styles.micIcon, { backgroundColor: colors.tint }]}>
              <Text style={styles.micText}>🎤</Text>
            </View>
          </TouchableOpacity>
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
    justifyContent: 'space-between',
  },
  greetingSection: {
    marginTop: 48,
  },
  greeting: {
    fontSize: 42,
    marginBottom: 8,
  },
  prompt: {
    fontSize: 42,
    lineHeight: 50,
  },
  promptSection: {
    marginBottom: 120,
  },
  promptContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  promptText: {
    fontSize: 16,
    flex: 1,
  },
  micIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  micText: {
    fontSize: 18,
  },
});
