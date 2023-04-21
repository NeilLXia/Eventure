import { View, SafeAreaView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import HeaderBar from "../components/EventSummary/HeaderBar";
import EventList from "../components/EventSummary/EventList";
import * as Animatable from "react-native-animatable";

interface eventSummaryProps {
  navigation: any;
}

const EventSummary = ({ navigation }: eventSummaryProps) => {
  const priorID = useSelector((state: any) => state.appState.priorTab);
  const currentID = useSelector((state: any) => state.appState.currentTab);
  const animation =
    currentID - priorID > 0 ? "fadeInRightBig" : "fadeInLeftBig";

  return (
    <SafeAreaView className="flex-1">
      <Animatable.View animation={animation} duration={1000}>
        <HeaderBar />
        {/* Content */}
        <View className={`h-full w-full bg-slate-200`}>
          <View className={`w-full h-[62%] px-8 py-2 bg-slate-100`}>
            <EventList navigation={navigation} />
          </View>
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default EventSummary;
