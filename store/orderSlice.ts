import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Order, OrderRequest } from "types";

const URL = `${process.env.EXPO_PUBLIC_API_URL}/orders`;

export const createOrder = createAsyncThunk(
  "createOrder",
  async (data: { orderRequest: OrderRequest; token: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(URL, data.orderRequest, {
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
      const response = await axios.get(URL, {
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

export const deleteOrder = createAsyncThunk(
  "deleteOrder",
  async (data: { orderId: number; token: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`${URL}/${data.orderId}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return data.orderId;
    } catch (error) {
      return rejectWithValue("Can't delete order");
    }
  }
);

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: null | string;
}

const initialState = {
  orders: [],
  loading: false,
  error: null,
} as OrderState;

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //delete order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
