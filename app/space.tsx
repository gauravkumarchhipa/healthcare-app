import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Rocket } from 'lucide-react-native';
import { Button } from '@/components/common/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { usePublicRouteGuard } from '@/hooks/usePublicRouteGuard';

export default function SpaceScreen() {
  usePublicRouteGuard();
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#0a0a0a', '#1a1a2e', '#16213e']}
      className="flex-1"
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 items-center justify-center px-6">
          <View className="items-center mb-12">
            <View className="bg-blue-500/20 p-8 rounded-full mb-6">
              <Rocket size={80} color="#60a5fa" strokeWidth={1.5} />
            </View>
            <Text className="text-5xl font-bold text-white text-center mb-4">
              Space Explorer
            </Text>
            <Text className="text-lg text-gray-400 text-center max-w-sm">
              Journey through the cosmos and discover the wonders of the
              universe
            </Text>
          </View>

          <Button
            title="Get Started"
            onPress={() => router.replace('/signin')}
            className="w-full"
          />
        </View>

        <View className="absolute top-20 left-10">
          <View className="h-3 w-3 rounded-full bg-white opacity-80" />
        </View>
        <View className="absolute top-40 right-16">
          <View className="h-2 w-2 rounded-full bg-white opacity-60" />
        </View>
        <View className="absolute top-1/3 left-1/4">
          <View className="h-1 w-1 rounded-full bg-white opacity-70" />
        </View>
        <View className="absolute bottom-1/4 right-1/3">
          <View className="h-2 w-2 rounded-full bg-white opacity-50" />
        </View>
        <View className="absolute bottom-40 left-20">
          <View className="h-1 w-1 rounded-full bg-white opacity-80" />
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}
