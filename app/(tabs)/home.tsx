import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ListRenderItem,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { restaurants } from "@/store/resturant";
const logo = require("@/assets/images/dinetimelogo.png");
const banner = require("@/assets/images/homeBanner.png");

type Restaurant = {
  name: string;
  seats: number;
  image: string; // URL
  address: string;
  opening: string;
  closing: string;
};

export default function Home() {
  const renderItem: ListRenderItem<Restaurant> = ({ item }) => (
    <TouchableOpacity className="bg-[#5f5f5f] rounded-lg shadow-md flex p-4 mx-4 max-h-64 max-w-xs">
      <Image
        resizeMode="cover"
        source={{ uri: item.image }}
        className="h-28  mb-1 rounded-lg  border-red-500 "
      />
      <Text className="mr-4 font-semibold mb-1 text-lg text-white ">
        {item.name}
      </Text>
      <Text className="mr-4  mb-1 text-sm text-white ">{item.address}</Text>
      <Text className="mr-4  mb-1 text-sm text-white ">
        {item.opening} - Close: {item.closing}
      </Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#2b2b2b" },
        Platform.OS === "android" && { paddingBottom: 60 },
        Platform.OS === "ios" && { paddingBottom: 30 },
      ]}
    >
      <View className="flex items-center">
        <View className="bg-[#5f5f5f] w-11/12 rounded-lg shadow-lg justify-between items-center my-3">
          <View className="flex flex-row   border-red-400 ">
            <Text className={`text-base h-10 pt-1 align-middle text-white`}>
              Welcome to
            </Text>
            <Image className="w-20 h-12" source={logo} />
          </View>
        </View>
      </View>
      <ScrollView stickyHeaderIndices={[0]}>
        <ImageBackground
          resizeMode="cover"
          className="mb-4 w-full h-52 items-center justify-center bg-[#2b2b2b]"
          source={banner}
        >
          <BlurView
            intensity={Platform.OS === "android" ? 100 : 25}
            tint="dark"
            className="w-full p-4 shadow-lg "
          >
            <Text className="text-center text-3xl font-bold text-white px-4">
              Dine with your loved ones
            </Text>
          </BlurView>
        </ImageBackground>
        <View className="p-4 bg-[#2b2b2b] flex-row items-center">
          <Text className="text-3xl text-white mr-2 font-semibold">
            Special Discount %
          </Text>
        </View>
        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ padding: 16 }}
          />
        ) : (
          <ActivityIndicator animating color={"fb9b33"} />
        )}
        <View className="p-4 bg-[#2b2b2b] flex-row items-center">
          <Text className="text-3xl text-[#fb9b33] mr-2 font-semibold">
            Our Resturants
          </Text>
        </View>
        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ padding: 16 }}
          />
        ) : (
          <ActivityIndicator animating color={"fb9b33"} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
