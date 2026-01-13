import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "expo-router";

export default function Profile() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();
  const auth = getAuth();
  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };
    fetchUserEmail();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userEmail");
      setUserEmail(null);
      Alert.alert("Logged out", "You have been logged out successfully.", [
        { text: "OK" },
      ]);
      router.push("/signin");
    } catch (error) {
      console.log("Error during logout: ", error);
      Alert.alert("Logout Failed", "Please try again later.", [{ text: "OK" }]);
    }
  };
  const handleSignup = async () => {
    await signOut(auth);
    await AsyncStorage.removeItem("userEmail");
    setUserEmail(null);
    router.push("/signup");
  };
  return (
    <View className="flex-1 justify-center items-center bg-[#2b2b2b]">
      <Text>User Profile</Text>
      {userEmail ? (
        <>
          <Text className="text-white">Email: {userEmail}</Text>
          <TouchableOpacity
            onPress={() => handleLogout()}
            className="mt-6 my-2 py-2 bg-[#f49b33] text-neutral-500 rounded-lg "
          >
            <Text
              style={{ paddingHorizontal: 12 }}
              className="text-xl  font-semibold text-center tracking-wider"
            >
              Log out
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View>
          <TouchableOpacity
            onPress={() => handleSignup()}
            className="mt-6 my-2 py-2 bg-[#f49b33] text-neutral-500 rounded-lg "
          >
            <Text
              style={{ paddingHorizontal: 12 }}
              className="text-xl font-semibold text-center tracking-wider"
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
