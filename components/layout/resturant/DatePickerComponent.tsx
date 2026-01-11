import { Platform, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
const DatePickerComponent = () => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const handlePress = () => {
    setShow(!show);
  };

  return (
    <View className="flex flex-row">
      <TouchableOpacity onPress={handlePress}>
        {Platform.OS === "android" && (
          <View className="ml-1  px-2 py-1 flex flex-row  bg-black/30">
            <Text className="-ml-1">
              <Ionicons name="calendar-sharp" size={18} color="#f49b33" />
            </Text>
            <Text className="ml-2 text-white font-semibold tracking-wider ">
              Book seat : {date.toLocaleDateString()} 
            </Text>
          </View>
        )}
        {Platform.OS === "android" && show && (
          <DateTimePicker
            accentColor="#f49b33"
            textColor="#f49b33"
            value={date}
            mode="date"
            display="default"
            minimumDate={new Date()}
            maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          />
        )}
        {Platform.OS === "android" && (
          <DateTimePicker
            accentColor="#f49b33"
            textColor="#f49b33"
            value={date}
            mode="date"
            display="default"
            minimumDate={new Date()}
            maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DatePickerComponent;
