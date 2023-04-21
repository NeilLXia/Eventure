import { ScrollView } from "react-native";
import React from "react";

import EventTile from "./EventTile";
import AddEventTile from "./AddEventTile";
import { useSelector } from "react-redux";

const EventList = ({ navigation, events, isOrganizer }) => {
  const trip_id = useSelector((state) => state.appState.currentTrip)._id;
  const eventsList = events.map((event, index) => {
    return <EventTile key={index} id={event._id} navigation={navigation} />;
  });

  return (
    <ScrollView className="w-full h-auto" horizontal={true}>
      {eventsList}
      {isOrganizer && <AddEventTile navigation={navigation} tripID={trip_id} />}
    </ScrollView>
  );
};

export default EventList;
