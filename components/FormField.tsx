import React, { useState } from "react";
import {
  Image,
  KeyboardTypeOptions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { icons } from "../constants";
interface FormFieldProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: KeyboardTypeOptions;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const tailwindToStyle = (classes: string): ViewStyle => {
    const style: ViewStyle = {};

    const stylePairs = classes.split(" ");
    stylePairs.forEach((pair) => {
      const [key, value] = pair.split("-");
      if (key && value) {
        switch (key) {
          case "mt":
            style.marginTop = parseInt(value);
            break;
          // Add cases for other tailwindcss classes as needed
        }
      }
    });

    return style;
  };

  return (
    <View style={[tailwindToStyle(otherStyles || ""), { marginBottom: 16 }]}>
      <Text style={{ fontSize: 16, color: "#FFFFFF", fontWeight: "500" }}>
        {title}
      </Text>

      <View
        style={{
          width: "100%",
          height: 48,
          paddingHorizontal: 16,
          backgroundColor: "#1E1E1E",
          borderRadius: 12,
          borderWidth: 2,
          borderColor: "#3E3E3E",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{ flex: 1, color: "#FFFFFF", fontSize: 16 }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
