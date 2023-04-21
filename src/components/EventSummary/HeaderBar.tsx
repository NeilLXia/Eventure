import { View, Platform, StatusBar, ScrollView, Image } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import GroupButton from "./GroupButton";
import EventSearchBar from "../modular/SearchBar";
import AppLogo from "../../assets/tabisho_logo.png";

const HeaderBar = () => {
  const groupsList = [
    { id: 1, label: "Go Bears", image: "" },
    { id: 2, label: "HackReactor", image: "" },
    { id: 3, label: "Bay Area Boarding", image: "" },
    { id: 4, label: "Subtle Asian Travel", image: "" },
    { id: 5, label: "Snow Report", image: "" },
  ].map((item) => {
    return <GroupButton label={item.label} key={item.id} image={item.image} />;
  });

  const paddingTop =
    Platform.OS === "android"
      ? (StatusBar.currentHeight ? StatusBar.currentHeight : 6) + 6
      : 12;

  return (
    <View
      className={`w-full px-3 pb-4 bg-white rounded-b-[16px] shadow`}
      style={{ paddingTop: paddingTop }}
    >
      <View className="flex-row justify-between items-center mt-4">
        <Image
          source={AppLogo}
          resizeMode="contain"
          style={{
            height: 30,
            width: 120,
          }}
        />
        {/* <View className="mr-4 justify-center items-center">
          <FontAwesome5 name={"calendar-alt"} size={30} color="#334155" />
        </View> */}
      </View>
      <EventSearchBar placeholderText="Search Events..." />

      {/* Travel Groups */}
      {/* <View className={`w-full h-[120px] p-4`}>
        <ScrollView horizontal={true} className="flex-row w-full h-[100px]">
          {groupsList}
        </ScrollView>
      </View> */}
    </View>
  );
};

export default HeaderBar;
