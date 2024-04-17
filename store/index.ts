import { combineReducers } from "@reduxjs/toolkit";
const rootReducer = combineReducers({});

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import authSlice from "./authSlice";
import orderSlice from "./orderSlice";
import productSlice from "./productSlice";
// ...
const store = configureStore({
  reducer: {
    userAuth: authSlice,
    products: productSlice,
    orderSlice: orderSlice,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppStore = useStore.withTypes<AppStore>();
