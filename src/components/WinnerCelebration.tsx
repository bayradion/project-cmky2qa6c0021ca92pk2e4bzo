import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { theme } from '../constants/theme';
import { Player } from '../types';

interface WinnerCelebrationProps {
  winner: Player | null;
  visible: boolean;
}

const { width, height } = Dimensions.get('window');

export default function WinnerCelebration({ winner, visible }: WinnerCelebrationProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && winner) {
      // Start celebration animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 5,
          useNativeDriver: false,
        }),
      ]).start();

      // Bouncing animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -10,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.5);
      bounceAnim.setValue(0);
    }
  }, [visible, winner, fadeAnim, scaleAnim, bounceAnim]);

  if (!visible || !winner) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.content,
          {
            transform: [
              { scale: scaleAnim },
              { translateY: bounceAnim },
            ],
          },
        ]}
      >
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.winnerText}>
          Player {winner}
        </Text>
        <Text style={styles.congratsText}>
          Wins!
        </Text>
        <View style={styles.confetti}>
          <Text style={styles.confettiEmoji}>✨</Text>
          <Text style={styles.confettiEmoji}>🎊</Text>
          <Text style={styles.confettiEmoji}>🥳</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xxl,
    alignItems: 'center',
    ...theme.shadows.large,
    minWidth: 250,
  },
  emoji: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  winnerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  congratsText: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.success,
    marginBottom: theme.spacing.lg,
  },
  confetti: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  confettiEmoji: {
    fontSize: 24,
  },
});