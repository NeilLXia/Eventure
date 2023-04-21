import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { eventsByUser } from "../../store/slices/eventSlice";
import EventTile from "./EventTile";

interface eventListProps {
  navigation: any;
}

const EventList = ({ navigation }: eventListProps) => {
  const dispatch = useDispatch();
  const userID = useSelector((state: any) => state.appState.userID);

  useEffect(() => {
    dispatch(eventsByUser(userID));
  }, []);

  const eventsList = useSelector((state: any) => state.event.eventsByUser).map(
    (event: any, index: number) => {
      return (
        <EventTile
          name={event.name}
          key={index}
          id={event._id}
          start_date={event.start_date}
          end_date={event.end_date}
          users={event.users}
          attending={event.attending}
          navigation={navigation}
        />
      );
    }
  );

  return <ScrollView className="w-full h-auto">{eventsList}</ScrollView>;
};

export default EventList;
