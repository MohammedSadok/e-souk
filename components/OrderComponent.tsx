import React from "react";
import { FlatList, Text, View } from "react-native";
import { Order } from "types";
import OrderItemComponent from "./OrderItemComponent";
interface OrderProps {
  order: Order;
}
const OrderComponent = ({ order }: OrderProps) => {
  return (
    <View className="p-2 m-2 mt-0 border border-gray-500 rounded-md">
      <Text className="font-pbold">Status: {order.status}</Text>
      <FlatList
        scrollEnabled={false}
        data={order.orderItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderItemComponent orderItem={item} />}
      />
    </View>
  );
};

export default OrderComponent;
