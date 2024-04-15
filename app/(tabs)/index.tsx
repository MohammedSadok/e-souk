import { RootState } from "@store/index";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";
const Page = () => {
  const { products } = useSelector((state: RootState) => state.products);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {products.length > 0 && (
        <ScrollView className="space-y-2 ">
          {products.map((product) => (
            <ProductItem key={product.id} data={product} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
export default Page;
