import RelatedItem from "@components/RelatedItem";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { RootState, useAppDispatch } from "@store/index";
import { addProductToCart, removeProductFromCart } from "@store/productSlice";
import axios from "axios";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { Product } from "types";
const DetailsPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { products, cart } = useSelector((state: RootState) => state.products);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>();

  const { token } = useSelector((state: RootState) => state.userAuth);
  const product = products.find((p) => p.id === parseInt(id));
  const inCart = !!cart.find((p) => p.id === parseInt(id, 10));

  const [image, setImage] = useState<string>();
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    setImage(product?.images[0].imageUrl);
  }, []);
  if (product !== undefined)
    useEffect(() => {
      const fetchRelatedProducts = async () => {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/products/category/${product?.category.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRelatedProducts(response.data);
      };
      fetchRelatedProducts();
    }, [id]);
  return (
    <SafeAreaView className="flex flex-col justify-around flex-1 p-3 bg-white">
      <View className="flex-row items-center justify-between w-full">
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome5 name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text
          className="mx-auto text-2xl break-all h-9"
          style={{ fontFamily: "Poppins-Black" }}
        >
          {product?.name}
        </Text>
      </View>
      <View className="flex flex-row pb-4 mx-auto border-b-2 border-gray-500">
        <View className="w-auto">
          {image && (
            <View className="mt-2 border border-gray-300 rounded-md h-60 w-60">
              <Image
                resizeMode="contain"
                className="object-cover object-center w-full h-full"
                source={{
                  uri: image,
                }}
              />
            </View>
          )}
          <ScrollView className="flex flex-row gap-2 mt-1" horizontal>
            {product?.images.map((image, index) => (
              <TouchableOpacity
                key={index}
                className="flex-shrink-0 overflow-hidden border-2 border-gray-200 rounded-md h-14 w-14"
                onPress={() => {
                  setImage(image?.imageUrl);
                }}
              >
                <Image
                  resizeMode="center"
                  className="object-cover object-center w-full h-full"
                  source={{
                    uri: image?.imageUrl,
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View className="p-2 space-y-3 w-min">
          <Text className="text-lg font-pextrabold">$ {product?.price}</Text>

          <Text className="font-pregular">
            Size(s): {product?.sizes.map((size) => size.value + ", ")}
          </Text>

          <Text className="font-pregular">Quantity: {product?.quantity}</Text>
          <View className="flex flex-row items-center ">
            <Text className="font-pregular">Color(s): </Text>
            {product?.colors.map((color) => (
              <View
                key={color.id}
                style={{ backgroundColor: color.hexValue }}
                className="w-4 h-4 mr-1 rounded-full"
              ></View>
            ))}
          </View>
          <Text className="mb-2 font-plight">{product?.category.name}</Text>
          <TouchableOpacity
            className="p-3 bg-black rounded-lg "
            onPress={() => {
              if (inCart) dispatch(removeProductFromCart(product?.id));
              else dispatch(addProductToCart(product));
            }}
          >
            <View className="flex flex-row items-center gap-2">
              <Text className="text-xs text-white font-pmedium">
                {inCart ? "Remove from" : "Add to "}
              </Text>
              <Feather name="shopping-cart" size={18} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View className="h-[40%]">
        <Text style={{ fontFamily: "Poppins-Black" }} className="text-xl">
          Related Items
        </Text>
        {relatedProducts && relatedProducts.length > 0 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={relatedProducts}
            keyExtractor={(item) => item.id + ""}
            className="mt-4"
            renderItem={({ item }) => <RelatedItem key={item.id} data={item} />}
          ></FlatList>
        ) : (
          <View className="items-center justify-center flex-1">
            <Text
              className="text-xl text-gray-600"
              style={{ fontFamily: "Poppins-Black" }}
            >
              No Related Items.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DetailsPage;
