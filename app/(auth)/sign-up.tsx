import Input from "@components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
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

  return (
    <View className="items-center justify-center flex-1 px-4">
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

      <TouchableOpacity
        className="flex flex-row items-center justify-center w-full p-3 mt-4 bg-black rounded-lg"
        onPress={handleSubmit(onSubmit)}
      >
        <View className="flex flex-row items-center gap-2">
          <Text
            className="text-xl text-white"
            style={{ fontFamily: "Poppins-Black" }}
          >
            Login
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
