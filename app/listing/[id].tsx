import getProduct from "@api/get-product";
import getProducts from "@api/get-products";
import RelatedItem from "@components/RelatedItem";
import { Feather } from "@expo/vector-icons";
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
import { Product } from "types";

const DetailsPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>();
  const [image, setImage] = useState<string>();
  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct(id);
      const suggestedProducts = await getProducts({
        categoryId: product?.category?.id,
      });
      setProduct(product);
      setRelatedProducts(suggestedProducts);
      setImage(product.images[0].url);
    };
    fetchProduct();
  }, [id]);
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
                  setImage(image?.url);
                }}
              >
                <Image
                  resizeMode="center"
                  className="object-cover object-center w-full h-full"
                  source={{
                    uri: image?.url,
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View className="p-2 space-y-3 w-min">
          <Text style={{ fontFamily: "Poppins-Black" }}>
            $ {product?.price}
          </Text>
          <Text style={{ fontFamily: "Poppins-Regular" }}>
            Size: {product?.size.name}
          </Text>
          <Text style={{ fontFamily: "Poppins-Regular" }}>
            Quantity: {product?.quantity}
          </Text>
          <View className="flex flex-row items-center ">
            <Text style={{ fontFamily: "Poppins-Regular" }}>Color: </Text>
            <View
              style={{ backgroundColor: product?.color.value }}
              className="w-4 h-4 rounded-full"
            ></View>
          </View>
          <Text style={{ fontFamily: "Poppins-Thin" }} className="mb-2">
            {product?.category.name}
          </Text>
          <TouchableOpacity className="p-3 bg-black rounded-lg ">
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
