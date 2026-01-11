import {
  Text,
  Platform,
  ScrollView,
  View,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { CarouselItem, Restaurant, SlotItem } from "@/utils/types";
import { Ionicons } from "@expo/vector-icons";

export default function Resturant() {
  const windowWidth = Dimensions.get("window").width;
  const [resturantData, setResturantData] = useState<Restaurant | null>(null);
  const [carouselData, setCarouselData] = useState<CarouselItem[] | null>(null);
  const [slotsData, setSlotsData] = useState<SlotItem[] | null>(null);
  const { resturant } = useLocalSearchParams();
  const flatlistRef = useRef<FlatList<string>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      </ScrollView>
    </SafeAreaView>
  );
}
