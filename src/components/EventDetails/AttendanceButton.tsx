import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";

import tripAPI from "../../store/scripts/tripAPI";
import { setCurrentEvent } from "../../store/slices/appStateSlice";
import eventAPI from "../../store/scripts/eventAPI";

const AttendanceButton = ({ isParticipant }: { isParticipant: boolean }) => {
  const dispatch = useDispatch();
  const userID = useSelector((state: any) => state.appState.userID);
  const event = useSelector((state: any) => state.appState.currentEvent);

  let buttonText = "";
  let buttonStyle = "hidden";
  let buttonStyle2 = "hidden";
  let disableButton2 = true;
  let disableButton1 = true;
  let newAttending = "";

  if (isParticipant) {
    buttonText = "Join";
    buttonStyle =
      "w-[175px] h-[50px] bg-slate-600 border-2 border-slate-700 items-center rounded-[8px] justify-center";
    disableButton1 = false;
    newAttending = "joining";
  }

  const buttonHandler = async () => {
    await eventAPI.changeEventAttending(userID, event._id, newAttending);
    const eventData = await eventAPI.getEvent(event._id);
    await dispatch(setCurrentEvent(eventData[0]));
  };

  let attending = "";
  if (event?.users) {
    event.users.forEach((user) => {
      if (user._id === userID) {
        attending = user.attending;
      }
    });
  }

  if (attending === "joining") {
    buttonStyle =
      "w-[175px] h-[50px] bg-red-600 border-2 border-slate-700 items-center rounded-[8px] justify-center";
    buttonText = "Leave Event";
    newAttending = "declined";
  }
  if (attending === "invited") {
    buttonStyle =
      "w-[175px] h-[50px] bg-green-600 border-2 border-slate-700 items-center rounded-[8px] justify-center";
    buttonText = "Accept Request";
    buttonStyle2 =
      "w-[175px] h-[50px] bg-red-600 border-2 border-slate-700 items-center rounded-[8px] justify-center";
    disableButton2 = false;
    newAttending = "joining";
  }
  if (attending === "declined") {
    buttonStyle =
      "w-[175px] h-[50px] bg-green-600 border-2 border-slate-700 items-center rounded-[8px] justify-center";
    buttonText = "Join";
    newAttending = "joining";
  }

  return (
    <View className="flex-row p-4 justify-evenly">
      <TouchableOpacity
        activeOpacity={0.8}
        className={buttonStyle}
        onPress={buttonHandler}
      >
        <Text className="text-lg font-semibold text-white">{buttonText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        className={buttonStyle2}
        onPress={() => {
          if (!disableButton2) {
            tripAPI.changeTripAttending(userID, event._id, "declined");
          }
        }}
      >
        <Text className="text-lg font-semibold text-white">
          Decline Request
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AttendanceButton;
