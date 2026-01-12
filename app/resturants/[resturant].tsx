import {
  Text,
  Platform,
  ScrollView,
  View,
  FlatList,
  Dimensions,
  Image,
  Linking,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { CarouselItem, Restaurant, SlotItem } from "@/utils/types";
import { Ionicons } from "@expo/vector-icons";
import DatePickerComponent from "@/components/layout/resturant/DatePickerComponent";
import GuestPickerComponent from "@/components/layout/resturant/GuestPickerComponent";

export default function Resturant() {
  const windowWidth = Dimensions.get("window").width;
  const [resturantData, setResturantData] = useState<Restaurant | null>(null);
  const [carouselData, setCarouselData] = useState<CarouselItem[] | null>(null);
  const [slotsData, setSlotsData] = useState<SlotItem[] | null>(null);
  const { resturant } = useLocalSearchParams();
  const flatlistRef = useRef<FlatList<string>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [date, setDate] = useState(new Date());
  const [selectedNumber, setSelectedNumber] = useState(0);

  const handleLocation = async () => {
    const url = "https://maps.app.goo.gl/nPYQ877t4MgN8Yux8";
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      alert(`Don't know how to open this URL: ${url}`);
    }
  };
  const handleNextImage = () => {
    const carouselLength = carouselData?.[0]?.images.length;

    if (currentIndex < carouselLength! - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatlistRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }

    if (currentIndex === carouselLength! - 1) {
      setCurrentIndex(0);
      flatlistRef.current?.scrollToIndex({ index: 0, animated: true });
    }
  };
  const handlePrevImage = () => {
    const carouselLength = carouselData?.[0]?.images.length;

    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatlistRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    }

    if (currentIndex === 0) {
      const prevIndex = carouselLength! - 1;
      setCurrentIndex(prevIndex);
      flatlistRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    }
  };
  const caraouselItem = ({ item }: { item: string }) => {
    return (
      <View style={{ width: windowWidth - 2 }} className="h-64 relative">
        <View
          style={{
            position: "absolute",
            top: "50%",
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            right: "6%",
          }}
        >
          <Ionicons
            onPress={handleNextImage}
            name="arrow-forward"
            size={18}
            color="white"
          />
        </View>
        <View
          style={{
            position: "absolute",
            top: "50%",
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            left: "2%",
          }}
        >
          <Ionicons
            onPress={handlePrevImage}
            name="arrow-back"
            size={18}
            color="white"
          />
        </View>
        <View
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            left: "50%",
            transform: [{ translateX: -50 }],
            zIndex: 10,
            bottom: 10,
          }}
        >
          {carouselData?.[0]?.images.map((_, index) => (
            <View
              key={index}
              className={`bg-white opacity-15 ${index === currentIndex && "h-2 w-2 opacity-80"} h-2 w-2 p-1 mx-1 rounded-full`}
            />
          ))}
        </View>
        <View>
          <Image
            source={{ uri: item }}
            style={{
              opacity: 0.5,
              backgroundColor: "black",
              marginRight: 20,
              marginLeft: 5,
              borderRadius: 15,
            }}
            className="h-64"
          />
        </View>
      </View>
    );
  };
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

        // console.log("R data : ", resturantData);

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
        // console.log("Slots : ", slots);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getResturantData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        <View className="h-64 max-w-[98%] mx-2 rounded-[25px] mt-8">
          <FlatList
            ref={flatlistRef}
            data={carouselData?.[0]?.images}
            renderItem={caraouselItem}
            horizontal
            scrollEnabled={false}
            style={{ borderRadius: 15 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View className="flex-1 flex-row items-center mt-2 p-2">
          <Ionicons name="location-sharp" size={18} color="#f49b33" />
          <Text className="max-w-[75%] text-white ml-2 tracking-wider">
            {resturantData?.address}
            {"   "}
            <Text
              onPress={handleLocation}
              className="underline flex items-center text-[#f49b33] ml-2 italic font-semibold"
            >
              Get Direction
            </Text>
          </Text>
        </View>
        <View className="flex-1 flex-row items-center mt-2 p-2">
          <Ionicons name="time-sharp" size={18} color="#f49b33" />
          <Text className="max-w-[75%] font-semibold text-white ml-2 tracking-wider">
            {resturantData?.opening} - {resturantData?.closing}
          </Text>
        </View>
        <View className="flex-1 border border-[#f49b33] m-2 p-2 rounded-lg">
          <View className="flex-1 flex-row m-2 p-2 justify-end items-center  rounded-lg ">
            <View className="flex-1 flex-row items-center">
              <Ionicons name="calendar-sharp" size={18} color="#f49b33" />
              <Text className="text-white mx-2 tracking-wider text-base">
                Select booking date
              </Text>
            </View>
            <DatePickerComponent date={date} setDate={setDate} />
          </View>
          <View
            style={{ backgroundColor: "#474747" }}
            className="flex-1 flex-row m-2 p-2 justify-end items-center  rounded-lg border-[#f49b33]"
          >
            <View className="flex-1 flex-row items-center">
              <Ionicons name="people" size={18} color="#f49b33" />
              <Text className="text-white mx-2 tracking-wider text-base">
                Select number of guests
              </Text>
            </View>
            <GuestPickerComponent
              selectedNumber={selectedNumber}
              setSelectedNumber={setSelectedNumber}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
