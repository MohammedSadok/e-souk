import { router } from "expo-router";
import { Image, Text, View } from "react-native";

import { images } from "../constants";
import CustomButton from "./CustomButton";
interface EmptyStateProps {
  title: string;
  subtitle: string;
}
const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className="flex items-center justify-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-sm text-gray-500 font-pmedium">{title}</Text>
      <Text className="mt-2 text-xl text-center font-psemibold">
        {subtitle}
      </Text>

      <CustomButton
        title="Back to Explore"
        handlePress={() => router.push("/(tabs)")}
      />
    </View>
  );
};

export default EmptyState;
