import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../constants/theme';
import { useGameStore } from '../store/gameStore';
import GameHeader from '../components/GameHeader';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import Button from '../components/Button';
import WinnerCelebration from '../components/WinnerCelebration';

export default function GameScreen() {
  const {
    currentPlayer,
    gameState,
    winner,
    score,
    resetGame,
    resetScore,
  } = useGameStore();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[theme.colors.background, '#E2E8F0']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <GameHeader
            currentPlayer={currentPlayer}
            gameState={gameState}
            winner={winner}
          />
          
          <GameBoard />
          
          <ScoreBoard score={score} />
          
          <View style={styles.buttonContainer}>
            <Button
              title="New Game"
              onPress={resetGame}
              size="large"
              style={styles.button}
            />
            
            <Button
              title="Reset Score"
              onPress={resetScore}
              variant="outline"
              size="large"
              style={styles.button}
            />
          </View>
        </View>
        
        <WinnerCelebration
          winner={winner}
          visible={gameState === 'won'}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  button: {
    flex: 1,
  },
});