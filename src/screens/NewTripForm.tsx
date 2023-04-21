import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DatePicker from "react-native-datepicker";

import tripAPI from "../store/scripts/tripAPI";
import { tripsByUser } from "../store/slices/tripSlice";

interface tripDetailsProps {
  navigation: any;
}

const NewTripForm = ({ navigation }: tripDetailsProps) => {
  const userID = useSelector((state: any) => state.appState.userID);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStartDate] = useState("01-01-2023");
  const [end_date, setEndDate] = useState("01-01-2023");

  useEffect(() => {}, []);

  const handleSubmit = async () => {
    if (name.length === 0) {
      Alert.alert("Input Validation Error", "Please Input a Trip Name", [
        { text: "OK", onPress: () => {} },
      ]);
      return;
    }
    if (new Date(start_date) <= new Date()) {
      Alert.alert(
        "Input Validation Error",
        "Start Date must be in the future",
        [{ text: "OK", onPress: () => {} }]
      );
      return;
    }
    if (new Date(end_date) <= new Date(start_date)) {
      Alert.alert(
        "Input Validation Error",
        "End Date must fall on or after the Start Date",
        [{ text: "OK", onPress: () => {} }]
      );
      return;
    }

    await tripAPI.createTrip({
      organizer_id: userID,
      name: name,
      start_date: new Date(start_date).getTime() / 1000,
      end_date: new Date(end_date).getTime() / 1000,
      description: description,
    });

    Alert.alert(
      "Trip Posted",
      "A new trip has been created! Please fill out the remaining details and start inviting your friends!",
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  const paddingTop =
    Platform.OS === "android"
      ? (StatusBar.currentHeight ? StatusBar.currentHeight : 6) + 6
      : 12;

  return (
    <SafeAreaView className="flex-1" style={{ paddingTop }}>
      <View
        className={`w-full px-3 pb-4 bg-white rounded-b-[16px] shadow`}
        style={{ paddingTop: paddingTop }}
      >
        <View className="flex-row justify-between items-center">
          <View className="mt-2 mr-4 pl-2 items-center">
            <TouchableOpacity onPress={navigation.goBack} activeOpacity={0.8}>
              <FontAwesome5 name={"angle-left"} size={25} color="#334155" />
            </TouchableOpacity>
          </View>
          <View className="mt-2 mr-4 pl-2 items-center">
            <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8}>
              <FontAwesome5 name={"paper-plane"} size={25} color="#334155" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Animatable.View
        animation="fadeIn"
        duration={500}
        className="flex-1 px-8"
      >
        <ScrollView>
          <Text className="text-2xl font-semibold mt-8">Trip Name</Text>
          <View className="flex-row w-full h-[50px] items-center px-4 rounded-[4px] bg-white border-[1px] border-slate-400">
            <TextInput
              placeholder="Weekend Getaway to Venice..."
              onChangeText={(text) => setName(text)}
              keyboardType="default"
              className="flex-1"
            />
          </View>
          <View className="mt-8 flex-row gap-x-4">
            <View>
              <Text className="text-xl font-semibold">Start Date</Text>
              <DatePicker
                className="w-[175px]"
                date={start_date}
                mode="date"
                placeholder="select date"
                format="MM/DD/YYYY"
                minDate="01-01-2023"
                maxDate="01-01-2030"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    right: 0,
                    top: 2,
                    marginLeft: 0,
                  },
                  dateInput: {
                    borderColor: "gray",
                    alignItems: "flex-start",
                    borderWidth: 0,
                  },
                  placeholderText: {
                    fontSize: 24,
                    color: "gray",
                  },
                  dateText: {
                    fontSize: 24,
                  },
                }}
                onDateChange={(date) => {
                  setStartDate(date);
                }}
              />
            </View>
            <View>
              <Text className="text-xl font-semibold">End Date</Text>
              <DatePicker
                className="w-[175px]"
                date={end_date}
                mode="date"
                placeholder="select date"
                format="MM/DD/YYYY"
                minDate="01-01-2023"
                maxDate="01-01-2030"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    right: 0,
                    top: 2,
                    marginLeft: 0,
                  },
                  dateInput: {
                    borderColor: "gray",
                    alignItems: "flex-start",
                    borderWidth: 0,
                  },
                  placeholderText: {
                    fontSize: 24,
                    color: "gray",
                  },
                  dateText: {
                    fontSize: 24,
                  },
                }}
                onDateChange={(date) => {
                  setEndDate(date);
                }}
              />
            </View>
          </View>
          <Text className="mt-8 text-xl font-semibold">Description</Text>
          <View className="flex-row w-full h-[200px] items-center px-4 rounded-[4px] bg-white border-[1px] border-slate-400">
            <TextInput
              placeholder="3-day 2-night trip to celebrate a new job..."
              onChangeText={(text) => setDescription(text)}
              keyboardType="default"
              multiline={true}
              style={{ paddingTop: 16, height: 200, textAlignVertical: "top" }}
            />
          </View>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default NewTripForm;
