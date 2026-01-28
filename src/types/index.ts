export type Player = 'X' | 'O';

export type CellValue = Player | null;

export type GameBoard = CellValue[];

export type GameState = 'playing' | 'won' | 'draw';

export interface GameStore {
  board: GameBoard;
  currentPlayer: Player;
  gameState: GameState;
  winner: Player | null;
  winningCells: number[];
  score: {
    X: number;
    O: number;
    draws: number;
  };
  makeMove: (index: number) => void;
  resetGame: () => void;
  resetScore: () => void;
}