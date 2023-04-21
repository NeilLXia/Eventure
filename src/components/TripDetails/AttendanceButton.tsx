import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Dialog from "react-native-dialog";

import tripAPI from "../../store/scripts/tripAPI";
import { tripsByUser } from "../../store/slices/tripSlice";

const AttendanceButton = ({ isOrganizer }) => {
  const dispatch = useDispatch();
  let newAttending = "requested";
  const userID = useSelector((state: any) => state.appState.userID);
  const trip = useSelector((state: any) => state.appState.currentTrip);

  const buttonHandler = async () => {
    await tripAPI.changeTripAttending(userID, trip._id, newAttending);
    await dispatch(tripsByUser(userID));
  };

  let buttonText = "Request to Join";
  let buttonStyle =
    "w-[175px] h-[50px] bg-slate-600 border-2 border-slate-700 items-center rounded-[8px] justify-center";
  let buttonStyle2 = "hidden";
  let disableButton2 = true;

  let attending = "";
  trip.users.forEach((user) => {
    if (user._id === userID) {
      attending = user.attending;
    }
  });

  if (attending === "joining") {
    buttonStyle =
      "w-[175px] h-[50px] bg-red-600 border-2 border-slate-700 items-center rounded-[8px] justify-center";
    buttonText = "Leave Trip";
    newAttending = "declined";
  } else if (attending === "requested") {
    buttonStyle =
      "w-[175px] h-[50px] bg-red-600 border-2 border-slate-700 items-center rounded-[8px] justify-center";
    buttonText = "Unrequest";
    newAttending = "declined";
  } else if (attending === "invited") {
    buttonStyle =
      "w-[175px] h-[50px] bg-green-600 border-2 border-slate-700 items-center rounded-[8px] justify-center";
    buttonText = "Accept Request";
    buttonStyle2 =
      "w-[175px] h-[50px] bg-red-600 border-2 border-slate-700 items-center rounded-[8px] justify-center";
    disableButton2 = false;
    newAttending = "joining";
  } else if (isOrganizer) {
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
            tripAPI.changeTripAttending(userID, trip._id, "declined");
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
