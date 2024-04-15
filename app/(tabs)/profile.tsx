import EmptyState from "@components/EmptyState";
import InfoBox from "@components/InfoBox";
import ProductItem from "@components/ProductItem";
import { SimpleLineIcons } from "@expo/vector-icons";
import { logout } from "@store/authSlice";
import { RootState, useAppDispatch } from "@store/index";
import { router } from "expo-router";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
type Props = {};

const Page = (props: Props) => {
  const { user } = useSelector((state: RootState) => state.userAuth);
  const { products } = useSelector((state: RootState) => state.products);
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    logout();
    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={products}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <ProductItem key={item.id} data={item} />
          // <ProductItem
          //   title={item.title}
          //   thumbnail={item.thumbnail}
          //   video={item.video}
          //   creator={item.creator.username}
          //   avatar={item.creator.avatar}
          // />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex items-center justify-center w-full px-4 mt-6 mb-12">
            <TouchableOpacity
              onPress={handleLogout}
              className="flex items-end w-full mb-10"
            >
              <SimpleLineIcons name="logout" size={24} color="black" />
            </TouchableOpacity>

            <View className="flex items-center justify-center w-16 h-16 border rounded-lg border-secondary">
              {/* <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              /> */}
            </View>

            <InfoBox
              title={user?.userName as string}
              containerStyles="mt-5"
              titleStyles="text-lg"
              subtitle={""}
            />

            <View className="flex flex-row mt-5">
              <InfoBox
                title={products.length + ""}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Page;
