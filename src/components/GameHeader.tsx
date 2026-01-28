import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import { Player } from '../types';

interface GameHeaderProps {
  currentPlayer: Player;
  gameState: string;
  winner: Player | null;
}

export default function GameHeader({ currentPlayer, gameState, winner }: GameHeaderProps) {
  const getStatusText = (): string => {
    if (gameState === 'won' && winner) {
      return `Player ${winner} Wins! 🎉`;
    }
    if (gameState === 'draw') {
      return "It's a Draw! 🤝";
    }
    return `Player ${currentPlayer}'s Turn`;
  };

  const getStatusColor = (): string => {
    if (gameState === 'won') {
      return theme.colors.success;
    }
    if (gameState === 'draw') {
      return theme.colors.warning;
    }
    return currentPlayer === 'X' ? theme.colors.playerX : theme.colors.playerO;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic-Tac-Toe</Text>
      <Text style={[styles.status, { color: getStatusColor() }]}>
        {getStatusText()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  status: {
    fontSize: 20,
    fontWeight: '600',
  },
});