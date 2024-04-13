import React from "react";
import {
  ActivityIndicator,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: TextStyle;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
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
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: "#2C3E50", // example background color
          borderRadius: 12, // example border radius
          minHeight: 62, // example minimum height
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
        containerStyles ? tailwindToStyle(containerStyles) : null,
        isLoading ? { opacity: 0.5 } : null,
      ]}
      disabled={isLoading}
    >
      <Text
        style={[
          {
            color: "#FFFFFF", // example text color
            fontSize: 18, // example font size
            fontWeight: "600", // example font weight
          },
          textStyles,
        ]}
      >
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#FFFFFF"
          size="small"
          style={{ marginLeft: 8 }} // example margin left
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
