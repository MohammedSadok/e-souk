import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

import { useAppDispatch } from "@store/index";
import { searchProducts } from "@store/productSlice";
import { icons } from "../constants";

interface SearchInputProps {
  initialQuery?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ initialQuery }) => {
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState<string>(initialQuery || "");

  return (
    <View className="flex flex-row items-center w-full h-12 px-4 space-x-4 border-2 border-black rounded-md text-primary focus:border-secondary">
      <TextInput
        className="flex-1 font-pregular"
        value={query}
        placeholder="Search a product ..."
        onChangeText={(text) => setQuery(text)}
      />

      <TouchableOpacity onPress={() => dispatch(searchProducts(query))}>
        <Image
          source={icons.search}
          style={{ width: 20, height: 20, tintColor: "black" }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
