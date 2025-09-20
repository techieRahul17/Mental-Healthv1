import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';

interface AnimatedCircleProps {
  isAnimating: boolean;
  inhaleTime: number; // in milliseconds
  exhaleTime: number; // in milliseconds
}

export function AnimatedCircle({ isAnimating, inhaleTime, exhaleTime }: AnimatedCircleProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    if (isAnimating) {
      startBreathingAnimation();
    } else {
      stopBreathingAnimation();
    }
  }, [isAnimating, inhaleTime, exhaleTime]);

  const startBreathingAnimation = () => {
    const breathingCycle = () => {
      // Inhale - expand circle
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: inhaleTime,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: inhaleTime,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Exhale - contract circle
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: exhaleTime,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.7,
            duration: exhaleTime,
            useNativeDriver: true,
          }),
        ]).start(() => {
          if (isAnimating) {
            breathingCycle(); // Continue the cycle
          }
        });
      });
    };

    breathingCycle();
  };

  const stopBreathingAnimation = () => {
    scaleAnim.stopAnimation();
    opacityAnim.stopAnimation();
    
    // Reset to initial state
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.7,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: colors.tint,
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});
