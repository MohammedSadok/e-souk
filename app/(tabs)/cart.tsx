import CartItem from "@components/CartItem";
import Loader from "@components/Loading";
import { RootState, useAppDispatch } from "@store/index";
import { createOrder } from "@store/productSlice";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
const Page = () => {
  const { cart, loading } = useSelector((state: RootState) => state.products);
  const { user, token } = useSelector((state: RootState) => state.userAuth);
  const dispatch = useAppDispatch();
  let sum = 0;
  cart.forEach((product) => {
    sum += product.price * product.quantity;
  });
  const submitOrder = () => {
    if (user && token && cart.length > 0)
      dispatch(createOrder({ products: cart, userId: user?.id, token: token }));
  };
  return (
    <SafeAreaView className="flex justify-between flex-1 ">
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
          <Text className="text-lg font-bold">${sum.toFixed(2)}</Text>
        </View>
        <Text className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </Text>
        <View className="mt-2">
          <TouchableOpacity
            className="flex items-center justify-center py-3 bg-black rounded-md shadow-lg"
            onPress={submitOrder}
          >
            <Text className="text-lg font-bold text-white">Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loader isLoading={loading} />
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({});
