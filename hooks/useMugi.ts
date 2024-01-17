import { create } from "zustand";

interface StoreState {
  isNav: boolean;
  toggleNav: () => void;
  falseNav: () => void;
  categoryModal: boolean;
  falseCategoryModal: () => void;
  trueCategoryModal: () => void;
  brandModal: boolean;
  falseBrandModal: () => void;
  trueBrandModal: () => void;
  isCategory: boolean;
  isCategoryTrue: () => void;
  isCategoryFalse: () => void;
}

const useMugi = create<StoreState>((set) => ({
  isNav: false,
  toggleNav: () => set((state) => ({ isNav: !state.isNav })),
  falseNav: () => set(() => ({ isNav: false })),
  categoryModal: false,
  falseCategoryModal: () => set(() => ({ categoryModal: false })),
  trueCategoryModal: () => set(() => ({ categoryModal: true })),
  brandModal: false,
  falseBrandModal: () => set(() => ({ brandModal: false })),
  trueBrandModal: () => set(() => ({ brandModal: true })),
  isCategory: false,
  isCategoryFalse: () => set(() => ({ isCategory: false })),
  isCategoryTrue: () => set(() => ({ isCategory: true })),
}));

export default useMugi;
