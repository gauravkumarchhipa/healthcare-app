import { RootState } from "@/store/store";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, type Href } from "expo-router";
import { Rocket } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import { useSelector } from "react-redux";

export default function SplashScreen() {
  const user = false;
  const loading = false;
  const auth = useSelector((state: RootState) => state.auth);

  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Wait until splash animation + auth check
  if (loading) return null;

  return (
    <>
      {/* SPLASH UI */}
      <LinearGradient
        colors={["#0a0a0a", "#1a1a2e", "#16213e"]}
        className="flex-1 items-center justify-center"
      >
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }}
        >
          <Rocket size={96} color="#60a5fa" strokeWidth={1.5} />
        </Animated.View>
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
      </LinearGradient>

      {/* REDIRECT AFTER 2 SECONDS */}
      <DelayedRedirect to={auth?.email ? "/home" : "/space"} />
    </>
  );
}

function DelayedRedirect({ to }: { to: Href }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return null;
  return <Redirect href={to} />;
}
