import { create } from 'zustand'

interface LiquidState {
  liquidColor: string | null;
  fillLevel: number; // 0 to 1
  setGlobalBlackHoleState: (fillLevel: number, dominantColor: string) => void;
}

export const useLiquidStore = create<LiquidState>((set) => ({
  liquidColor: null,
  fillLevel: 0,
  setGlobalBlackHoleState: (level, color) => set({ 
    fillLevel: level, 
    liquidColor: color 
  })
}));
