import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { theme } from '../constants/theme';
import { CellValue } from '../types';

interface GameCellProps {
  value: CellValue;
  index: number;
  onPress: (index: number) => void;
  isWinning: boolean;
}

export default function GameCell({ value, index, onPress, isWinning }: GameCellProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (value) {
      // Animation when a move is made
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [value, scaleAnim]);

  useEffect(() => {
    if (isWinning) {
      // Pulsing glow animation for winning cells
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      glowAnim.setValue(0);
    }
  }, [isWinning, glowAnim]);

  const handlePress = () => {
    onPress(index);
  };

  const backgroundColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.surface, theme.colors.winnerGlow],
  });

  return (
    <View style={styles.cellWrapper}>
      <Animated.View
        style={[
          styles.cell,
          { backgroundColor },
        ]}
      >
        <Pressable
          style={styles.pressable}
          onPress={handlePress}
          disabled={value !== null}
        >
          <Animated.Text
            style={[
              styles.text,
              {
                color: value === 'X' ? theme.colors.playerX : theme.colors.playerO,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            {value || ''}
          </Animated.Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  cellWrapper: {
    width: '31.33%',
    aspectRatio: 1,
  },
  cell: {
    flex: 1,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  pressable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});