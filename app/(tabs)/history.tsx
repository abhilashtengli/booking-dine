import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Booking = {
  id: string;
  email: string;
  slot: string;
  date: string;
  resturant: string;
  guestes: number;
};

export default function History() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };
    fetchUserEmail();
  }, []);
  const fetchBookings = async () => {
    if (userEmail) {
      try {
        const bookingCollection = collection(db, "bookings");
        const bookingQuery = query(
          bookingCollection,
          where("email", "==", userEmail)
        );
        const bookingSnapshot = await getDocs(bookingQuery);
        const bookingList: Booking[] = bookingSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Booking, "id">),
        }));

        setBookings(bookingList);
        console.log("Bookings fetched: ", bookingList);
      } catch (error) {
        console.log("Error fetching bookings: ", error);
        alert("Could not fetch bookings. Please try again later.");
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#2b2b2b]">
        <ActivityIndicator animating color={"fb9b33"} />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#2b2b2b]">
      {userEmail ? (
        <FlatList
          data={bookings}
          onRefresh={fetchBookings}
          refreshing={loading}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="p-4 border border-[#f49b33] my-2 mx-4 rounded-lg">
              <Text className="text-white tracking-wide">
                Date : {new Date(item.date).toDateString()}
              </Text>
              <Text className="text-white tracking-wide">
                Slot : {item.slot}
              </Text>
              {item.guestes && (
                <Text className="text-white tracking-wide">
                  Guest : {item.guestes}
                </Text>
              )}
              {item.resturant && (
                <Text className="text-white tracking-wide">
                  Resturant : {item.resturant}
                </Text>
              )}
              <Text className="text-white tracking-wide">
                Email : {item.email}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View>
          <Text>Please Sign In to view your booking history</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
