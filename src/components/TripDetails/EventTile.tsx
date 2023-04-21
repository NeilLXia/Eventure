import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import formatDate from "../../scripts/formatDate";
import AttendanceTag from "../modular/AttendanceTag";
import eventAPI from "../../store/scripts/eventAPI";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentEvent } from "../../store/slices/appStateSlice";

interface eventTileProps {
  id: number;
  navigation: any;
}

const EventTile = ({ id, navigation }: eventTileProps) => {
  const dispatch = useDispatch();
  let [event, setEvent] = useState(null);
  let attendeeDisplay;
  let attending = "No confirmed attendees";
  let userID = useSelector((state) => state.appState.userID);

  const navigateHandler = async () => {
    const eventData = await eventAPI.getEvent(id);
    await dispatch(setCurrentEvent(eventData[0]));
    navigation.navigate("EventDetails");
  };

  useEffect(() => {
    const eventDetails = async () => {
      setEvent((await eventAPI.getEvent(id))[0]);
    };
    eventDetails();
  }, []);

  if (event?.users) {
    if (event.users.length === 1) {
      attendeeDisplay = "1 person is going";
    }
    if (event.users.length > 1) {
      attendeeDisplay = `${event.users.length} people are going`;
    }
    event.users.forEach((user) => {
      if (user._id === userID) {
        attending = user.attending;
      }
    });
  }

  const tag = <AttendanceTag attending={attending} isOrganizer={false} />;
  return (
    <TouchableOpacity
      onPress={navigateHandler}
      activeOpacity={0.8}
      className={`flex-col w-[200px] h-auto rounded-[8px] mr-6 my-2 py-2 bg-white shadow`}
    >
      <View className="p-4">
        {tag}
        <Text className="text-md text-slate-700">{event?.name ?? ""}</Text>
        <Text className="text-xs text-slate-700">
          {`${formatDate(event?.start_date ?? "")} - ${formatDate(
            event?.end_date ?? ""
          )}`}
        </Text>
        <Text className="text-xs text-slate-700">{attendeeDisplay ?? ""}</Text>
        <Text className="text-xs mt-2 text-slate-700">
          {event?.description ?? ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventTile;
