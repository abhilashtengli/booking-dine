import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const GuestPickerComponent = ({
  selectedNumber,
  setSelectedNumber,
}: {
  selectedNumber: number;
  setSelectedNumber: (number: number) => void;
}) => {
  const decrement = () => {
    if (selectedNumber > 1) {
      setSelectedNumber(selectedNumber - 1);
    }
  };
  const increment = () => {
    if (selectedNumber < 12) {
      setSelectedNumber(selectedNumber + 1);
    }
  };
  return (
    <View className="flex flex-row items-center rounded-lg text-white text-base border-[#f49b33]">
      <TouchableOpacity onPress={decrement} className="rounded">
        <Text
          style={{
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: "#f49b33",
          }}
          className="text-white text-lg px-4 border "
        >
          -
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          backgroundColor: "#f49b33",
          borderColor: "#f49b33",
          paddingHorizontal: 12,
        }}
        className="text-white text-lg border "
      >
        {selectedNumber}
      </Text>
      <TouchableOpacity onPress={increment} className="rounded">
        <Text
          style={{
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            borderColor: "#f49b33",
          }}
          className="text-white text-lg px-4 border "
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GuestPickerComponent;
