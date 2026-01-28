import { create } from 'zustand';
import { GameStore, Player, CellValue, GameState } from '../types';

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

const initialBoard: CellValue[] = Array(9).fill(null);

const checkWinner = (board: CellValue[]): { winner: Player | null; winningCells: number[] } => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, winningCells: combination };
    }
  }
  return { winner: null, winningCells: [] };
};

const checkDraw = (board: CellValue[]): boolean => {
  return board.every(cell => cell !== null);
};

export const useGameStore = create<GameStore>((set, get) => ({
  board: [...initialBoard],
  currentPlayer: 'X',
  gameState: 'playing',
  winner: null,
  winningCells: [],
  score: {
    X: 0,
    O: 0,
    draws: 0,
  },

  makeMove: (index: number) => {
    const state = get();
    
    if (state.board[index] !== null || state.gameState !== 'playing') {
      return;
    }

    const newBoard = [...state.board];
    newBoard[index] = state.currentPlayer;

    const { winner, winningCells } = checkWinner(newBoard);
    
    let newGameState: GameState = 'playing';
    let newScore = { ...state.score };

    if (winner) {
      newGameState = 'won';
      newScore[winner] += 1;
    } else if (checkDraw(newBoard)) {
      newGameState = 'draw';
      newScore.draws += 1;
    }

    set({
      board: newBoard,
      currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
      gameState: newGameState,
      winner,
      winningCells,
      score: newScore,
    });
  },

  resetGame: () => {
    set({
      board: [...initialBoard],
      currentPlayer: 'X',
      gameState: 'playing',
      winner: null,
      winningCells: [],
    });
  },

  resetScore: () => {
    set({
      score: {
        X: 0,
        O: 0,
        draws: 0,
      },
    });
  },
}));