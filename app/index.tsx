import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View
      className=""
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-red-800">HELLOh abhi.</Text>
      <TouchableOpacity onPress={() => router.push("/home")}>
        <Text>Change route</Text>
      </TouchableOpacity>
    </View>
  );
}
