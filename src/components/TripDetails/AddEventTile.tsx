import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

interface addHousingTileProps {
  tripID: number;
  navigation: any;
}

const AddEventTile = ({ tripID, navigation }: addHousingTileProps) => {
  const addEventHandler = () => {
    navigation.navigate("NewEventForm");
  };

  return (
    <View>
      <TouchableOpacity
        className={`flex-col w-[200px] h-auto rounded-[8px] mr-6 my-2 py-2 bg-white shadow items-center`}
        onPress={addEventHandler}
      >
        <View className="h-[100px] w-[100px] mb-2 bg-neutral-300 justify-center items-center rounded-full">
          <FontAwesome5 name={"plus"} size={60} color="#334155" />
        </View>
        <Text className="text-md text-slate-700 text-center">
          Add Event Details!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddEventTile;
