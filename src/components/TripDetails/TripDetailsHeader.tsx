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
import { toggleEditMode } from "../../store/slices/appStateSlice";

interface tripDetailsHeaderProps {
  navigation: any;
  isOrganizer: boolean;
}

const TripDetailsHeader = ({
  navigation,
  isOrganizer,
}: tripDetailsHeaderProps) => {
  const navigateHandler = () => {
    navigation.goBack();
  };

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
        <View className="mt-2 pl-2 items-center">
          <TouchableOpacity onPress={navigateHandler} activeOpacity={0.8}>
            <FontAwesome5 name={"angle-left"} size={25} color="#334155" />
          </TouchableOpacity>
        </View>

        <View className={isOrganizer ? "mt-2 pr-2 items-center" : "hidden"}>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditTripForm")}
            activeOpacity={0.8}
          >
            <FontAwesome5 name={"pen"} size={25} color="#334155" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TripDetailsHeader;
