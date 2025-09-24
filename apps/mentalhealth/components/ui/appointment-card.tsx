import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './button';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';

interface AppointmentCardProps {
  doctorName: string;
  doctorDesignation: string;
  date: string;
  time: string;
  type: string;
  onReschedule: () => void;
  onCancel: () => void;
}

export function AppointmentCard({
  doctorName,
  doctorDesignation,
  date,
  time,
  type,
  onReschedule,
  onCancel,
}: AppointmentCardProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.border }]}>
          <Text style={[styles.avatarText, Typography.medium, { color: colors.text }]}>
            {doctorName.charAt(0)}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={[styles.doctorName, Typography.subheading, { color: colors.text }]}>
            {doctorName}
          </Text>
          <Text style={[styles.designation, Typography.body, { color: colors.textSecondary }]}>
            {doctorDesignation}
          </Text>
          <Text style={[styles.dateTime, Typography.body, { color: colors.textSecondary }]}>
            {date} • {time}
          </Text>
          <Text style={[styles.type, Typography.body, { color: colors.textSecondary }]}>
            {type}
          </Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <Button
          title="Reschedule"
          onPress={onReschedule}
          variant="secondary"
          style={styles.actionButton}
          textStyle={styles.actionButtonText}
        />
        <Button
          title="Cancel"
          onPress={onCancel}
          variant="secondary"
          style={styles.actionButton}
          textStyle={styles.actionButtonText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    marginBottom: 4,
  },
  designation: {
    fontSize: 14,
    marginBottom: 4,
  },
  dateTime: {
    fontSize: 14,
    marginBottom: 2,
  },
  type: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 10,
    minHeight: 40,
  },
  actionButtonText: {
    fontSize: 14,
  },
});
