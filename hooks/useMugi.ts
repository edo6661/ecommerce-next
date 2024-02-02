import { create } from "zustand";

interface Cart {
  id: string;
  quantity: number;
  price: number;
}

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
  isOnFiltered: boolean;
  isOnFilteredToggle: () => void;
  isOnFilteredStar: boolean;
  isOnFilteredStarToggle: () => void;
  isViewAll: boolean;
  isOnViewAllToggle: () => void;
  falseViewAll: () => void;
  totalPrice: number;
  setTotalPrice: (totalPrice: number) => void;
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
  isOnFiltered: false,
  isOnFilteredToggle: () =>
    set((state) => ({ isOnFiltered: !state.isOnFiltered })),
  isOnFilteredStar: false,
  isOnFilteredStarToggle: () =>
    set((state) => ({ isOnFilteredStar: !state.isOnFilteredStar })),
  isViewAll: false,
  isOnViewAllToggle: () => set((state) => ({ isViewAll: !state.isViewAll })),
  falseViewAll: () => set(() => ({ isViewAll: false })),
  totalPrice: 0,
  setTotalPrice: (totalPrice: number) => set(() => ({ totalPrice })),
}));

export default useMugi;
