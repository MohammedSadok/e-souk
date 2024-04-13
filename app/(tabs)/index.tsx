import getProducts from "@api/get-products";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Product } from "types";
import ProductItem from "../../components/ProductItem";
const Page = () => {
  const [products, setProducts] = useState<Product[]>();
  useEffect(() => {
    const fetchedProducts = async () => {
      const products = await getProducts({ isFeatured: true });
      setProducts(products);
    };
    fetchedProducts();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {products && (
        <ScrollView className="mt-5 space-y-2">
          {products.map((product) => (
            <ProductItem key={product.id} data={product} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
export default Page;
