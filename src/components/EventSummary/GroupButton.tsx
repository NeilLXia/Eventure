import { View, Text } from "react-native";
import React from "react";

interface groupProps {
  label: string;
  image: string;
}

const GroupButton = ({ label, image }: groupProps) => {
  return (
    <View className="mr-6 items-center gap-1">
      <View className={`w-14 h-14 rounded-full bg-slate-500`} />
      <Text className="h-4 w-14 text-xs text-slate-700">{label}</Text>
    </View>
  );
};

export default GroupButton;
