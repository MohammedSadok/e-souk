import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserLogin } from "types";
interface MyKnownError {
  errorMessage: string;
  // ...
}

export const login = createAsyncThunk(
  "auth/login",
  // if you type your function argument here
  async (user: UserLogin, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return {
        user: { ...user, userName: "mohammed sadok", isLoggedIn: true },
        token: "token",
      };
    } catch (error) {
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
  user: { email: "", password: "", isLoggedIn: false, userName: "" },
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