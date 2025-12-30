import { HamburgerButton } from "@/components/common/HamburgerButton";
import { logout } from "@/store/slices/auth/authSlice";
import { AppDispatch } from "@/store/store";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { LogOut } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useDispatch } from "react-redux";

export default function SettingsScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = async () => {
    await dispatch(logout());
    router.push("/signin");
  };

  return (
    <LinearGradient colors={["#0a0a0a", "#1a1a2e"]} className="flex-1">
         <View className="flex-row items-center px-6 pt-14 pb-4">
              <HamburgerButton />
              <Text className="text-white text-xl font-semibold ml-4">Settings</Text>
            </View>
        <Pressable
          onPress={handleSignOut}
          className="bg-red-600/20 border border-red-600 py-4 rounded-xl flex-row items-center justify-center active:bg-red-600/30"
        >
          <LogOut size={20} color="#ef4444" />
          <Text className="text-red-500 text-lg font-semibold ml-2">
            Sign Out
          </Text>
        </Pressable>
    </LinearGradient>
  );
}
