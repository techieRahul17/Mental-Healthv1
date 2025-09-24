import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({ title, onPress, variant = 'primary', style, textStyle }: ButtonProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const buttonStyle = [
    styles.button,
    variant === 'primary' ? {
      backgroundColor: colors.buttonPrimary,
    } : {
      backgroundColor: colors.buttonSecondary,
      borderWidth: 2,
      borderColor: colors.buttonPrimary,
    },
    style,
  ];

  const textStyleCombined = [
    styles.text,
    Typography.medium,
    variant === 'primary' ? {
      color: colors.card,
    } : {
      color: colors.buttonPrimary,
    },
    textStyle,
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} activeOpacity={0.8}>
      <Text style={textStyleCombined}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30, // Very rounded like Figma
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  text: {
    fontSize: 16,
  },
});
