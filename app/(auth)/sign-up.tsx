import CustomButton from "@components/CustomButton";
import Input from "@components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { RootState } from "@store/index";
import { Link } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { z } from "zod";
const schema = z.object({
  email: z.string().email("Invalid email address"),
  userName: z.string().min(10, "Username must be at least 10 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const SignUp = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      userName: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {};
  const { loading } = useSelector((state: RootState) => state.userAuth);
  return (
    <SafeAreaView className="items-center justify-center flex-1 px-4">
      <View className="flex w-full mt-20 space-y-16">
        <View className="mt-auto space-y-2">
          <Text className="text-3xl text-black font-pextrabold">
            ElectroBlack
          </Text>
        </View>

        <View className="mt-1.5">
          {/* <Image
                  source={images.logoSmall}
                  className="h-10 w-9"
                  resizeMode="contain"
                /> */}
        </View>
      </View>
      <View className="items-center flex-1 w-full">
        <Text className="text-4xl font-pextrabold">Register</Text>

        <Input
          iconName="email-outline"
          label="Email"
          name="email"
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          control={control}
        />
        <Input
          iconName="account-outline"
          label="Username"
          name="userName"
          placeholder="Email"
          control={control}
        />
        <Input
          iconName="lock-outline"
          label="Mot de passe"
          name="password"
          placeholder="Password"
          isPassword
          control={control}
          className="mt-2"
        />

        <CustomButton
          handlePress={handleSubmit(onSubmit)}
          title="Login"
          isLoading={loading}
        />
        <View className="flex flex-row justify-center gap-2 pt-5">
          <Text className="text-lg font-pregular">
            Have an account already?
          </Text>
          <Link href="/sign-in" className="text-xl font-pbold">
            Login
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
