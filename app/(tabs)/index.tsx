import EmptyState from "@components/EmptyState";
import ProductItem from "@components/ProductItem";
import SearchInput from "@components/SearchInput";
import { RootState, useAppDispatch } from "@store/index";
import { fetchProducts } from "@store/productSlice";

import { FlatList, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
type Props = {};

const Page = (props: Props) => {
  const dispatch = useAppDispatch();
  const { searchProducts, loading } = useSelector(
    (state: RootState) => state.products
  );

  const { token } = useSelector((state: RootState) => state.userAuth);
  const onRefresh = async () => {
    if (token) dispatch(fetchProducts(token));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "bg-primary" }}>
      <FlatList
        data={searchProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return item.quantity > 0 ? <ProductItem data={item} /> : null;
        }}
        ListHeaderComponent={() => (
          <View className="flex px-2 my-2 space-y-6">
            <SearchInput />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Products Found"
            subtitle="No products available yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Page;
