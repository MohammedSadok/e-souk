import { RootState } from "@store/index";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { user, token, loading } = useSelector(
    (state: RootState) => state.userAuth
  );
  console.log("=>  AuthLayout  token:", token);
  console.log("=>  AuthLayout  loading:", loading);
  // if (user) return <Redirect href="/(tabs)" />;
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
