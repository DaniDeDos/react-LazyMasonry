import { create } from "zustand";

interface BookStoreState {
  value: string;
  updateValue: (newValue: string) => void;
}

export const useBookStore = create<BookStoreState>((set) => ({
  value: "cat",
  updateValue: (newValue: string) => set({ value: newValue }),
}));
