import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/theme-context';
import { Colors } from '@/constants/theme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const colors = Colors[theme];

  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: colors.tint }]} 
      onPress={toggleTheme}
    >
      <Text style={[styles.text, { color: colors.background }]}>
        {theme === 'light' ? '🌙' : '☀️'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
