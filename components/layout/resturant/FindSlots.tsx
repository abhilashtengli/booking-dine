import { db } from "@/config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

type FindSlotsProps = {
  date: Date;
  selectedNumber: number;
  resturant: string;
  slots: string[] | null;
  selectedSlot: string | null;
  setSelectedSlot: React.Dispatch<React.SetStateAction<string | null>>;
};

const FindSlots: React.FC<FindSlotsProps> = ({
  date,
  resturant,
  selectedNumber,
  slots,
  selectedSlot,
  setSelectedSlot,
}) => {
  const [slotVisible, setSlotVisible] = useState(false);

  const handleBooking = async () => {
    const userEmail = await AsyncStorage.getItem("userEmail");

    if (userEmail) {
      try {
        if (selectedNumber <= 0) {
          Alert.alert(
            "Invalid Number of Guests",
            "Please select at least one guest.",
            [{ text: "OK" }]
          );
          return;
        }
        await addDoc(collection(db, "bookings"), {
          email: userEmail,
          slot: selectedSlot,
          date: date.toISOString(),
          resturant: resturant,
          guestes: selectedNumber,
        });

        alert("Booking Successful!");
      } catch (error: any) {
        console.log("Error during booking: ", error);
        Alert.alert("Booking Failed!", "Please try again later.", [
          { text: "OK" },
        ]);
      }
    }
  };
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
            <TouchableOpacity onPress={handleBooking}>
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
