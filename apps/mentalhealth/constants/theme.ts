/**
 * EXACT Figma Design System - Mental Health App
 */

import { Platform } from 'react-native';

// EXACT colors from Figma design
const FIGMA_COLORS = {
  // Light mint green background (from Figma)
  background: '#E8F4F0',
  // Dark saturated green for primary elements
  primary: '#2D5A3D',
  // Slightly lighter green for secondary elements
  secondary: '#4A7C59',
  // Dark green for text
  text: '#2D5A3D',
  // White for cards and buttons
  white: '#FFFFFF',
  // Light green for borders
  border: '#C8E6C9',
};

export const Colors = {
  light: {
    text: FIGMA_COLORS.text,
    background: FIGMA_COLORS.background,
    tint: FIGMA_COLORS.primary,
    icon: FIGMA_COLORS.primary,
    tabIconDefault: '#FFFFFF',
    tabIconSelected: '#FFFFFF',
    card: FIGMA_COLORS.white,
    border: FIGMA_COLORS.border,
    buttonPrimary: FIGMA_COLORS.primary,
    buttonSecondary: 'transparent',
    textSecondary: FIGMA_COLORS.secondary,
    tabBar: FIGMA_COLORS.primary,
  },
  dark: {
    text: '#E8F5E9',
    background: '#0D2818',
    tint: '#E8F5E9',
    icon: '#81C784',
    tabIconDefault: '#81C784',
    tabIconSelected: '#E8F5E9',
    card: '#1A4F46',
    border: '#2E7D32',
    buttonPrimary: '#E8F5E9',
    buttonSecondary: 'transparent',
    textSecondary: '#81C784',
    tabBar: '#1A4F46',
  },
};

// Outfit font system - EXACT from Figma
export const Typography = {
  // Large headings - Bold Outfit
  heading: {
    fontFamily: 'Outfit_700Bold',
    fontWeight: '700' as const,
  },
  // Subheadings - SemiBold Outfit
  subheading: {
    fontFamily: 'Outfit_600SemiBold',
    fontWeight: '600' as const,
  },
  // Medium text - Medium Outfit
  medium: {
    fontFamily: 'Outfit_500Medium',
    fontWeight: '500' as const,
  },
  // Body text - Regular Outfit
  body: {
    fontFamily: 'Outfit_400Regular',
    fontWeight: '400' as const,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    serif: 'System',
    rounded: 'System',
    mono: 'System',
  },
  default: {
    sans: 'System',
    serif: 'System',
    rounded: 'System',
    mono: 'System',
  },
  web: {
    sans: "'Outfit', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "'Outfit', Georgia, 'Times New Roman', serif",
    rounded: "'Outfit', 'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "'Outfit', SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
