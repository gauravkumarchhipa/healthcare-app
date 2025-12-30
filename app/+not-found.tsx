import { Button } from "@/components/common/Button";
import { RootState } from "@/store/store";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { AlertTriangle } from "lucide-react-native";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function NotFoundScreen() {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <LinearGradient
      colors={["#0a0a0a", "#1a1a2e", "#16213e"]}
      className="flex-1 items-center justify-center px-6"
    >
      <View className="items-center">
        {/* Icon */}
        <View className="bg-red-500/20 p-6 rounded-full mb-6">
          <AlertTriangle size={48} color="#ef4444" />
        </View>

        {/* Title */}
        <Text className="text-white text-3xl font-bold mb-2">
          Page Not Found
        </Text>

        {/* Subtitle */}
        <Text className="text-gray-400 text-center mb-8">
          The page you are looking for doesn’t exist or was moved.
        </Text>

        <Button
          title="Go to Home"
          onPress={() => {
            auth?.email ? router.replace("/home") : router.replace("/signin");
          }}
          className="rounded-xl w-full"
        />
      </View>
    </LinearGradient>
  );
}
