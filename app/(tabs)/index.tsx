import { RootState } from "@store/index";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";
const Page = () => {
  const { products } = useSelector((state: RootState) => state.products);

  return (
    <View className="flex-1 bg-gray-50">
      {products.length > 0 && (
        <ScrollView className="space-y-2 ">
          {products.map((product) => (
            <ProductItem key={product.id} data={product} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};
export default Page;
