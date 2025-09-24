import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppointmentCard } from '@/components/ui/appointment-card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';

interface Appointment {
  id: string;
  doctorName: string;
  doctorDesignation: string;
  date: string;
  time: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Meera Sharma',
    doctorDesignation: 'Clinical Psychologist Ph.D',
    date: 'Sep 20, 2025',
    time: '5:00 PM',
    type: 'Video Session',
    status: 'upcoming',
  },
];

export default function AppointmentsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const [activeTab, setActiveTab] = useState<'book' | 'calendar'>('book');
  const [statusFilter, setStatusFilter] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const filteredAppointments = MOCK_APPOINTMENTS.filter(
    appointment => appointment.status === statusFilter
  );

  const handleReschedule = (appointmentId: string) => {
    console.log('Reschedule appointment:', appointmentId);
  };

  const handleCancel = (appointmentId: string) => {
    console.log('Cancel appointment:', appointmentId);
  };

  const TabButton = ({ title, isActive, onPress }: { title: string; isActive: boolean; onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} style={styles.tabButton}>
      <Text style={[
        styles.tabButtonText,
        Typography.medium,
        { 
          color: colors.text,
          fontWeight: isActive ? '600' : '400',
          textDecorationLine: isActive ? 'underline' : 'none'
        }
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const FilterButton = ({ title, isActive, onPress }: { title: string; isActive: boolean; onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} style={styles.filterButton}>
      <Text style={[
        styles.filterButtonText,
        Typography.body,
        { 
          color: isActive ? colors.tint : colors.textSecondary,
          fontWeight: isActive ? '600' : '400'
        }
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

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
        {/* Simple Text Tabs*/}
        <View style={styles.tabContainer}>
          <TabButton
            title="Book Appointment"
            isActive={activeTab === 'book'}
            onPress={() => setActiveTab('book')}
          />
          <TabButton
            title="View Calendar"
            isActive={activeTab === 'calendar'}
            onPress={() => setActiveTab('calendar')}
          />
        </View>

        {/* Simple Text Filters*/}
        <View style={styles.filterContainer}>
          <FilterButton
            title="Upcoming"
            isActive={statusFilter === 'upcoming'}
            onPress={() => setStatusFilter('upcoming')}
          />
          <Text style={[styles.separator, { color: colors.textSecondary }]}>|</Text>
          <FilterButton
            title="Completed"
            isActive={statusFilter === 'completed'}
            onPress={() => setStatusFilter('completed')}
          />
          <Text style={[styles.separator, { color: colors.textSecondary }]}>|</Text>
          <FilterButton
            title="Cancelled"
            isActive={statusFilter === 'cancelled'}
            onPress={() => setStatusFilter('cancelled')}
          />
        </View>

        {/* Appointments Section */}
        <View style={styles.appointmentsHeader}>
          <Text style={[styles.sectionTitle, Typography.subheading, { color: colors.text }]}>
            Your Appointments
          </Text>
        </View>

        <ScrollView style={styles.appointmentsList} showsVerticalScrollIndicator={false}>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                doctorName={appointment.doctorName}
                doctorDesignation={appointment.doctorDesignation}
                date={appointment.date}
                time={appointment.time}
                type={appointment.type}
                onReschedule={() => handleReschedule(appointment.id)}
                onCancel={() => handleCancel(appointment.id)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, Typography.body, { color: colors.textSecondary }]}>
                No {statusFilter} appointments
              </Text>
            </View>
          )}
        </ScrollView>
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
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    justifyContent: 'flex-start',
  },
  tabButton: {
    marginRight: 32,
  },
  tabButtonText: {
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  filterButton: {
    marginRight: 16,
  },
  filterButtonText: {
    fontSize: 14,
  },
  separator: {
    fontSize: 14,
    marginRight: 16,
  },
  appointmentsHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
  },
  appointmentsList: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
  },
});
