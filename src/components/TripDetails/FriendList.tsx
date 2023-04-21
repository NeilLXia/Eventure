import React from "react";
import { useSelector } from "react-redux";

import FriendTile from "./FriendTile";

const FriendList = ({ users }) => {
  const userID = useSelector((state) => state.appState.userID);
  const friendsList = users
    .slice()
    .sort((a: any, b: any) => {
      if (a._id === userID) {
        return -1;
      }
      if (b._id === userID) {
        return 1;
      }
      const attendingKey = {
        joining: 10,
        invited: 7,
        requested: 5,
        declined: 3,
        removed: 1,
      };
      return -(attendingKey[a.attending] - attendingKey[b.attending]);
    })
    .map((user, index) => {
      return (
        <FriendTile
          key={index}
          id={user._id}
          first_name={user.first_name}
          last_name={user.last_name}
          photo={user.picture}
          attending={user.attending}
        />
      );
    });

  return friendsList;
};

export default FriendList;
