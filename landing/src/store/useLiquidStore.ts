import { create } from 'zustand'

interface LiquidState {
  liquidColor: string | null;
  fillLevel: number; // 0 to 1
  setLiquid: (color: string, level: number) => void;
  resetLiquid: () => void;
}

export const useLiquidStore = create<LiquidState>((set) => ({
  liquidColor: null,
  fillLevel: 0,
  setLiquid: (color, level) => set({ liquidColor: color, fillLevel: level }),
  resetLiquid: () => set({ liquidColor: null, fillLevel: 0 }),
}));
