import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Dialog from "react-native-dialog";
import validateURL from "../../scripts/validateURL";

import tripAPI from "../../store/scripts/tripAPI";
import { tripsByUser } from "../../store/slices/tripSlice";

interface addHousingTileProps {
  tripID: number;
}

const AddHousingTile = ({ tripID }: addHousingTileProps) => {
  const dispatch = useDispatch();
  const userID = useSelector((state: any) => state.appState.userID);
  const [visible, setVisible] = useState(false);
  const [housingName, setHousingName] = useState("");
  const [housingDescription, setHousingDescription] = useState("");
  const [housingLink, setHousingLink] = useState("");
  const [housingPhoto, setHousingPhoto] = useState("");

  const addHousingHandler = async () => {
    try {
      const validLink = await validateURL(housingLink);
      const validPhoto = await validateURL(housingPhoto);
      if (housingName.length === 0) {
        Alert.alert(
          "Input Validation Error",
          "Please provide a name for the accommodations",
          [{ text: "OK", onPress: () => {} }]
        );
        return;
      }
      if (housingLink.length === 0 || !validLink) {
        Alert.alert(
          "Input Validation Error",
          "Please provide a valid link to the accommodations.",
          [{ text: "OK", onPress: () => {} }]
        );
        return;
      }
      if (housingPhoto.length > 0 && !validPhoto) {
        Alert.alert(
          "Input Validation Error",
          "The image link provided is not valid.",
          [{ text: "OK", onPress: () => {} }]
        );
        return;
      }
      await tripAPI.addHousing(tripID, {
        name: housingName,
        photo: housingPhoto,
        link: housingLink,
        description: housingDescription,
      });
      await dispatch(tripsByUser(userID));
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
    <View>
      <TouchableOpacity
        className={`flex-col w-[200px] h-auto rounded-[8px] mr-6 my-2 py-2 bg-white shadow items-center`}
        onPress={showDialog}
      >
        <View className="h-[100px] w-[100px] mb-2 bg-neutral-300 justify-center items-center rounded-full">
          <FontAwesome5 name={"plus"} size={60} color="#334155" />
        </View>
        <Text className="text-md text-slate-700 text-center">
          Add Housing Details!
        </Text>
      </TouchableOpacity>

      <View>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Add Housing Information</Dialog.Title>
          <Dialog.Input
            label="Provide a name for the booking (required):"
            onChangeText={(text: string) => setHousingName(text)}
          ></Dialog.Input>
          <Dialog.Input
            label="Paste the link of the booked accommodations (required):"
            onChangeText={(text: string) => setHousingLink(text)}
          ></Dialog.Input>
          <Dialog.Input
            label="Paste a link to one of the accommodation photos:"
            onChangeText={(text: string) => setHousingPhoto(text)}
          ></Dialog.Input>
          <Dialog.Input
            label="Provide a brief description:"
            onChangeText={(text: string) => setHousingDescription(text)}
          ></Dialog.Input>
          <Dialog.Button label="Add" onPress={addHousingHandler} />
          <Dialog.Button label="Cancel" onPress={handleCancel} />
        </Dialog.Container>
      </View>
    </View>
  );
};

export default AddHousingTile;
