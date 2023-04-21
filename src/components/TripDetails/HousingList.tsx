import { ScrollView } from "react-native";
import React from "react";

import HousingTile from "./HousingTile";
import AddHousingTile from "./AddHousingTile";

const HousingList = ({ trip_id, navigation, housings, isOrganizer }) => {
  const eventsList = housings.map((housing, index) => {
    return (
      <HousingTile key={index} housing={housing} navigation={navigation} />
    );
  });

  return (
    <ScrollView className="w-full h-auto" horizontal={true}>
      {eventsList}
      {isOrganizer && <AddHousingTile tripID={trip_id} />}
    </ScrollView>
  );
};

export default HousingList;
