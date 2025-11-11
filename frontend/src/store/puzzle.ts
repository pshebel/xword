import { create } from 'zustand';
import { Puzzle } from '@types/api';

interface PuzzleState {
  puzzle: Puzzle;
  setPuzzle: (puzzle: Puzzle) => void;
  reset: () => void;
}
const initialState = {
  puzzle: {
    id: '0',
    size: 0,
    block: [],
    clues: []
  },
}

export const usePuzzleStore = create<PuzzleState>((set) => ({
  ...initialState,
  setPuzzle: (puzzle) => set({ puzzle }),
  reset: () => set(initialState),
}));