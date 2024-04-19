import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getToken,
  getUserFromLocalStorage,
  removeToken,
  removeUserFromLocalStorage,
  setToken,
  setUserToLocalStorage,
} from "lib/useStorage";
import { User, UserLogin, UserRegister } from "types";

const URL = `${process.env.EXPO_PUBLIC_API_URL}/auth`;
export const login = createAsyncThunk(
  "auth/login",
  async (user: UserLogin, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(URL + "/login", user);

      const userLoggedIn: User = {
        email: response.data.email,
        id: response.data.id,
        userName: response.data.userName,
      };
      await setToken(response.data.access_token);
      await setUserToLocalStorage(userLoggedIn);
      return {
        user: userLoggedIn,
        token: response.data.access_token,
      };
    } catch (error) {
      return rejectWithValue("L'adresse e-mail ou mot de passe est invalide");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (user: UserRegister, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.post(URL + "/register", user);
    } catch (error) {
      console.log("=>  error:", error);
      return rejectWithValue("email already in use !");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    await removeToken();
    await removeUserFromLocalStorage();
    return null;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error);
  }
});

export const checkUserIfExist = createAsyncThunk(
  "auth/checkUserIfExist",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const user = await getUserFromLocalStorage();
      const token = await getToken();
      return user && token
        ? { user: JSON.parse(user), token: JSON.parse(token) }
        : { user: null, token: null };
    } catch (error) {
      return rejectWithValue("You must be logged in !");
    }
  }
);
interface AuthState {
  user: User | null;
  token: null | string;
  loading: boolean;
  error: null | string;
  message: null | string;
}

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  message: null,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    cancelError: (state) => {
      state.error = null;
    },
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
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "use has been successfully registered";
      })
      .addCase(register.rejected, (state, action) => {
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
      })

      .addCase(checkUserIfExist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserIfExist.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(checkUserIfExist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { cancelError } = authSlice.actions;
export default authSlice.reducer;
