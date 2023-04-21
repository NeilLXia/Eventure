import { Text, View, Platform, StatusBar } from "react-native";
import React from "react";

import FriendSearchBar from "../modular/SearchBar";

const FriendHeader = () => {
  const paddingTop =
    Platform.OS === "android"
      ? (StatusBar.currentHeight ? StatusBar.currentHeight : 6) + 6
      : 12;

  return (
    <View
      className={`w-full px-3 pb-4 bg-white rounded-b-[16px] shadow`}
      style={{ paddingTop: paddingTop }}
    >
      <Text className="pt-4 pl-4 text-4xl font-semibold">Friends</Text>
      <FriendSearchBar placeholderText="Search Friends..." />
    </View>
  );
};

export default FriendHeader;
