import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

type FindSlotsProps = {
  date: Date;
  selectedNumber: number;
  slots: string[] | null;
  selectedSlot: string | null;
  setSelectedSlot: React.Dispatch<React.SetStateAction<string | null>>;
};

const FindSlots: React.FC<FindSlotsProps> = ({
  date,
  selectedNumber,
  slots,
  selectedSlot,
  setSelectedSlot,
}) => {
  const [slotVisible, setSlotVisible] = useState(false);
  const handleSlotPress = (slot: string) => {
    let prevSlot = selectedSlot;
    if (prevSlot === slot) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
    }
  };
  return (
    <View className="flex-1">
      <View className={`flex-1 ${selectedSlot != null && "flex-row"}`}></View>
      <View className="flex flex-row">
        <View className="flex-1">
          <TouchableOpacity onPress={() => setSlotVisible(!slotVisible)}>
            <Text className="text-center text-lg font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg">
              Find Slots
            </Text>
          </TouchableOpacity>
        </View>

        {selectedSlot != null && (
          <View className="flex-1">
            <TouchableOpacity>
              <Text className="text-white text-center text-lg font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg">
                Book Slots
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {slotVisible && (
        <View
          style={{
            backgroundColor: "#474747",
            gap: 10,
            flexWrap: "wrap",
          }}
          className="flex-wrap flex-row mx-2 p-2 bg-[#474747] rounded-lg"
        >
          {slots?.map((slot, index) => (
            <TouchableOpacity
              style={{
                opacity: selectedSlot && selectedSlot !== slot ? 0.5 : 1,
              }}
              key={index}
              className={`m-2 p-4  bg-[#f49b33] rounded-lg justify-center ${selectedSlot !== null && selectedSlot !== slot ? "opacity-50" : ""}`}
              onPress={() => handleSlotPress(slot)}
              disabled={
                selectedSlot === slot || selectedSlot == null ? false : true
              }
            >
              <Text className="font-semibold text-white">{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default FindSlots;
