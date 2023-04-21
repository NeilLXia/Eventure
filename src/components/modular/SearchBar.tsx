import { View, TextInput } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

interface searchBarProps {
  placeholderText: string;
}

const SearchBar = ({ placeholderText }: searchBarProps) => {
  return (
    <View className="w-full px-4 pt-6 pb-2">
      <View className="flex-row w-full h-[50px] items-center px-4 rounded-[4px] bg-white border-[1px] border-slate-400">
        <View className="mr-4">
          <FontAwesome5 name={"search"} size={20} color="#334155" />
        </View>
        <TextInput placeholder={placeholderText} keyboardType="default" />
      </View>
    </View>
  );
};

export default SearchBar;
