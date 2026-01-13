import { db } from "@/config/firebaseConfig";
import { guestValidationSchema } from "@/utils/guestformSchema";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection } from "firebase/firestore";
import { Formik } from "formik";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";

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
  const [modalVisible, setModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const handleBooking = async () => {
    const userEmail = await AsyncStorage.getItem("userEmail");
    const guestStatus = await AsyncStorage.getItem("isGuest");

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
    } else if (guestStatus === "true") {
      setFormVisible(true);
      setModalVisible(true);
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

  const handleFormSubmit = async (values: {
    phoneNumber: any;
    fullName: any;
  }) => {
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
        phoneNumber: values.phoneNumber,
        fullName: values.fullName,
        slot: selectedSlot,
        date: date.toISOString(),
        resturant: resturant,
        guestes: selectedNumber,
      });
      setModalVisible(false);
      alert("Booking Successful!");
    } catch (error: any) {
      console.log("Error during booking: ", error);
      Alert.alert("Booking Failed!", "Please try again later.", [
        { text: "OK" },
      ]);
    }
  };

  const handleModal = () => {
    setModalVisible(false);
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

      <Modal
        style={{
          flex: 1,
          justifyContent: "flex-end",
          margin: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View
          style={{ backgroundColor: "#00000080" }}
          className="flex-1 justify-center bg-[#00000080]  border-red-500"
        >
          <View className="bg-[#474747] mx-4 pb-6 p-4 rounded-lg">
            {formVisible && (
              <Formik
                initialValues={{ fullName: "", phoneNumber: "" }}
                validationSchema={guestValidationSchema}
                onSubmit={handleFormSubmit}
                validateOnMount
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View className="w-full  border-red-800 p-3">
                    <View className=" flex flex-row justify-end">
                      <Ionicons
                        name="close-sharp"
                        size={24}
                        color="#f49b33"
                        onPress={handleModal}
                      />
                    </View>
                    <Text className="text-[#f49b33]">Full Name</Text>
                    <TextInput
                      className="h-11 border mt-3 border-white text-white rounded-md px-2"
                      onChangeText={handleChange("fullName")}
                      onBlur={handleBlur("fullName")}
                      value={values.fullName}
                    />

                    {touched.fullName && errors.fullName && (
                      <Text className="text-red-500 text-sm mb-2 mt-2">
                        {errors.fullName}
                      </Text>
                    )}
                    <Text className="text-[#f49b33] mt-3">Phone Number</Text>
                    <TextInput
                      className="h-11 border mt-3 border-white text-white rounded-md px-2"
                      onChangeText={handleChange("phoneNumber")}
                      onBlur={handleBlur("phoneNumber")}
                      value={values.phoneNumber}
                    />

                    {touched.phoneNumber && errors.phoneNumber && (
                      <Text className="text-red-500 text-sm mb-2 mt-2">
                        {errors.phoneNumber}
                      </Text>
                    )}
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      className="mt-6 my-2 py-2 bg-[#f49b33] text-neutral-500 rounded-lg "
                    >
                      <Text className="text-xl font-semibold text-center tracking-wider">
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FindSlots;
