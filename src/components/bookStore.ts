// bookStore.js
import { create } from 'zustand'

export const useBookStore = create((set) => ({
    value: 'cat', // Valor predeterminado para la consulta
    updateValue: (newValue) => set({ value: newValue })
}));
