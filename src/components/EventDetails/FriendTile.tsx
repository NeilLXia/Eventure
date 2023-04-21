import React from "react";
import { useSelector } from "react-redux";
import { View, Text, Image } from "react-native";

import AttendanceTag from "../modular/AttendanceTag";

interface eventProps {
  id: number;
  first_name: string;
  last_name: string;
  photo: string;
  attending: string;
}

const FriendTile = ({
  id,
  first_name,
  last_name,
  photo,
  attending,
}: eventProps) => {
  const tag = <AttendanceTag attending={attending} isOrganizer={false} />;

  return (
    <View
      className={`flex-row w-full h-[60px] rounded-[8px] mb-2 p-2 bg-white shadow`}
    >
      <View className="flex-row w-full justify-between">
        <View className="flex-row flex-1">
          <View className="w-[50px] h-[50px] bg-neutral-400">
            <Image
              source={{ uri: photo ?? null }}
              resizeMode="cover"
              className="flex-1"
            />
          </View>
          <View className="flex-1 px-4 justify-center">
            <Text className="text-md text-slate-700">
              {first_name} {last_name}
            </Text>
          </View>
        </View>
        <View className="justify-center mr-2">{tag}</View>
      </View>
    </View>
  );
};

export default FriendTile;
