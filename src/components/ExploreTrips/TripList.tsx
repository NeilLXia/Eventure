import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { tripsByUser } from "../../store/slices/tripSlice";
import TripTile from "./TripTile";

interface tripListProps {
  navigation: any;
}

const TripList = ({ navigation }: tripListProps) => {
  const dispatch = useDispatch();
  const userID = useSelector((state: any) => state.appState.userID);

  useEffect(() => {
    dispatch(tripsByUser(userID));
  }, []);

  const tripsList = useSelector((state: any) => state.trip.tripsByUser).map(
    (trip: any, index) => {
      return <TripTile key={index} trip={trip} navigation={navigation} />;
    }
  );

  return (
    <ScrollView className="w-full h-auto pt-8">
      {tripsList}
      <View className="h-[200px]"></View>
    </ScrollView>
  );
};

export default TripList;
