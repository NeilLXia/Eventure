import { View, Text, TextInput } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

interface attendanceTagProps {
  attending: string;
  isOrganizer: boolean;
}

const AttendanceTag = ({ attending, isOrganizer }: attendanceTagProps) => {
  let tagStyle = "hidden";
  let tagStyle2 = "hidden";
  let textStyle = "text-center text-slate-200 text-xs";
  if (attending === "joining") {
    tagStyle = "w-[60px] rounded-full bg-green-500";
  }
  if (attending === "requested") {
    tagStyle = "w-[70px] rounded-full bg-slate-300";
    textStyle = "text-center text-slate-700 text-xs";
  }
  if (attending === "invited") {
    tagStyle = "w-[60px] rounded-full bg-yellow-500";
    textStyle = "text-center text-slate-700 text-xs";
  }
  if (attending === "declined") {
    tagStyle = "w-[60px] rounded-full bg-red-400";
  }

  if (isOrganizer) {
    tagStyle2 = "w-[70px] rounded-full bg-purple-500";
  }

  return (
    <View className="flex-row gap-1">
      <View className={tagStyle}>
        <Text className={textStyle}>{attending}</Text>
      </View>
      <View className={tagStyle2}>
        <Text className="text-center text-slate-200 text-xs">organizer</Text>
      </View>
    </View>
  );
};

export default AttendanceTag;
