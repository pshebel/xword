import { create } from 'zustand'

interface GameState {
  focus: number;
  orientation: boolean;
  squares: string[];
  success: boolean;
  setFocus: (index: number) => void;
  setOrientation: () => void;
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

export const useGameStore = create<GameState>((set) => ({
  ...initialState,
  setFocus: (index) => set({ focus: index }),
  setOrientation: () => set((state) => ({ orientation: !state.orientation})), 
  setSquares: (squares) => set({ squares }),
  setSuccess: (result) => set({ success: result}),
  reset: () => set(initialState),
}));
