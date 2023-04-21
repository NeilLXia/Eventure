import React, { useEffect } from "react";
import { View, Text, Platform, SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";

import formatDate from "../scripts/formatDate";
import TripDetailsHeader from "../components/TripDetails/TripDetailsHeader";
import FriendList from "../components/EventDetails/FriendList";
import AddFriendTile from "../components/EventDetails/AddFriendTile";
import AttendanceButton from "../components/EventDetails/AttendanceButton";
import tripAPI from "../store/scripts/tripAPI";
import { setCurrentTrip } from "../store/slices/appStateSlice";
import { eventsByUser } from "../store/slices/eventSlice";

interface eventDetailsProps {
  navigation: any;
}

const EventDetails = ({ navigation }: eventDetailsProps) => {
  const dispatch = useDispatch();
  const trip = useSelector((state: any) => state.appState.currentTrip);
  const event = useSelector((state: any) => state.appState.currentEvent);
  const userID = useSelector((state: any) => state.appState.userID);
  const { name, start_date, end_date, description } = event || {
    name: "",
    start_date: "",
    end_date: "",
    description: "",
    attending: "",
  };
  const users = event?.users || [];
  let isParticipant = false;

  useEffect(() => {
    const checkTripUsers = async () => {
      const refreshTrip = await tripAPI.getOneTrip(event.trip_id);
      dispatch(setCurrentTrip(refreshTrip));
      dispatch(eventsByUser(userID));
    };
    checkTripUsers();
  }, [event]);

  if (trip?.users) {
    trip.users.forEach((user: any) => {
      if (user._id === userID && user.attending === "joining") {
        isParticipant = true;
      }
    });
    if (trip.organizer_id === userID) {
      isParticipant = true;
    }
  }

  const paddingTop = Platform.OS === "android" ? 32 : 0;
  return (
    <SafeAreaView className="flex-1" style={{ paddingTop }}>
      <TripDetailsHeader navigation={navigation} isOrganizer={isParticipant} />
      <Animatable.View
        animation="fadeIn"
        duration={500}
        className="flex-1 px-8"
      >
        <ScrollView className="flex-1">
          <View className="py-4">
            <Text className="text-3xl font-semibold">{name}</Text>

            <Text className="text-md">
              {formatDate(start_date)} - {formatDate(end_date)}
            </Text>
          </View>
          <Text className="text-2xl font-semibold">Details</Text>
          <Text className="text-md py-2">{description}</Text>
          <Text className="text-2xl font-semibold">Who's Going?</Text>
          <View className="py-2">
            <FriendList users={users} />
            {isParticipant && <AddFriendTile />}
          </View>
          <View className="h-[100px]" />
        </ScrollView>
      </Animatable.View>
      <View className="flex-1 absolute bottom-0 w-full h-[100px] bg-white">
        <AttendanceButton isParticipant={isParticipant} />
      </View>
    </SafeAreaView>
  );
};

export default EventDetails;
