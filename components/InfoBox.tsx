import { cn } from "lib/utils";
import React from "react";
import { Text, View } from "react-native";

interface InfoBoxProps {
  title: string;
  subtitle: string;
  containerStyles?: String;
  titleStyles?: String;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
}) => {
  return (
    <View className={cn(containerStyles)}>
      <Text className={cn("text-white text-center font-bold", titleStyles)}>
        {title}
      </Text>
      <Text style={{ fontSize: 14, color: "#DCDCDC", textAlign: "center" }}>
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
