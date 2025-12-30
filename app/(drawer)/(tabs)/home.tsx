import { HamburgerButton } from "@/components/common/HamburgerButton";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <LinearGradient colors={["#0a0a0a", "#1a1a2e"]} className="flex-1">
      {/* TOP HEADER */}
      <View className="flex-row items-center px-6 pt-14 pb-4">
        <HamburgerButton />
        <Text className="text-white text-xl font-semibold ml-4">Home</Text>
      </View>

      <ScrollView className="flex-1 px-6">{/* content */}</ScrollView>
    </LinearGradient>
  );
}
