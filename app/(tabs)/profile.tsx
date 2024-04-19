import EmptyState from "@components/EmptyState";
import Loader from "@components/Loading";
import ModalPopUp from "@components/ModalPopUp";
import OrderComponent from "@components/OrderComponent";
import { SimpleLineIcons } from "@expo/vector-icons";
import { logout } from "@store/authSlice";
import { RootState, useAppDispatch } from "@store/index";
import { fetchOrders } from "@store/productSlice";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const Page = () => {
  const { user, token } = useSelector((state: RootState) => state.userAuth);
  const onRefresh = async () => {
    if (token) dispatch(fetchOrders(token));
  };
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) dispatch(fetchOrders(token));
  }, []);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <SafeAreaView className="h-full pt-3 bg-white">
      <View className="flex flex-row items-center justify-between w-full px-3 ">
        <View className="flex items-center justify-center px-3 py-4 border rounded-full bg-black-100 border-secondary">
          <Text className="text-2xl text-white capitalize font-pextrabold">
            {user?.userName.slice(0, 15)} ...
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          className="p-3 bg-gray-700 rounded-lg"
        >
          <SimpleLineIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Text className="my-2 ml-2 text-2xl text-black underline capitalize font-pextrabold">
        Orders {orders.length}
      </Text>

      <ModalPopUp
        isVisible={isVisible}
        setIsVisible={() => setIsVisible(false)}
        title="Logout"
      >
        <View className="w-4/6 px-3">
          <Text className="my-3 text-xl font-plight">Are you sure ?</Text>
          <View className="flex-row items-center justify-between my-3 space-x-6">
            <TouchableOpacity
              className="px-6 py-2.5 bg-red-600 rounded-md"
              onPress={() => {
                dispatch(logout());
              }}
            >
              <Text className="text-xl text-white font-psemibold">Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-6 py-2.5 bg-slate-300 rounded-md"
              onPress={() => setIsVisible(false)}
            >
              <Text className="text-xl font-psemibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalPopUp>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderComponent key={item.id} order={item} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />
      <Loader isLoading={loading} />
    </SafeAreaView>
  );
};

export default Page;
