import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';

interface MoodOptionProps {
  emoji: string;
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export function MoodOption({ emoji, label, isSelected, onPress }: MoodOptionProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <TouchableOpacity
      style={[
        styles.bubble,
        {
          backgroundColor: isSelected ? colors.tint : colors.card,
          shadowColor: colors.tint,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[
        styles.label,
        Typography.medium,
        { color: isSelected ? colors.card : colors.text }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bubble: {
    // Circular/bubble shape like Figma
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginRight: 12,
    minWidth: 80,
    // Floating effect
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
  },
});
