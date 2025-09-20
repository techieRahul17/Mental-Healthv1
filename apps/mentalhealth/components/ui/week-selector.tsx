import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import moment from 'moment';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';

interface WeekSelectorProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  markedDates: { [key: string]: any };
}

export function WeekSelector({ selectedDate, onDateSelect, markedDates }: WeekSelectorProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  // Get current week dates
  const getWeekDates = () => {
    const startOfWeek = moment(selectedDate).startOf('week');
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(startOfWeek.clone().add(i, 'days'));
    }
    return dates;
  };

  const weekDates = getWeekDates();

  return (
    <View style={styles.container}>
      <Text style={[styles.monthYear, Typography.subheading, { color: colors.text }]}>
        {moment(selectedDate).format('MMMM YYYY')}
      </Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weekContainer}
      >
        {weekDates.map((date) => {
          const dateString = date.format('YYYY-MM-DD');
          const isSelected = dateString === selectedDate;
          const isMarked = markedDates[dateString]?.marked;
          
          return (
            <TouchableOpacity
              key={dateString}
              style={[
                styles.dateButton,
                isSelected && { backgroundColor: colors.tint }
              ]}
              onPress={() => onDateSelect(dateString)}
            >
              <Text style={[
                styles.dayText,
                Typography.body,
                { color: isSelected ? colors.card : colors.textSecondary }
              ]}>
                {date.format('ddd')}
              </Text>
              <Text style={[
                styles.dateText,
                Typography.medium,
                { color: isSelected ? colors.card : colors.text }
              ]}>
                {date.format('D')}
              </Text>
              {isMarked && !isSelected && (
                <View style={[styles.dot, { backgroundColor: colors.tint }]} />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  monthYear: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  weekContainer: {
    paddingHorizontal: 8,
  },
  dateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 20,
    minWidth: 50,
    position: 'relative',
  },
  dayText: {
    fontSize: 12,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    bottom: 4,
  },
});
