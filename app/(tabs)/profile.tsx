import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LogOut, User as UserIcon } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { logout } from '@/store/slices/auth/authSlice';
import { AppDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = async () => {
    await dispatch(logout());
    router.push('/signin');
  };

  return (
    <LinearGradient colors={['#0a0a0a', '#1a1a2e']} className="flex-1">
      <View className="flex-1 px-6 pt-16">
        <Text className="text-4xl font-bold text-white mb-8">Profile</Text>

        <View className="bg-white/5 border border-gray-800 rounded-2xl p-6 mb-6">
          <View className="bg-blue-500/20 p-4 rounded-full self-center mb-4">
            <UserIcon size={48} color="#60a5fa" />
          </View>
          <Text className="text-white text-xl font-semibold text-center mb-2">
            {/* {user?.email} */}
          </Text>
          <Text className="text-gray-400 text-center">Space Explorer</Text>
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
      </View>
    </LinearGradient>
  );
}
