import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "types";

export const setUserToLocalStorage = async (user: User) => {
  await AsyncStorage.setItem("userData", JSON.stringify(user));
};

export const getUserFromLocalStorage = async () => {
  return await AsyncStorage.getItem("userData");
};

export const removeUserFromLocalStorage = async () => {
  await AsyncStorage.removeItem("userData");
};

export const setToken = async (token: string) => {
  await AsyncStorage.setItem("token", JSON.stringify(token));
};
export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};
export const removeToken = async () => {
  await AsyncStorage.removeItem("token");
};
