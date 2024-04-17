import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User, UserLogin } from "types";

const URL = `${process.env.EXPO_PUBLIC_API_URL}/auth`;
export const login = createAsyncThunk(
  "auth/login",
  async (user: UserLogin, thunkAPI) => {
    console.log("=>  user:", user);
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(URL + "/login", user);
      return {
        user: { ...user, userName: "mohammed sadok", isLoggedIn: true },
        token: response.data.access_token,
      };
    } catch (error) {
      console.log("=>  error:", error);
      return rejectWithValue("L'adresse e-mail ou mot de passe est invalide");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    // Remove the token from localStorage or the storage solution
    await AsyncStorage.removeItem("userData");
    await AsyncStorage.removeItem("token");
    return null;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error);
  }
});
interface AuthState {
  user: User | null;
  token: null | string;
  loading: boolean;
  error: null | string;
}

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // fill in primary logic here
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default authSlice.reducer;
