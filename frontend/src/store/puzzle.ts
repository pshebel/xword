import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Puzzle } from '@types/api';

interface PuzzleState {
  puzzle: Puzzle;
  setPuzzle: (puzzle: Puzzle) => void;
  reset: () => void;
}

const initialState = {
  puzzle: {
    id: '0',
    date: '',
    cert: '',
    size: 0,
    block: [],
    words: []
  },
};

export const usePuzzleStore = create<PuzzleState>()(
  persist(
    (set) => ({
      ...initialState,
      setPuzzle: (puzzle) => set({ puzzle }),
      reset: () => set(initialState),
    }),
    {
      name: 'puzzle-storage', // unique name for the item in localStorage
      storage: createJSONStorage(() => localStorage), // optional: defaults to localStorage
    }
  )
);