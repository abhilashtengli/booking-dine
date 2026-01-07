import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
const logo = require("@/assets/images/dinetimelogo.png");
const banner = require("@/assets/images/homeBanner.png");

export default function Home() {
  return (
    <SafeAreaView style={{ backgroundColor: "#2b2b2b" }}>
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
      <ScrollView>
        <ImageBackground
          resizeMode="cover"
          className="my-4 w-full h-52 items-center justify-center"
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
      </ScrollView>
    </SafeAreaView>
  );
}
