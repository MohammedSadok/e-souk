import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { RootState, useAppDispatch } from "@store/index";
import { addProductToCart, removeProductFromCart } from "@store/productSlice";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { Product } from "types";
interface ProductProps {
  data: Product;
}

const ProductItem = ({ data }: ProductProps) => {
  const dispatch = useAppDispatch();
  const { cart } = useSelector((state: RootState) => state.products);
  const inCart = cart.some((product) => product.id === data.id);
  const handleCartButton = () => {
    if (inCart) {
      dispatch(removeProductFromCart(data.id));
    } else {
      dispatch(addProductToCart(data));
    }
  };
  return (
    <Link href={`/listing/${data.id}`} asChild>
      <TouchableOpacity
        className="flex flex-row px-2 py-2 mx-2 mb-2 bg-white rounded-lg shadow-xl"
        key={data.id}
      >
        <View className="flex-shrink-0 w-20 h-20 overflow-hidden border border-gray-200 rounded-md">
          <Image
            resizeMode="center"
            className="object-cover object-center w-full h-full"
            source={{
              uri: data.images?.[0]?.imageUrl,
            }}
          />
        </View>
        <View className="flex flex-1 ml-2">
          <View>
            <View className="flex flex-row justify-between text-base font-medium text-gray-900">
              <Link href={"/"} asChild>
                <Text>{data.name}</Text>
              </Link>
              <TouchableOpacity
                className="transition active:scale-110"
                onPress={handleCartButton}
              >
                {inCart ? (
                  <FontAwesome5 name="shopping-cart" size={24} color="black" />
                ) : (
                  <Feather name="shopping-cart" size={24} color="black" />
                )}
              </TouchableOpacity>
            </View>
            <Text className="text-sm text-gray-500 ">
              {data.category?.name}
            </Text>
          </View>
          <View className="flex flex-row items-end justify-between flex-1 text-sm">
            <Text className="text-gray-500">Quantity {data.quantity}</Text>
            <Text className="ml-4 font-bold">$ {data.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ProductItem;
