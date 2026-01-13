import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const logo = require("@/assets/images/dinetimelogo.png");
const entryImg = require("@/assets/images/Frame.png");
export default function Index() {
  const handleGuest = async () => {
    await AsyncStorage.setItem("isGuest", "true");
    router.push("/home");
  };
  return (
    <SafeAreaView className={`bg-[#2b2b2b]`}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex justify-center items-center ">
          <Image source={logo} style={{ width: 300, height: 300 }} />
          <View className="w-3/4">
            <TouchableOpacity
              onPress={() => router.push("/(auth)/signup")}
              className=" my-2 py-2 bg-[#f49b33] text-neutral-500 rounded-lg "
            >
              <Text className="text-xl font-semibold text-center tracking-wider">
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleGuest()}
              className=" my-2 py-2 bg-[#2b2b2b]  border border-[#f49b33] rounded-lg "
            >
              <Text className="text-xl text-[#f49b33]  text-center tracking-wider">
                Guest User
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-center text-lg font-semibold my-4 text-white">
              or
            </Text>

            <TouchableOpacity
              className="flex flex-row justify-center items-center gap-x-2"
              onPress={() => router.push("/(auth)/signin")}
            >
              {" "}
              {/* /signin */}
              <Text className="text-white font-semibold">Already an User?</Text>
              <Text className="text-base font-semibold underline text-[#f49b33] ">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1">
          <Image
            source={entryImg}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
