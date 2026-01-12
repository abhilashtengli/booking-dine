import { Platform, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
const DatePickerComponent = ({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) => {
  const [show, setShow] = useState(false);

  const handlePress = () => {
    setShow(!show);
  };
  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <View className="flex flex-row">
      <TouchableOpacity onPress={handlePress}>
        {Platform.OS === "android" && (
          <View
            style={{ backgroundColor: "#474747", paddingHorizontal: 20 }}
            className="py-2 flex flex-row   rounded-lg"
          >
            <Text className="text-white font-semibold tracking-wider ">
              {date.toLocaleDateString()}
            </Text>
          </View>
        )}
        {Platform.OS === "android" && show && (
          <DateTimePicker
            accentColor="#f49b33"
            textColor="#f49b33"
            value={date}
            mode="date"
            onChange={onChange}
            display="default"
            minimumDate={new Date()}
            maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          />
        )}
        {Platform.OS === "ios" && (
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
