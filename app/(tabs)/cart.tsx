import CartItem from "@components/CartItem";
import { RootState } from "@store/index";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

type Props = {};

const Page = (props: Props) => {
  const { cart } = useSelector((state: RootState) => state.products);
  return (
    <View className="flex justify-between flex-1 ">
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.name}
          className="mt-5 space-y-2 "
          renderItem={({ item }) => <CartItem key={item.id} data={item} />}
        ></FlatList>
      ) : (
        <View className="items-center justify-center flex-1">
          <Text
            className="text-xl text-gray-600"
            style={{ fontFamily: "Poppins-Black" }}
          >
            No items added to cart.
          </Text>
        </View>
      )}

      <View className="px-4 py-2 bg-slate-50">
        <View className="flex flex-row justify-between text-base font-medium text-gray-900">
          <Text className="text-lg">Subtotal</Text>
          {/* <Text className="text-lg font-bold">${total}</Text> */}
        </View>
        <Text className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </Text>
        <View className="mt-2">
          <TouchableOpacity className="flex items-center justify-center py-3 bg-black rounded-md shadow-lg">
            <Text className="text-lg font-bold text-white">Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
