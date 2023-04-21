import { View, SafeAreaView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";

import FriendList from "../components/Friends/FriendList";
import FriendHeader from "../components/Friends/FriendHeader";

const Friends = ({ navigation }) => {
  const priorID = useSelector((state: any) => state.appState.priorTab);
  const currentID = useSelector((state: any) => state.appState.currentTab);
  const animation =
    currentID - priorID > 0 ? "fadeInRightBig" : "fadeInLeftBig";

  return (
    <SafeAreaView className="flex-1">
      <Animatable.View animation={animation} duration={1000}>
        <FriendHeader />
        {/* Content */}
        <View className={`h-full w-full bg-slate-200`}>
          <View className={`w-full h-[80%] px-8 py-4 bg-slate-100`}>
            <FriendList />
          </View>
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default Friends;
