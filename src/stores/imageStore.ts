import { create } from "zustand";
import { Image, Tdata } from "../lib/types";

type Store = {
  score: number;
  highScore: number;
  clicked: boolean;
  images: Image[];
  display: Image[];
  playing: boolean;
  isAnimating: boolean;
  getUniqueRandomIndices: (count: number, max: number) => number[];
  handleClickHigher: () => void;
  handleClickLower: () => void;
  resetGame: () => void;
  fetchImages: () => void;
};

export const useImageStore = create<Store>((set, get) => ({
  score: 0,
  highScore: 0,
  clicked: false,
  images: [],
  display: [],
  playing: true,
  isAnimating: false,
  getUniqueRandomIndices: (count: number, max: number) => {
    const indices = new Set<number>();
    while (indices.size < count) {
      indices.add(Math.floor(Math.random() * max));
    }
    return Array.from(indices);
  },
  handleClickHigher: () => {
    set(() => ({ clicked: true }));

    const [first, second] = get().display;
    if (second.value >= first.value) {
      setTimeout(() => {
        set(() => ({ score: get().score + 1 }));
        set(() => ({ clicked: false }));
        const randomIndices = get().getUniqueRandomIndices(
          1,
          get().images.length
        );
        const randomImages = randomIndices.map((index) => get().images[index]);
        set(() => ({ display: [...get().display.slice(1), ...randomImages] }));
      }, 2800);
    } else {
      setTimeout(() => {
        set(() => ({ clicked: false }));
        set(() => ({ playing: false }));
      }, 2000);
    }
  },
  handleClickLower: () => {
    set(() => ({ clicked: true }));
    const [first, second] = get().display;
    if (second.value <= first.value) {
      setTimeout(() => {
        set(() => ({ score: get().score + 1 }));
        set(() => ({ clicked: false }));
        const randomIndices = get().getUniqueRandomIndices(
          1,
          get().images.length
        );
        const randomImages = randomIndices.map((index) => get().images[index]);
        set(() => ({ display: [...get().display.slice(1), ...randomImages] }));
      }, 2800);
    } else {
      setTimeout(() => {
        set(() => ({ clicked: false }));
        set(() => ({ playing: false }));
      }, 2000);
    }
  },

  resetGame: () => {
    set(() => ({ playing: true }));
    set(() => ({ score: 0 }));
    const randomIndices = get().getUniqueRandomIndices(3, get().images.length);
    const randomImages = randomIndices.map((index) => get().images[index]);
    set(() => ({ display: randomImages }));
  },
  fetchImages: async () => {
    try {
      const response = await fetch(
        "https://picsum.photos/v2/list?page=1&limit=10"
      );
      if (!response.ok) {
        throw new Error("Server Error");
      }
      const data = await response.json();
      const newData: Image[] = data.map((image: Tdata) => {
        return {
          ...image,
          value: Math.floor(Math.random() * 1000) * 10000,
        };
      });
      set(() => ({ images: newData }));

      const randomIndices = get().getUniqueRandomIndices(3, newData.length);

      const randomImages = randomIndices.map((index) => newData[index]);

      set(() => ({ display: randomImages }));
    } catch (error) {
      console.log(error);
    }
  },
}));
