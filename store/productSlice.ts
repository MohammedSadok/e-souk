import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Order, OrderItemRequest, OrderRequest, Product } from "types";
const URL = `${process.env.EXPO_PUBLIC_API_URL}/products`;
const URL_ORDER = `${process.env.EXPO_PUBLIC_API_URL}/orders`;

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

export const fetchRelatedProducts = createAsyncThunk(
  "fetchRelatedProducts",
  async (data: { token: string; categoryId: number }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(URL + `/category/${data.categoryId}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return response.data as Product[];
    } catch (error) {
      return rejectWithValue("Can't fetch Products");
    }
  }
);

export const createOrder = createAsyncThunk(
  "createOrder",
  async (
    data: { products: Product[]; token: string; userId: number },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    try {
      // Initialize an array to hold orderItemRequests
      const orderItemRequests: OrderItemRequest[] = [];

      // Iterate through each product in the cart
      data.products.forEach((product: Product) => {
        // Assuming each product has at least one color and one size
        const firstColorId = product.colors[0].id;
        const firstSizeId = product.sizes[0].id;

        // Construct the OrderItemRequest object for the current product
        const orderItemRequest: OrderItemRequest = {
          productId: product.id,
          quantity: product.quantity,
          sizeId: firstSizeId,
          colorId: firstColorId,
        };

        // Push the OrderItemRequest object to the array
        orderItemRequests.push(orderItemRequest);
      });

      // Construct the OrderRequest object
      const orderRequest: OrderRequest = {
        userId: data.userId,
        orderItemRequests: orderItemRequests,
        status: "pending",
      };

      const response = await axios.post(URL_ORDER, orderRequest, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return response.data as Order;
    } catch (error) {
      return rejectWithValue("Can't create order");
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "fetchOrders",
  async (token: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(URL_ORDER, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data as Order[];
    } catch (error) {
      return rejectWithValue("Can't fetch orders");
    }
  }
);

interface ProductsState {
  orders: Order[];
  products: Product[];
  relatedProducts: Product[];
  searchProducts: Product[];
  cart: Product[];
  loading: boolean;
  error: null | string;
}

const initialState = {
  orders: [],
  products: [],
  relatedProducts: [],
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
      })

      .addCase(fetchRelatedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProducts = action.payload;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = [];
      })
      .addCase(createOrder.rejected, (state, action) => {
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
