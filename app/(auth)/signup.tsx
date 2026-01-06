import React from "react";
import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
const logo = require("@/assets/images/dinetimelogo.png");
const entryImg = require("@/assets/images/Frame.png");
export default function Signup() {
  const handleSignup = () => {};
  return (
    <SafeAreaView className={`bg-[#2b2b2b]`}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex justify-center items-center ">
          <Image
            className="border-red-600"
            source={logo}
            style={{ width: 220, height: 100 }}
          />
          <Text
            className="text-white tracking-wider text-lg text-center font-bold mb-12"
            style={{
              marginBottom: 12,
            }}
          >
            Let&apos;s get Started!
          </Text>
          <View className="w-5/6">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={""}
              onSubmit={handleSignup}
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
                  <Text className="text-[#f49b33]">Email</Text>
                  <TextInput
                    className="h-11 border mt-3 border-white text-white rounded-md px-2"
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur}
                    value={values.email}
                  />

                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.email}
                    </Text>
                  )}
                  <Text className="text-[#f49b33] mt-3">Password</Text>
                  <TextInput
                    className="h-11 border mt-3 border-white text-white rounded-md px-2"
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur}
                    value={values.password}
                  />

                  {touched.email && errors.password && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.password}
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={() => handleSubmit}
                    className="mt-6 my-2 py-2 bg-[#f49b33] text-neutral-500 rounded-lg "
                  >
                    <Text className="text-xl font-semibold text-center tracking-wider">
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>

          <View>
            {/* <Text className="text-center text-lg font-semibold my-4 text-white">
              or
            </Text> */}

            <TouchableOpacity
              className="flex flex-row justify-center items-center gap-x-2"
              onPress={() => router.push("/(auth)/signin")}
            >
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
