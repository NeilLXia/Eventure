import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Dialog from "react-native-dialog";

import eventAPI from "../../store/scripts/eventAPI";
import { setCurrentEvent } from "../../store/slices/appStateSlice";

const AddFriendTile = () => {
  const dispatch = useDispatch();
  const event = useSelector((state: any) => state.appState.currentEvent);
  const eventID = event?._id ?? null;
  const [visible, setVisible] = useState(false);
  const [friendID, setFriendID] = useState("");

  const addFriendHandler = async () => {
    try {
      if (
        !Number(friendID) ||
        typeof Number(friendID) !== "number" ||
        Number(friendID) < 1
      ) {
        Alert.alert("Input Validation Error", "Please provide a valid ID", [
          { text: "OK", onPress: () => {} },
        ]);
        return;
      }
      await eventAPI.changeEventAttending(Number(friendID), eventID, "invited");
      const eventData = await eventAPI.getEvent(eventID);
      await dispatch(setCurrentEvent(eventData[0]));
      setVisible(false);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showDialog = () => {
    setVisible(true);
  };
  return (
    <View
      className={`flex-row items-center w-full h-[60px] rounded-[8px] mb-2 p-2 bg-white shadow`}
    >
      <TouchableOpacity
        className="flex-row w-full px-3 items-center gap-8"
        onPress={showDialog}
      >
        <View className="justify-center">
          <FontAwesome5 name={"plus"} size={25} color="#334155" />
        </View>
        <Text className="text-md text-slate-700">
          Add a Friend to this Trip!
        </Text>
      </TouchableOpacity>

      <View>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Add Friend</Dialog.Title>
          <Dialog.Description>
            Input the User ID of the friend you want to add:
          </Dialog.Description>
          <Dialog.Input
            onChangeText={(text: string) => setFriendID(text)}
          ></Dialog.Input>
          <Dialog.Button label="Add" onPress={addFriendHandler} />
          <Dialog.Button label="Cancel" onPress={handleCancel} />
        </Dialog.Container>
      </View>
    </View>
  );
};

export default AddFriendTile;
