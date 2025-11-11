import { create } from 'zustand'

type Status = {
  text: string;
  timedText: (message: string) => void;
  setText: (message: string) => void;
  reset: () => void;
};

const initialState = {
    text: ''
}

export const useStatusStore = create<Status>((set) => ({
  ...initialState,
  timedText: (message: string) => {
    set({ text: message });
    setTimeout(() => {
      set({ text: '' });
    }, 5000);
  },
  setText: (message: string) => {
    set({text: message})
  },
  reset: () => set(initialState)
}));