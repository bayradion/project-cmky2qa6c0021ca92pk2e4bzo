import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

interface ScoreBoardProps {
  score: {
    X: number;
    O: number;
    draws: number;
  };
}

export default function ScoreBoard({ score }: ScoreBoardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.scoreItem}>
        <Text style={[styles.player, { color: theme.colors.playerX }]}>X</Text>
        <Text style={styles.scoreValue}>{score.X}</Text>
      </View>
      
      <View style={styles.scoreItem}>
        <Text style={styles.label}>Draws</Text>
        <Text style={styles.scoreValue}>{score.draws}</Text>
      </View>
      
      <View style={styles.scoreItem}>
        <Text style={[styles.player, { color: theme.colors.playerO }]}>O</Text>
        <Text style={styles.scoreValue}>{score.O}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.lg,
    ...theme.shadows.small,
  },
  scoreItem: {
    alignItems: 'center',
  },
  player: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
});