import { RootState } from "@/store/store";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { AlertTriangle, Heart } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function NotFoundScreen() {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  const [isLandscape, setIsLandscape] = useState(
    Dimensions.get("window").width > Dimensions.get("window").height,
  );

  useEffect(() => {
    const onChange = ({ window }: { window: any }) => {
      setIsLandscape(window.width > window.height);
    };

    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove();
  }, []);
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

      <View
        className={`flex-1 items-center justify-center px-8 ${isLandscape ? "flex-row" : "flex-col"}`}
      >
        <View
          className={`items-center ${isLandscape ? "mr-12 w-1/3" : "w-full"}`}
        >
          {/* Icon */}
          <View
            className={`bg-red-100 rounded-full mb-6 ${isLandscape ? "p-8" : "p-6"}`}
          >
            <AlertTriangle size={isLandscape ? 64 : 48} color="#ef4444" />
          </View>
        </View>

        <View className={isLandscape ? "flex-1" : "w-full"}>
          {/* Title */}
          <Text
            className={`text-[#2563eb] font-bold mb-2 text-center ${isLandscape ? "text-xl" : "text-3xl"}`}
          >
            Page Not Found
          </Text>

          {/* Subtitle */}
          <Text
            className={`text-gray-600 text-center ${isLandscape ? "text-sm mb-6" : "mb-8"}`}
          >
            The page you are looking for doesn&apos;t exist or was moved.
          </Text>

          <TouchableOpacity
            onPress={() => {
              const destination = auth?.email ? "/home" : "/signin";
              router.replace(destination);
            }}
            activeOpacity={0.8}
            className="w-full"
          >
            <LinearGradient
              colors={["#FF0000", "#0047AB"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingVertical: isLandscape ? 12 : 16,
                borderRadius: 999,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: isLandscape ? 16 : 18,
                  fontWeight: "600",
                }}
              >
                Go to Home
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
