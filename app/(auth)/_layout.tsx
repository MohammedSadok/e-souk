import { RootState } from "@store/index";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";

// import { Loader } from "../../components";
// import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
  // const { loading, isLogged } = useGlobalContext();

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
