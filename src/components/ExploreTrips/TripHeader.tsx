import {
  Text,
  View,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const TripHeader = ({ navigation }) => {
  const paddingTop =
    Platform.OS === "android"
      ? (StatusBar.currentHeight ? StatusBar.currentHeight : 6) + 6
      : 12;

  return (
    <View
      className={`w-full px-3 pb-4 bg-white rounded-b-[16px] shadow`}
      style={{ paddingTop: paddingTop }}
    >
      <View className="flex-row justify-between items-center">
        <Text className="pt-4 pl-4 text-4xl font-semibold">Trips</Text>
        <View className="mt-2 mr-4 justify-center items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("NewTripForm")}
            activeOpacity={0.8}
          >
            <FontAwesome5 name={"plus"} size={25} color="#334155" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TripHeader;
