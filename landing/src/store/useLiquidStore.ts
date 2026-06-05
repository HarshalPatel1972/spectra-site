import { create } from 'zustand'

interface LiquidState {
  liquidColor: string | null;
  fillLevel: number; // 0 to 1
  elementLevels: Record<string, { level: number, color: string }>;
  updateElement: (id: string, color: string, level: number, totalElements: number) => void;
}

export const useLiquidStore = create<LiquidState>((set) => ({
  liquidColor: null,
  fillLevel: 0,
  elementLevels: {},
  updateElement: (id, color, level, total) => set((state) => {
    const nextLevels = { ...state.elementLevels };
    
    if (level <= 0.01) {
      delete nextLevels[id];
    } else {
      nextLevels[id] = { level, color };
    }
    
    // Calculate total fill
    let sum = 0;
    let latestColor = state.liquidColor;
    let maxLevel = -1;
    
    Object.values(nextLevels).forEach(el => {
      sum += el.level;
      if (el.level > maxLevel) {
        maxLevel = el.level;
        latestColor = el.color; // color of the most sucked element
      }
    });
    
    return {
      elementLevels: nextLevels,
      fillLevel: Math.min(1, sum / total),
      liquidColor: latestColor
    };
  })
}));
