import { RootState } from "@/store/store";
import { Redirect, type Href } from "expo-router";
import { Activity, Heart, Plus } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function SplashScreen() {
  const loading = false;
  const auth = useSelector((state: RootState) => state.auth);

  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(30)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Main entrance animation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
    ).start();

    // Pulse animation for heart
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  // Wait until splash animation + auth check
  if (loading) return null;

  return (
    <>
      {/* SPLASH UI */}
      <View className="flex-1 items-center justify-center bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <Animated.View
          style={{
            transform: [
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
            opacity: 0.1,
          }}
          className="absolute top-10 right-10"
        >
          <Activity size={120} color="#FF0000" strokeWidth={1} />
        </Animated.View>

        <Animated.View
          style={{
            transform: [
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["360deg", "0deg"],
                }),
              },
            ],
            opacity: 0.08,
          }}
          className="absolute bottom-10 left-10"
        >
          <Plus size={100} color="#0047AB" strokeWidth={1} />
        </Animated.View>

        {/* Central healthcare icon container */}
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
            opacity: opacityAnim,
          }}
          className="items-center"
        >
          {/* Unique heart design with glow effect */}
          <View className="relative items-center justify-center mb-8">
            {/* Glow ring with red theme */}
            <View className="absolute w-36 h-36 rounded-full bg-red-100 opacity-40" />
            <View className="absolute w-32 h-32 rounded-full bg-red-200 opacity-30" />
            <View className="absolute w-28 h-28 rounded-full bg-red-300 opacity-20" />

            {/* Animated heart */}
            <Animated.View
              style={{
                transform: [{ scale: pulseAnim }],
              }}
            >
              <Heart
                size={80}
                color="#FF0000"
                strokeWidth={1.5}
                fill="#FF0000"
              />
            </Animated.View>
          </View>

          {/* Unique app name design */}
          <View className="items-center">
            <Text className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-[#0047AB] mb-2">
              ForHealth
            </Text>
            <View className="bg-gradient-to-r from-[#4682B4] to-[#FF0000] h-0.5 w-24 mb-3" />
            <Text className="text-xl text-[#4682B4] font-medium tracking-wider">
              HALO GP
            </Text>
          </View>
        </Animated.View>

        {/* Unique powered by design */}
        <View className="absolute bottom-12 flex-row items-center">
          <View className="w-2 h-2 rounded-full bg-[#FF0000] mr-2" />
          <Text className="text-sm text-gray-500">
            Powered by <Text className="font-bold text-[#FF0000]">HotDoc</Text>
          </Text>
        </View>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <Animated.View
            key={i}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              transform: [
                {
                  translateY: translateYAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -20 - i * 10],
                  }),
                },
              ],
              opacity: opacityAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.3 - i * 0.05],
              }),
            }}
            className={`absolute w-2 h-2 rounded-full ${i % 2 === 0 ? "bg-[#FF0033]" : "bg-[#4682B4]"}`}
          />
        ))}
      </View>

      {/* REDIRECT AFTER 2 SECONDS */}
      <DelayedRedirect to={auth?.email ? "/home" : "/space"} />
    </>
  );
}

function DelayedRedirect({ to }: { to: Href }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return null;
  return <Redirect href={to} />;
}
