import { AntDesign } from "@expo/vector-icons";
import React, { FC } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
interface ModalPopUpProps {
  isVisible: boolean;
  setIsVisible: () => void;
  children: React.ReactNode;
  title: string;
}

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const ModalPopUp: FC<ModalPopUpProps> = ({
  isVisible,
  setIsVisible,
  children,
  title,
}) => {
  return isVisible ? (
    <View
      className="absolute z-10 flex items-center justify-center w-full h-full bg-primary/60"
      style={{
        height: screenHeight,
      }}
    >
      <View className="p-3 bg-white rounded-lg">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-pbold">{title}</Text>

          <TouchableOpacity onPress={setIsVisible}>
            <AntDesign name="close" size={32} color="gray" />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </View>
  ) : null;
};

export default ModalPopUp;
