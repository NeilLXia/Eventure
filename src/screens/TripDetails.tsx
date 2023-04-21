import React, { useEffect } from "react";
import {
  View,
  Text,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";

import formatDate from "../scripts/formatDate";
import { setCurrentTrip } from "../store/slices/appStateSlice";
import TripDetailsHeader from "../components/TripDetails/TripDetailsHeader";
import EventList from "../components/TripDetails/EventList";
import HousingList from "../components/TripDetails/HousingList";
import FriendList from "../components/TripDetails/FriendList";
import AddFriendTile from "../components/TripDetails/AddFriendTile";
import AttendanceButton from "../components/TripDetails/AttendanceButton";

interface tripDetailsProps {
  navigation: any;
}

const TripDetails = ({ navigation }: tripDetailsProps) => {
  const dispatch = useDispatch();
  const userID = useSelector((state: any) => state.appState.userID);
  const trip = useSelector((state: any) => state.appState.currentTrip);
  const tripList = useSelector((state: any) => state.trip.tripsByUser);
  const { _id, name, start_date, end_date, attending, organizer_id } = trip;
  const users = trip.users ?? [];
  const housing = trip.housing ?? [];
  const events = trip.events ?? [];
  const isOrganizer = organizer_id === userID;

  useEffect(() => {
    tripList.forEach((tripitem) => {
      if (_id === tripitem._id) {
        dispatch(setCurrentTrip(tripitem));
      }
    });
  }, [tripList]);

  const paddingTop = Platform.OS === "android" ? 32 : 0;
  return (
    <SafeAreaView className="flex-1" style={{ paddingTop }}>
      <TripDetailsHeader navigation={navigation} isOrganizer={isOrganizer} />
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
            {isOrganizer && (
              <View className="w-[80px] rounded-full bg-purple-500 mt-2">
                <Text className="text-center text-slate-200 text-sm">
                  organizer
                </Text>
              </View>
            )}
          </View>
          <Text className="text-2xl font-semibold">Details</Text>
          <Text className="text-md py-2">
            Aute culpa commodo eiusmod amet laboris sunt. Culpa pariatur sit
            magna quis excepteur aliqua do et commodo cillum nisi nulla aute...
          </Text>
          <Text className="text-2xl font-semibold">Who's Going?</Text>
          <View className="py-2">
            <FriendList users={users} isOrganizer={isOrganizer} />
            {isOrganizer && <AddFriendTile tripID={_id} />}
          </View>
          <Text className="text-2xl font-semibold">Housing</Text>
          <HousingList
            trip_id={_id}
            housings={housing}
            navigation={navigation}
            isOrganizer={isOrganizer}
          />
          <Text className="text-2xl font-semibold">Events</Text>
          <EventList
            events={events}
            navigation={navigation}
            isOrganizer={isOrganizer}
          />
          {/* <Text className="text-2xl font-semibold">Notes</Text> */}
          <View className="h-[100px]" />
        </ScrollView>
      </Animatable.View>
      <View className="flex-1 absolute bottom-0 w-full h-[100px] bg-white">
        <AttendanceButton isOrganizer={isOrganizer} />
      </View>
    </SafeAreaView>
  );
};

export default TripDetails;
