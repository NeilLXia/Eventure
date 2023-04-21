import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import AttendanceTag from "../modular/AttendanceTag";
import formatDate from "../../scripts/formatDate";
import formatNameSummary from "../../scripts/formatNameSummary";
import { setCurrentTrip } from "../../store/slices/appStateSlice";

interface eventProps {
  trip: any;
  navigation: any;
}

const TripTile = ({ trip, navigation }: eventProps) => {
  const dispatch = useDispatch();

  const {
    id,
    name,
    start_date,
    end_date,
    users,
    housing,
    attending,
    organizer_id,
  } = trip;

  const userID = useSelector((state: any) => state.appState.userID);
  const attendeeDisplay = formatNameSummary(users);
  const tag = (
    <AttendanceTag
      attending={attending}
      isOrganizer={userID === organizer_id}
    />
  );
  let previewImage = null;

  const navigateHandler = () => {
    dispatch(setCurrentTrip(trip));
    navigation.navigate("TripDetails");
  };

  if (housing) {
    if (housing.length > 0) {
      previewImage = housing[0].photo;
    }
  }

  return (
    <TouchableOpacity
      onPress={navigateHandler}
      activeOpacity={0.8}
      className={`flex-col w-full h-auto rounded-[8px] mb-6`}
    >
      <View className="h-[150px] mb-3 bg-neutral-400">
        <Image
          source={{ uri: previewImage }}
          resizeMode="cover"
          className="flex-1"
        />
      </View>
      <View className="flex-1 pl-2">
        {tag}
        <Text className="text-lg text-slate-700 leading-6 my-1">{name}</Text>
        <Text className="text-xs text-slate-700">
          {formatDate(start_date)} - {formatDate(end_date)}
        </Text>
        <Text className="text-xs text-slate-700">{attendeeDisplay}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TripTile;
