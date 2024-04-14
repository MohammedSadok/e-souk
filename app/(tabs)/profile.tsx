import { logout } from "@store/authSlice";
import { useAppDispatch } from "@store/index";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const Page = (props: Props) => {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => dispatch(logout())}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({});
