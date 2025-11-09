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
}

export const useGameStore = create<GameState>((set) => ({
  focus: 0,
  orientation: true,
  squares: [],
  success: false,
  setFocus: (index) => set({ focus: index }),
  setOrientation: () => set((state) => ({ orientation: !state.orientation})), 
  setSquares: (squares) => set({ squares }),
  setSuccess: (result) => set({ success: result}),
}));
