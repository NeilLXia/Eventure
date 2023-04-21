import React from "react";
import { Image, View, Text, TouchableOpacity, Linking } from "react-native";

import AttendanceTag from "../modular/AttendanceTag";

interface housingTileProps {
  housing: any;
  navigation: any;
}

const HousingTile = ({ housing, navigation }: housingTileProps) => {
  let attending = "No confirmed attendees";

  const navigateHandler = () => {
    Linking.openURL(housing.link);
  };

  const tag = <AttendanceTag attending={attending} isOrganizer={false} />;
  return (
    <TouchableOpacity
      onPress={navigateHandler}
      activeOpacity={0.8}
      className={`flex-col w-[200px] h-auto rounded-[8px] mr-6 my-2 py-2 bg-white shadow`}
    >
      <View className="h-[100px] mb-2 bg-neutral-400">
        <Image
          source={{ uri: housing.photo }}
          resizeMode="cover"
          className="flex-1"
        />
      </View>
      <View className="px-4">
        {tag}
        <Text className="text-md text-slate-700 text-center">
          {housing.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HousingTile;
