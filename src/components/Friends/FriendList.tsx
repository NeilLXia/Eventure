import { Text, View, ScrollView } from "react-native";
import React from "react";

import FriendTile from "./FriendTile";

const FriendList = () => {
  const friendsList = [
    {
      id: 1,
      first_name: "John",
      last_name: "Smith",
      photo: "",
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Smith",
      photo: "",
    },
    {
      id: 3,
      first_name: "Bob",
      last_name: "Bobbin",
      photo: "",
    },
    {
      id: 4,
      first_name: "Leo",
      last_name: "Nardo",
      photo: "",
    },
    {
      id: 5,
      first_name: "Edward",
      last_name: "Scissor",
      photo: "",
    },
    {
      id: 6,
      first_name: "Carl",
      last_name: "Mander",
      photo: "",
    },
  ].map((friend) => {
    return (
      <FriendTile
        key={friend.id}
        first_name={friend.first_name}
        last_name={friend.last_name}
        photo={friend.photo}
      />
    );
  });

  return <ScrollView className="w-full h-auto">{friendsList}</ScrollView>;
};

export default FriendList;
