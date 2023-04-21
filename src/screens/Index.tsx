import React, { useEffect } from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import NavigationButton from "../components/modular/NavigationButton";
import Events from "../tabs/EventSummary";
import Friends from "../tabs/Friends";
import Trips from "../tabs/ExploreTrips";

const Tab = createBottomTabNavigator();

const Index = () => {
  const paddingBottom = Platform.OS === "android" ? 0 : 20;

  const navigationList = [
    { id: 1, component: Events, label: "Explore", icon: "calendar-alt" },
    { id: 2, component: Friends, label: "Friends", icon: "user-friends" },
    { id: 3, component: Trips, label: "Trips", icon: "globe-americas" },
    // { id: 4, component: Friends, label: "Messages", icon: "comment-alt" },
    // { id: 5, component: Friends, label: "Profile", icon: "user-circle" },
  ];

  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          height: 80 + paddingBottom,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowRadius: 15,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          elevation: 5,
        },
      }}
    >
      {navigationList.map((navigationItem, index) => {
        return (
          <Tab.Screen
            key={index}
            name={navigationItem.label}
            component={navigationItem.component}
            options={{
              unmountOnBlur: true,
              tabBarShowLabel: false,
              tabBarButton: ({ accessibilityState, onPress }) => (
                <NavigationButton
                  id={navigationItem.id}
                  label={navigationItem.label}
                  icon={navigationItem.icon}
                  focused={accessibilityState?.selected ?? false}
                  onPress={onPress}
                />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default Index;
