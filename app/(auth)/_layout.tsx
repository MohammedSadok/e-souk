import { RootState, useAppDispatch } from "@store/index";
import { fetchProducts } from "@store/productSlice";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { user } = useSelector((state: RootState) => state.userAuth);
  if (user) return <Redirect href="/(tabs)" />;
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
