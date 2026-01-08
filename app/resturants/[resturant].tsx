import { Text, Platform, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { CarouselItem, Restaurant, SlotItem } from "@/utils/types";

export default function Resturant() {
  const [resturantData, setResturantData] = useState<Restaurant | null>(null);
  const [carouselData, setCarouselData] = useState<CarouselItem[] | null>(null);
  const [slotsData, setSlotsData] = useState<SlotItem[] | null>(null);
  const { resturant } = useLocalSearchParams();

  const getResturantData = async () => {
    try {
      const restaurantQuery = query(
        collection(db, "restaurants"),
        where("name", "==", resturant)
      );
      const restaurantSnapshot = await getDocs(restaurantQuery);

      if (restaurantSnapshot.empty) {
        console.log("No matching restaurant found");
        return;
      }

      for (const doc of restaurantSnapshot.docs) {
        const resturantData = doc.data() as Restaurant;
        setResturantData(resturantData);

        console.log("R data : ", resturantData);

        //Carousel

        const carouselQuery = query(
          collection(db, "carousel"),
          where("ref_id", "==", doc.ref)
        );

        const carouselSnapshot = await getDocs(carouselQuery);
        if (carouselSnapshot.empty) {
          console.log("No matching carousel found");
          return;
        }

        const carouselImages: CarouselItem[] = carouselSnapshot.docs.map(
          (doc) => doc.data() as CarouselItem
        );

        setCarouselData(carouselImages);
        console.log("carouselImages : ", carouselImages);

        //Slots

        const slotsQuery = query(
          collection(db, "slot"),
          where("ref_id", "==", doc.ref)
        );

        const slotsSnapshot = await getDocs(slotsQuery);
        if (slotsSnapshot.empty) {
          console.log("No matching Slots found");
          return;
        }

        const slots: SlotItem[] = slotsSnapshot.docs.map(
          (doc) => doc.data() as SlotItem
        );

        setSlotsData(slots);
        console.log("Slots : ", slots);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getResturantData();
  }, []);
  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#2b2b2b" },
        Platform.OS === "android" && { paddingBottom: 60 },
        Platform.OS === "ios" && { paddingBottom: 30 },
      ]}
    >
      <ScrollView className="h-full">
        <View className="flex-1 my-2 p-2">
          <Text className="text-xl tracking-wide text-[#f49b33] mr-2 font-semibold">
            {resturant}
          </Text>
        </View>
        <View className="border-b-2 border-[#f49b33]" />
      </ScrollView>
    </SafeAreaView>
  );
}
