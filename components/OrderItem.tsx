import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Order } from "types";
interface OrderProps {
  order: Order;
}
const OrderComponent = ({ order }: OrderProps) => {
  return (
    <View style={styles.orderItem}>
      <Text style={styles.orderId}>Order ID: {order.id}</Text>
      <Text style={styles.orderStatus}>Status: {order.status}</Text>
      <FlatList
        data={order.orderItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderItemContainer}>
            <Text>{item.product.name}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Size: {item.size.name}</Text>
            <Text>Color: {item.color.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000000",
  },
  orderId: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  orderStatus: {
    fontStyle: "italic",
    marginBottom: 5,
  },
  orderItemContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
});

export default OrderComponent;
