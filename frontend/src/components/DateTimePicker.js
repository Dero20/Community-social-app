import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";

export default function DateTimePickerComponent({ date, setDate, label }) {
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View className="mb-4">
      <Text className="text-lg font-semibold text-black">{label}</Text>

      <View className="flex-row justify-between mt-2">
        {/* Date Picker Button */}
        <TouchableOpacity
          onPress={showDatepicker}
          className="flex-1 mr-2 bg-dark-gray rounded-lg p-3 flex-row items-center justify-between"
        >
          <Text className="text-black">{date.toDateString()}</Text>
          <FontAwesome name="calendar" size={20} color="black" />
        </TouchableOpacity>

        {/* Time Picker Button */}
        <TouchableOpacity
          onPress={showTimepicker}
          className="flex-1 ml-2 bg-dark-gray rounded-lg p-3 flex-row items-center justify-between"
        >
          <Text className="text-black">
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <FontAwesome name="clock-o" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
