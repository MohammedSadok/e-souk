import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ImageSourcePropType, Text, View } from "react-native";

import { RootState, useAppDispatch } from "@store/index";
import { fetchProducts } from "@store/productSlice";
import Colors from "constants/Colors";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { icons } from "../../constants";
interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ color, focused, icon, name }: TabIconProps) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  const { user } = useSelector((state: RootState) => state.userAuth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  if (user === null) return <Redirect href="/sign-in" />;
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.dark,
          tabBarInactiveTintColor: Colors.gray,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <TabIcon
                  icon={icons.home}
                  color={color}
                  name="index"
                  focused={focused}
                />
              ) : (
                <TabIcon
                  icon={icons.homeOutline}
                  color={color}
                  name="index"
                  focused={focused}
                />
              ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <TabIcon
                  icon={icons.search}
                  color={color}
                  name="Search"
                  focused={focused}
                />
              ) : (
                <TabIcon
                  icon={icons.searchOutline}
                  color={color}
                  name="Search"
                  focused={focused}
                />
              ),
          }}
        />

        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <TabIcon
                  icon={icons.cart}
                  color={color}
                  name="Cart"
                  focused={focused}
                />
              ) : (
                <TabIcon
                  icon={icons.cartOutline}
                  color={color}
                  name="Cart"
                  focused={focused}
                />
              ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <TabIcon
                  icon={icons.account}
                  color={color}
                  name="Profile"
                  focused={focused}
                />
              ) : (
                <TabIcon
                  icon={icons.accountOutline}
                  color={color}
                  name="Profile"
                  focused={focused}
                />
              ),
          }}
        />
      </Tabs>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
}
