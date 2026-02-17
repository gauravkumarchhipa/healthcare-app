import { usePublicRouteGuard } from "@/hooks/usePublicRouteGuard";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Activity,
  Heart,
  Shield,
  Stethoscope,
  Users,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function SpaceScreen() {
  usePublicRouteGuard();
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const onboardingData = [
    {
      id: 1,
      title: "All Your Health in One Place",
      description: "Access doctors, labs, and pharmacies from one place.",
      icon: Heart,
      color: "#FF0000",
    },
    {
      id: 2,
      title: "Medicines, Delivered Fast",
      description:
        "Upload prescriptions and get medicines delivered to your door.",
      icon: Activity,
      color: "#2563EB",
    },
    {
      id: 3,
      title: "Lab Tests at Your Convenience",
      description: "Book lab tests and get accurate results easily.",
      icon: Stethoscope,
      color: "#1D4ED8",
    },
    {
      id: 4,
      title: "Secure & Private",
      description: "Your health data is protected and encrypted.",
      icon: Shield,
      color: "#DC2626",
    },
    {
      id: 5,
      title: "Join Our Community",
      description: "Become part of a growing health-conscious community.",
      icon: Users,
      color: "#1E40AF",
    },
  ];

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;

      flatListRef.current?.scrollToOffset({
        offset: width * nextIndex,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    } else {
      router.replace("/signin");
    }
  };

  const handleSkip = () => {
    router.replace("/signin");
  };

  const renderSlide = ({ item }: { item: (typeof onboardingData)[0] }) => {
    const Icon = item.icon;

    return (
      <View
        style={{ width }}
        className={`flex-1 justify-center items-center px-8 ${isLandscape ? "flex-row" : "flex-col"}`}
      >
        {/* ICON */}
        <View
          className={`items-center justify-center ${isLandscape ? "mr-8 w-1/3" : "mb-12 w-full"}`}
        >
          <View
            style={{ backgroundColor: item.color + "20" }}
            className={`absolute rounded-full ${isLandscape ? "w-32 h-32" : "w-44 h-44"}`}
          />
          <View
            style={{ backgroundColor: item.color + "35" }}
            className={`absolute rounded-full ${isLandscape ? "w-28 h-28" : "w-36 h-36"}`}
          />
          <View
            className={`bg-white rounded-full shadow-xl items-center justify-center ${isLandscape ? "w-24 h-24" : "w-28 h-28"}`}
          >
            <Icon
              size={isLandscape ? 50 : 70}
              color={item.color}
              strokeWidth={1.5}
            />
          </View>
        </View>

        {/* TEXT CONTENT */}
        <View className={isLandscape ? "flex-1" : "w-full"}>
          {/* TITLE */}
          <Text
            className={`font-bold text-[#2563eb] text-center ${isLandscape ? "text-xl mb-2" : "text-3xl mb-4"}`}
          >
            {item.title}
          </Text>

          {/* DESCRIPTION */}
          <Text
            className={`text-gray-600 text-center leading-relaxed px-4 ${isLandscape ? "text-sm" : "text-lg"}`}
          >
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  const renderPagination = () => (
    <View className="flex-row justify-center items-center mb-6">
      {onboardingData.map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setCurrentIndex(index);
            flatListRef.current?.scrollToOffset({
              offset: width * index,
              animated: true,
            });
          }}
          className={`h-2 rounded-full mx-1 ${
            index === currentIndex ? "w-8 bg-[#2563eb]" : "w-2 bg-gray-300"
          }`}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <View className="absolute top-0 left-0 right-0 z-10 flex-row justify-between items-center px-6 pt-4">
        <View className="flex-row items-center">
          <Heart size={22} color="#FF0000" fill="#FF0000" className="mb-1.5" />
          <Text className="text-2xl ml-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-[#0047AB] mb-2">
            ForHealth
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleSkip}
          className="bg-orange-50 backdrop-blur-xl rounded-lg px-3 py-1"
        >
          <Text className="text-orange-500 text-lg font-semibold">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* SLIDER WRAPPED IN FLEX-1 */}
      <View className="flex-1">
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={renderSlide}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingTop: isLandscape ? 120 : 150,
            paddingBottom: isLandscape ? 80 : 100,
          }}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
      </View>

      {/* BOTTOM */}
      <View className={`px-8 ${isLandscape ? "pb-4" : "pb-8"}`}>
        {renderPagination()}

        <TouchableOpacity onPress={handleNext} activeOpacity={0.8}>
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
              {currentIndex === onboardingData.length - 1
                ? "Get Started"
                : "Next"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
