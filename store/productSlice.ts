import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "types";
const URL = `${process.env.EXPO_PUBLIC_API_URL}/products`;

export const fetchProducts = createAsyncThunk(
  "fetchesProducts",
  async (token: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data as Product[];
    } catch (error) {
      return rejectWithValue("Can't fetch Products");
    }
  }
);

interface ProductsState {
  products: Product[];
  searchProducts: Product[];
  cart: Product[];
  loading: boolean;
  error: null | string;
}

const initialState = {
  products: [],
  cart: [],
  searchProducts: [],
  loading: false,
  error: null,
} as ProductsState;

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const product = action.payload;
      state.cart.push({ ...product, quantity: 1 });
    },
    removeProductFromCart(state, action) {
      const productId = action.payload;
      state.cart = state.cart.filter((product) => product.id !== productId);
    },
    incrementQuantity(state, action) {
      const productId = action.payload;
      const product = state.cart.find((product) => product.id === productId);
      if (product) {
        product.quantity++;
      }
    },
    decrementQuantity(state, action) {
      const productId = action.payload;
      const product = state.cart.find((product) => product.id === productId);
      if (product && product.quantity > 1) {
        product.quantity--;
      }
    },
    searchProducts(state, action) {
      const query = action.payload.toLowerCase();
      state.searchProducts = state.products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
    },
    clearCart(state) {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.searchProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  searchProducts,
} = productsSlice.actions;
export default productsSlice.reducer;
