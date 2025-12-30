import { logout } from "@/store/slices/auth/authSlice";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Home, LogOut, Settings, User } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useDispatch } from "react-redux";

export function CustomDrawer(props: any) {
  const router = useRouter();
  const dispatch = useDispatch();

  const Item = ({
    label,
    icon,
    onPress,
  }: {
    label: string;
    icon: React.ReactNode;
    onPress: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      className="flex-row items-center px-5 py-4 rounded-xl mb-2"
    >
      {icon}
      <Text className="text-white text-base ml-4">{label}</Text>
    </Pressable>
  );

  return (
    <DrawerContentScrollView {...props} className="bg-[#0a0a0a]">
      <View className="px-4 pt-6">
        <Item
          label="Home"
          icon={<Home size={20} color="#60a5fa" />}
          onPress={() => router.push("/home")}
        />

        <Item
          label="Profile"
          icon={<User size={20} color="#60a5fa" />}
          onPress={() => router.push("/profile")}
        />

        <Item
          label="Settings"
          icon={<Settings size={20} color="#60a5fa" />}
          onPress={() => router.push("/settings")}
        />

        <View className="mt-6 border-t border-gray-800 pt-4">
          <Item
            label="Logout"
            icon={<LogOut size={20} color="#f87171" />}
            onPress={() => {
              dispatch(logout());
              router.replace("/signin");
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
