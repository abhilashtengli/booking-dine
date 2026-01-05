import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      className="bg-red-50"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-red-500">HELLO abhi.</Text>
    </View>
  );
}
