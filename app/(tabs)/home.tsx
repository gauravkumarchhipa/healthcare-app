import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, Telescope, Rocket } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#0a0a0a', '#1a1a2e']}
      className="flex-1"
    >
      <ScrollView className="flex-1 px-6 pt-16">
        <View className="mb-8">
          <Text className="text-4xl font-bold text-white mb-2">
            Welcome Aboard
          </Text>
          <Text className="text-lg text-gray-400">
            Explore the universe with us
          </Text>
        </View>

        <View className="space-y-4">
          <View className="bg-white/5 border border-gray-800 rounded-2xl p-6">
            <View className="bg-blue-500/20 p-3 rounded-full self-start mb-4">
              <Sparkles size={28} color="#60a5fa" />
            </View>
            <Text className="text-white text-xl font-semibold mb-2">
              Discover Stars
            </Text>
            <Text className="text-gray-400">
              Explore millions of stars and constellations in our vast universe
            </Text>
          </View>

          <View className="bg-white/5 border border-gray-800 rounded-2xl p-6">
            <View className="bg-purple-500/20 p-3 rounded-full self-start mb-4">
              <Telescope size={28} color="#a78bfa" />
            </View>
            <Text className="text-white text-xl font-semibold mb-2">
              Observe Planets
            </Text>
            <Text className="text-gray-400">
              Get detailed information about planets in our solar system
            </Text>
          </View>

          <View className="bg-white/5 border border-gray-800 rounded-2xl p-6">
            <View className="bg-green-500/20 p-3 rounded-full self-start mb-4">
              <Rocket size={28} color="#34d399" />
            </View>
            <Text className="text-white text-xl font-semibold mb-2">
              Space Missions
            </Text>
            <Text className="text-gray-400">
              Follow the latest space exploration missions and discoveries
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
