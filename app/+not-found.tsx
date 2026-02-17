import { RootState } from "@/store/store";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { AlertTriangle, Heart } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function NotFoundScreen() {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <View className="flex-row justify-between items-center px-6 pt-4 mb-8">
        <View className="flex-row items-center">
          <Heart size={22} color="#FF0000" fill="#FF0000" className="mb-1.5" />
          <Text className="text-2xl ml-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-[#0047AB] mb-2">
            ForHealth
          </Text>
        </View>
      </View>

      <View className="flex-1 items-center justify-center px-8">
        <View className="items-center">
          {/* Icon */}
          <View className="bg-red-100 p-6 rounded-full mb-6">
            <AlertTriangle size={48} color="#ef4444" />
          </View>

          {/* Title */}
          <Text className="text-[#2563eb] text-3xl font-bold mb-2 text-center">
            Page Not Found
          </Text>

          {/* Subtitle */}
          <Text className="text-gray-600 text-center mb-8">
            The page you are looking for doesn't exist or was moved.
          </Text>

          <TouchableOpacity
            onPress={() => {
              auth?.email ? router.replace("/home") : router.replace("/signin");
            }}
            activeOpacity={0.8}
            className="w-full"
          >
            <LinearGradient
              colors={["#FF0000", "#0047AB"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingVertical: 16,
                borderRadius: 999,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                Go to Home
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
