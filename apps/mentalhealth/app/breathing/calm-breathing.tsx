import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { AnimatedCircle } from '@/components/ui/animated-circle';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';

export default function CalmBreathingScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [timeRemaining, setTimeRemaining] = useState(4);

  const INHALE_TIME = 4000; // 4 seconds
  const EXHALE_TIME = 6000; // 6 seconds

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setCurrentPhase((phase) => {
              const newPhase = phase === 'inhale' ? 'exhale' : 'inhale';
              return newPhase;
            });
            return currentPhase === 'inhale' ? 6 : 4;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, currentPhase]);

  const handleStart = () => {
    setIsActive(true);
    setCurrentPhase('inhale');
    setTimeRemaining(4);
  };

  const handleStop = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setTimeRemaining(4);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={[styles.backText, Typography.medium, { color: colors.text }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <ThemeToggle />
      </View>
      
      <View style={styles.content}>
        <View style={styles.titleSection}>
          <Text style={[styles.title, Typography.heading, { color: colors.text }]}>
            Calm Breathing
          </Text>
        </View>

        {/* Breathing Visualizer */}
        <View style={styles.visualizerContainer}>
          <AnimatedCircle
            isAnimating={isActive}
            inhaleTime={INHALE_TIME}
            exhaleTime={EXHALE_TIME}
          />
          
          {/* Phase Indicator */}
          <View style={styles.phaseIndicator}>
            <Text style={[styles.phaseText, Typography.heading, { color: colors.text }]}>
              {currentPhase === 'inhale' ? 'Inhale' : 'Exhale'}
            </Text>
            <Text style={[styles.timerText, Typography.subheading, { color: colors.textSecondary }]}>
              {timeRemaining}s
            </Text>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsSection}>
          <Text style={[styles.instructionTitle, Typography.subheading, { color: colors.text }]}>
            Inhale - 4sec, Exhale - 6sec
          </Text>
          <Text style={[styles.instructionText, Typography.body, { color: colors.textSecondary }]}>
            Breathe in slowly through your nose for 4 seconds,{'\n'}then exhale gently through your mouth for 6 seconds.{'\n'}Focus on the rhythm and let your body relax.
          </Text>
        </View>

        {/* Controls */}
        <View style={styles.controlsSection}>
          {!isActive ? (
            <Button
              title="Start"
              onPress={handleStart}
              variant="primary"
              style={styles.controlButton}
            />
          ) : (
            <Button
              title="Stop"
              onPress={handleStop}
              variant="secondary"
              style={styles.controlButton}
            />
          )}
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
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleSection: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
  },
  visualizerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  phaseIndicator: {
    position: 'absolute',
    alignItems: 'center',
  },
  phaseText: {
    fontSize: 28,
    marginBottom: 8,
  },
  timerText: {
    fontSize: 20,
  },
  instructionsSection: {
    marginBottom: 40,
    alignItems: 'center',
  },
  instructionTitle: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  controlsSection: {
    marginBottom: 40,
  },
  controlButton: {
    marginHorizontal: 0,
  },
});
