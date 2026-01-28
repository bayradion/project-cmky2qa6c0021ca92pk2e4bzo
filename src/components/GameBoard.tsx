import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import GameCell from './GameCell';
import { useGameStore } from '../store/gameStore';

export default function GameBoard() {
  const { board, makeMove, winningCells } = useGameStore();

  return (
    <View style={styles.container}>
      {board.map((cell, index) => (
        <GameCell
          key={index}
          value={cell}
          index={index}
          onPress={makeMove}
          isWinning={winningCells.includes(index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: theme.colors.text,
    borderRadius: theme.borderRadius.lg,
    padding: 4,
    gap: 4,
    ...theme.shadows.large,
  },
});