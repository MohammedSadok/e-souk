import { Ionicons } from "@expo/vector-icons";
import { cn } from "lib/utils";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
interface InputProps extends TextInputProps {
  isPassword?: boolean;
  name: string;
  control: Control<any>;
  iconName: string;
  label: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  name,
  className,
  isPassword,
  control,
  iconName,
  label,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View className={cn("w-full", className)}>
          <Text>{label}</Text>
          <View className="relative">
            <View
              className={cn(
                "absolute left-3",
                isPassword ? "top-5" : "top-1/4"
              )}
            >
              <Icon name={iconName} size={20} />
            </View>
            <TextInput
              secureTextEntry={isPassword && !showPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="p-2 border border-gray-300 rounded-md pl-9"
              {...rest}
            />
            {isPassword && (
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/3"
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            )}
          </View>
          {error && (
            <Text className="text-sm text-red-500 ">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
};

export default Input;
