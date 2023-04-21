import { View, SafeAreaView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";

import TripHeader from "../components/ExploreTrips/TripHeader";
import TripList from "../components/ExploreTrips/TripList";

interface exploreTripsProps {
  navigation: any;
}

const ExploreTrips = ({ navigation }: exploreTripsProps) => {
  const priorID = useSelector((state: any) => state.appState.priorTab);
  const currentID = useSelector((state: any) => state.appState.currentTab);
  const animation =
    currentID - priorID > 0 ? "fadeInRightBig" : "fadeInLeftBig";

  return (
    <SafeAreaView className="flex-1">
      <Animatable.View animation={animation} duration={1000} className="flex-1">
        <TripHeader navigation={navigation} />
        {/* Content */}
        <View className={`px-8 bg-slate-100`}>
          <TripList navigation={navigation} />
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default ExploreTrips;
