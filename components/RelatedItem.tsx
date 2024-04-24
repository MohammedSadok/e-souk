import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Product } from "types";

interface RelatedItemProps {
  data: Product;
}
const RelatedItem = ({ data }: RelatedItemProps) => {
  return (
    <TouchableOpacity
      className="p-2 mr-2 space-y-2 bg-white border border-gray-100 rounded-xl"
      onPress={() => router.replace(`/listing/${data.id}`)}
    >
      <View className="mt-2 rounded-md h-2/3">
        <Image
          resizeMode="contain"
          className="object-cover object-center w-full h-full"
          source={{
            uri: data.images[0].imageUrl,
          }}
        />
      </View>
      <View className="flex flex-col justify-between">
        <Text className="overflow-hidden text-lg font-semibold h-7 w-44">
          {data.name}
        </Text>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-sm text-gray-500 ">{data.category?.name}</Text>
          <Text className="text-lg" style={{ fontFamily: "Poppins-Black" }}>
            $ {data?.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RelatedItem;
