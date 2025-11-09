import { create } from 'zustand';
import { Puzzle } from '@types/api';

interface PuzzleState {
  puzzle: Puzzle;
  setPuzzle: (puzzle: Puzzle) => void;
}

export const usePuzzleStore = create<PuzzleState>((set) => ({
  puzzle: {
    id: '0',
    size: 0,
    block: [],
    clues: []
  },
  setPuzzle: (puzzle) => set({ puzzle })
}));
// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Puzzle } from '@types/api';

// interface PuzzleState {
//   puzzle: Puzzle;
//   setPuzzle: (puzzle: Puzzle) => void;
// }

// export const usePuzzleStore = create<PuzzleState>()(
//   persist(
//     (set) => ({
//       puzzle: {
//         id: 0,
//         size: 0,
//         block: [],
//         clues: []
//       },
//       setPuzzle: (puzzle) => set({ puzzle })
//     }),
//     {
//       name: 'puzzle-storage',
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );