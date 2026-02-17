import { RootState } from "@/store/store";
import { Redirect, type Href } from "expo-router";
import { Activity, Heart, Plus } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function SplashScreen() {
  const loading = false;
  const auth = useSelector((state: RootState) => state.auth);

  const [isLandscape, setIsLandscape] = useState(
    Dimensions.get("window").width > Dimensions.get("window").height,
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setIsLandscape(window.width > window.height);
    });

    return () => subscription?.remove();
  }, []);

  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(30)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
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

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
    ).start();

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

  if (loading) return null;

  return (
    <>
      <View className="flex-1 bg-white relative overflow-hidden">
        {/* Decorative Icons */}
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
            opacity: 0.08,
            position: "absolute",
            top: "10%",
            right: "10%",
          }}
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
            opacity: 0.06,
            position: "absolute",
            bottom: "15%",
            left: "10%",
          }}
        >
          <Plus size={100} color="#0047AB" strokeWidth={1} />
        </Animated.View>

        {/* CENTER CONTENT */}
        <Animated.View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
            opacity: opacityAnim,
          }}
        >
          {/* Heart Glow */}
          <View className="relative items-center justify-center mb-10">
            <View className="absolute w-36 h-36 rounded-full bg-red-100 opacity-40" />
            <View className="absolute w-32 h-32 rounded-full bg-red-200 opacity-30" />
            <View className="absolute w-28 h-28 rounded-full bg-red-300 opacity-20" />

            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Heart size={80} color="#FF0000" fill="#FF0000" />
            </Animated.View>
          </View>

          {/* App Name */}
          <Text className="text-5xl font-bold text-[#1e3a8a] mb-2">
            ForHealth
          </Text>

          <View className="h-0.5 w-24 bg-[#4682B4] mb-3" />

          <Text className="text-[#4682B4] text-xl font-medium tracking-wider">
            HALO GP
          </Text>
        </Animated.View>

        {/* 🔥 POWERED BY - RIGHT ALIGNED */}
        <View
          className={`absolute bottom-12 ${
            isLandscape ? "right-6 items-end" : "left-0 right-0 items-center"
          }`}
        >
          <View className="flex-row items-center">
            <View className="w-2 h-2 rounded-full bg-[#FF0000] mr-2" />
            <Text className="text-gray-500 text-sm text-right">
              Powered by{" "}
              <Text className="font-bold text-[#FF0000]">HotDoc</Text>
            </Text>
          </View>
        </View>
      </View>

      {/* Redirect after delay */}
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
