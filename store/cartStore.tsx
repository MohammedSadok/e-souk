import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
export interface CartState {
  products: Array<Product & { quantity: number }>;
  addProduct: (product: Product) => void;
  reduceProduct: (product: Product) => void;
  incrementQuantity: (product: Product) => void;
  decrementQuantity: (product: Product) => void;
  clearCart: () => void;
  total: number;
}

const useCartStore = create(
  persist<CartState>(
    (set) => ({
      products: [],
      total: 0,
      addProduct: (product: Product) =>
        set((state) => {
          const hasProductIndex = state.products.findIndex(
            (p) => p.id === product.id
          );

          if (hasProductIndex !== -1) {
            state.products[hasProductIndex].quantity += 1;
          } else {
            state.products.push({ ...product, quantity: 1 });
          }

          state.total += parseInt(product.price);

          return { products: [...state.products], total: state.total };
        }),
      incrementQuantity: (product: Product) =>
        set((state) => {
          const productIndex = state.products.findIndex(
            (p) => p.id === product.id
          );

          if (productIndex !== -1) {
            state.products[productIndex].quantity += 1;
            state.total += parseInt(product.price);

            return { products: [...state.products], total: state.total };
          }

          return state;
        }),
      decrementQuantity: (product: Product) =>
        set((state) => {
          const productIndex = state.products.findIndex(
            (p) => p.id === product.id
          );

          if (
            productIndex !== -1 &&
            state.products[productIndex].quantity > 1
          ) {
            state.products[productIndex].quantity -= 1;
            state.total -= parseInt(product.price) * product.quantity;

            return { products: [...state.products], total: state.total };
          }

          return state;
        }),
      reduceProduct: (product: Product) =>
        set((state) => {
          const removedProduct = state.products.find(
            (p) => p.id === product.id
          );

          if (removedProduct) {
            state.total -= parseInt(product.price) * removedProduct.quantity;
            state.products = state.products.filter((p) => p.id !== product.id);

            return { products: [...state.products], total: state.total };
          }

          return state;
        }),
      clearCart: () => set({ products: [], total: 0 }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useCartStore;
