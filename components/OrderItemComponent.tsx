import React from "react";
import { Image, Text, View } from "react-native";
import { OrderItem } from "types";

interface OrderItemProps {
  orderItem: OrderItem;
}

const OrderItemComponent = ({ orderItem }: OrderItemProps) => {
  const { product, quantity, size, color } = orderItem;

  return (
    <View className="flex-row items-center px-2 mb-1 rounded-md bg-slate-100">
      <Image
        source={{ uri: product.images[0].imageUrl }}
        className="w-20 h-20 mr-4 rounded-full"
      />
      <View>
        <Text className="mb-1 text-lg font-bold">{product.name}</Text>
        <Text className="mb-1">Quantity: {quantity}</Text>
        <Text className="mb-1">Size: {size.name}</Text>
        <Text className="mb-1">Color: {color.name}</Text>
      </View>
    </View>
  );
};

export default OrderItemComponent;
