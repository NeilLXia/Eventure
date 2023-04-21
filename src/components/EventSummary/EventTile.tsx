import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import AttendanceTag from "../modular/AttendanceTag";
import formatDate from "../../scripts/formatDate";
import formatNameSummary from "../../scripts/formatNameSummary";
import { getOneEvent } from "../../store/slices/eventSlice";
import { setCurrentEvent } from "../../store/slices/appStateSlice";
import eventAPI from "../../store/scripts/eventAPI";

interface eventProps {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  users: any;
  attending: string;
  navigation: any;
}

const EventTile = ({
  id,
  name,
  start_date,
  end_date,
  users,
  attending,
  navigation,
}: eventProps) => {
  const dispatch = useDispatch();
  const navigateHandler = async () => {
    const eventData = await eventAPI.getEvent(id);
    await dispatch(setCurrentEvent(eventData[0]));
    navigation.navigate("EventDetails");
  };

  const attendeeDisplay = formatNameSummary(users);
  const tag = <AttendanceTag attending={attending} isOrganizer={false} />;

  return (
    <TouchableOpacity
      onPress={navigateHandler}
      activeOpacity={0.8}
      className={`flex-row w-full h-[130px] rounded-[8px] mb-6 p-4 bg-white shadow`}
    >
      <View className="flex-1 pl-4">
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

export default EventTile;
