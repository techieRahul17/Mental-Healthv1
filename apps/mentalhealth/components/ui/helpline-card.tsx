import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';

interface HelplineCardProps {
  name: string;
  number: string;
  description: string;
  logo: string;
}

export function HelplineCard({ name, number, description, logo }: HelplineCardProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const handleCall = () => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={handleCall}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={[styles.logoContainer, { backgroundColor: colors.background }]}>
          <Text style={styles.logo}>{logo}</Text>
        </View>
        <View style={styles.info}>
          <Text style={[styles.name, Typography.subheading, { color: colors.text }]}>
            {name}
          </Text>
          <Text style={[styles.number, Typography.medium, { color: colors.tint }]}>
            {number}
          </Text>
        </View>
        <View style={styles.callIcon}>
          <Text style={styles.callEmoji}>📞</Text>
        </View>
      </View>
      <Text style={[styles.description, Typography.body, { color: colors.textSecondary }]}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logo: {
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    marginBottom: 2,
  },
  number: {
    fontSize: 14,
  },
  callIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callEmoji: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
