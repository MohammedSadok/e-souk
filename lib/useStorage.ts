import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "types";
// Set the user data in localStorage

export const setUserToLocalStorage = async (user: User) => {
  await AsyncStorage.setItem("userData", JSON.stringify(user));
};

// Remove the user data from localStorage
export const removeUserFromLocalStorage = async () => {
  await AsyncStorage.removeItem("userData");
};
