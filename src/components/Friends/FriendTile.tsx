import React from "react";
import { View, Text, Image } from "react-native";

interface eventProps {
  first_name: string;
  last_name: string;
  photo: string;
}

const FriendTile = ({ first_name, last_name, photo }: eventProps) => {
  return (
    <View
      className={`flex-row w-full h-[60px] rounded-[8px] mb-2 p-2 bg-white shadow`}
    >
      <View className="w-[50px] h-full mb-8 bg-neutral-400">
        <Image
          source={
            photo
              ? { uri: photo }
              : {
                  uri: "https://st.depositphotos.com/2218212/2938/i/600/depositphotos_29387653-stock-photo-facebook-profile.jpg",
                }
          }
          resizeMode="cover"
          className="flex-1"
        />
      </View>
      <View className="w-full px-4 justify-center">
        <Text className="text-md text-slate-700">
          {first_name} {last_name}
        </Text>
      </View>
    </View>
  );
};

export default FriendTile;
