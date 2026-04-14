import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface GameState {
  focus: number;
  orientation: boolean;
  squares: string[];
  success: boolean;
  setFocus: (index: number) => void;
  setOrientation: (newOrientation: boolean) => void;
  setSquares: (squares: string[]) => void;
  setSuccess: (result: boolean) => void;
  reset: () => void;
}

const initialState = {
  focus: 0,
  orientation: true,
  squares: [],
  success: false
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      ...initialState,
      setFocus: (index) => set({ focus: index }),
      setOrientation: (newOrientation) => set({ orientation: newOrientation }),
      setSquares: (squares) => set({ squares }),
      setSuccess: (result) => set({ success: result }),
      reset: () => set(initialState),
    }),
    {
      name: 'game-storage', // The key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);