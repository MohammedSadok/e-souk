import RelatedItem from "@components/RelatedItem";
import { Feather } from "@expo/vector-icons";
import { RootState, useAppDispatch } from "@store/index";
import { addProductToCart } from "@store/productSlice";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { Product } from "types";

const DetailsPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { products } = useSelector((state: RootState) => state.products);
  const product = products.find((p) => p.id === parseInt(id));
  const [relatedProducts, setRelatedProducts] = useState<Product[]>();
  const [image, setImage] = useState<string>();
  useEffect(() => {
    setImage(product?.images[0].imageUrl);
  }, []);
  // if (product !== undefined)
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const product = await getProduct(id);
  //     const suggestedProducts = await getProducts({
  //       categoryId: product?.category?.id,
  //     });
  //     setProduct(product);
  //     setRelatedProducts(suggestedProducts);
  //     setImage(product.images[0].url);
  //   };
  //   fetchProduct();
  // }, [id]);
  return (
    <View className="flex flex-col justify-between flex-1 p-3 bg-white">
      <Text className="ml-4 text-2xl" style={{ fontFamily: "Poppins-Black" }}>
        {product?.name}
      </Text>
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
            onPress={() => dispatch(addProductToCart(product))}
          >
            <View className="flex flex-row items-center gap-2">
              <Text
                className="text-xs text-white"
                style={{ fontFamily: "Poppins-Black" }}
              >
                Add To Cart
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
            keyExtractor={(item) => item.id}
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
    </View>
  );
};

export default DetailsPage;
