import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";

import { setCurrentTab, setPriorTab } from "../../store/slices/appStateSlice";

interface navigationProps {
  id: number;
  label: string;
  icon: string;
  focused: boolean;
  onPress: any;
}

const NavigationButton = ({
  id,
  label,
  icon,
  focused,
  onPress,
}: navigationProps) => {
  const dispatch = useDispatch();
  const priorID = useSelector((state: any) => state.appState.currentTab);

  const navigateHandler = () => {
    dispatch(setPriorTab(priorID));
    dispatch(setCurrentTab(id));
    onPress();
  };

  let focusedCircle = "";
  if (focused) {
    focusedCircle = "bg-slate-200";
  }
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: 0.8 }, 1: { scale: 1 } });
    } else {
      viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0.8 } });
    }
  }, [focused]);

  return (
    <Animatable.View
      className={`flex-1 justify-center items-center`}
      ref={viewRef}
      duration={500}
    >
      <TouchableOpacity onPress={navigateHandler} activeOpacity={0.8}>
        <View
          className={`w-14 h-14 justify-center items-center rounded-full ${focusedCircle}`}
        >
          <FontAwesome5 name={icon} size={25} color="#334155" />
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default NavigationButton;
