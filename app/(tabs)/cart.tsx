import CartItem from "@components/CartItem";
import Loader from "@components/Loading";
import ModalPopUp from "@components/ModalPopUp";
import { RootState, useAppDispatch } from "@store/index";
import { createOrder } from "@store/productSlice";
import React, { useState } from "react";
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
  const [isVisible, setIsVisible] = useState(false);
  return (
    <SafeAreaView className="flex justify-between flex-1 ">
      <ModalPopUp
        isVisible={isVisible}
        setIsVisible={() => setIsVisible(false)}
        title="Validate"
      >
        <View className="w-4/6 px-3">
          <Text className="my-3 text-xl font-plight">Are you sure ?</Text>
          <View className="flex-row items-center justify-between my-3 space-x-6">
            <TouchableOpacity
              className="px-6 py-2.5 bg-blue-600 rounded-md"
              onPress={() => {
                submitOrder();
                setIsVisible(false);
              }}
            >
              <Text className="text-xl text-white font-psemibold">Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-6 py-2.5 bg-slate-300 rounded-md"
              onPress={() => setIsVisible(false)}
            >
              <Text className="text-xl font-psemibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalPopUp>
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.name}
          className="mt-5 space-y-2 "
          renderItem={({ item }) => <CartItem key={item.id} data={item} />}
        ></FlatList>
      ) : (
        <View className="items-center justify-center flex-1">
          <Text className="text-xl text-gray-600 font-pbold">
            No items added to cart.
          </Text>
        </View>
      )}

      <View className="px-4 py-2 bg-slate-50">
        <View className="flex flex-row justify-between text-base font-medium text-gray-900">
          <Text className="text-lg font-pmedium">Subtotal</Text>
          <Text className="text-lg font-pmedium">${sum.toFixed(2)}</Text>
        </View>
        <Text className="mt-0.5 text-sm text-gray-500 font-pmedium">
          Shipping and taxes calculated at checkout.
        </Text>
        <View className="mt-2">
          <TouchableOpacity
            className="flex items-center justify-center py-3 bg-black rounded-md shadow-lg"
            onPress={() => setIsVisible(true)}
          >
            <Text className="text-lg text-white font-pbold">Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loader isLoading={loading} />
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({});
