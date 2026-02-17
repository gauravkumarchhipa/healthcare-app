import { usePublicRouteGuard } from "@/hooks/usePublicRouteGuard";
import { useRouter } from "expo-router";
import {
  Activity,
  ChevronRight,
  Heart,
  Shield,
  Stethoscope,
  Users,
} from "lucide-react-native";
import { useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function SpaceScreen() {
  usePublicRouteGuard();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onboardingData = [
    {
      id: 1,
      title: "All Your Health in One Place",
      description:
        "Access doctors, labs, and pharmacies from one place. No queues, no confusion, everything you need to manage care starts here.",
      icon: Heart,
      color: "#3B82F6",
    },
    {
      id: 2,
      title: "Medicines, Delivered Fast",
      description:
        "Upload prescriptions and get verified medicines delivered to your door. Transparent pricing - no hunting stores or waiting on stock updates.",
      icon: Activity,
      color: "#0047AB",
    },
    {
      id: 3,
      title: "Lab Tests at Your Convenience",
      description:
        "Book lab tests from comfort of your home. Get accurate results and expert consultations without hassle of clinic visits.",
      icon: Stethoscope,
      color: "#4682B4",
    },
    {
      id: 4,
      title: "Secure & Private",
      description:
        "Your health data is protected with advanced encryption and strict privacy controls. Your trust is our priority.",
      icon: Shield,
      color: "#FF0000",
    },
    {
      id: 5,
      title: "Join Our Community",
      description:
        "Become part of a growing health-conscious community. Share experiences and support each other.",
      icon: Users,
      color: "#0047AB",
    },
  ];

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      router.replace("/signin");
    }
  };

  const handleSkip = () => {
    router.replace("/signin");
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    }
  };

  const renderSlide = ({ item }: { item: (typeof onboardingData)[0] }) => {
    const Icon = item.icon;
    return (
      <View className="flex-1 justify-center px-8 bg-white">
        <View className="flex-1 items-center justify-center">
          {/* Icon with glow effect - perfectly centered */}
          <View className="relative items-center justify-center mb-12">
            <View
              className="absolute w-40 h-40 rounded-full opacity-20"
              style={{ backgroundColor: item.color + "33" }}
            />
            <View
              className="absolute w-32 h-32 rounded-full opacity-30"
              style={{ backgroundColor: item.color + "4D" }}
            />
            <View className="w-28 h-28 rounded-full bg-white shadow-xl items-center justify-center">
              <Icon size={72} color={item.color} strokeWidth={1.5} />
            </View>
          </View>

          {/* Title and description - perfectly centered */}
          <View className="items-center w-full">
            <Text className="text-3xl font-bold text-[#2563eb] text-center mb-4">
              {item.title}
            </Text>
            <Text className="text-lg text-gray-600 text-center leading-relaxed max-w-sm mx-auto">
              {item.description}
            </Text>
          </View>
        </View>

        {/* Decorative elements */}
        <View className="absolute top-20 right-10">
          <View
            className="w-4 h-4 rounded-full opacity-20"
            style={{ backgroundColor: item.color }}
          />
        </View>
        <View className="absolute top-32 left-12">
          <View
            className="w-3 h-3 rounded-full opacity-30"
            style={{ backgroundColor: item.color }}
          />
        </View>
        <View className="absolute bottom-40 right-16">
          <View
            className="w-5 h-5 rounded-full opacity-25"
            style={{ backgroundColor: item.color }}
          />
        </View>
        <View className="absolute bottom-32 left-20">
          <View
            className="w-2 h-2 rounded-full opacity-40"
            style={{ backgroundColor: item.color }}
          />
        </View>
      </View>
    );
  };

  const renderPagination = () => (
    <View className="flex-row justify-center items-center mb-8">
      {onboardingData.map((_, index) => (
        <View
          key={index}
          className={`h-2 rounded-full mx-1 transition-all duration-300 ${
            index === currentIndex ? "w-8 bg-[#2563eb]" : "w-2 bg-gray-300"
          }`}
        />
      ))}
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header with Skip button */}
      <View className="flex-row justify-between items-center pt-12 px-6 pb-4">
        <View className="flex-row items-center">
          <Heart
            size={24}
            color="#FF0000"
            strokeWidth={1.5}
            fill="#FF0000"
            className="mr-2"
          />
          <Text className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-[#0047AB]">
            ForHealth
          </Text>
        </View>
        <TouchableOpacity onPress={handleSkip} className="p-2">
          <Text className="text-orange-400 text-lg font-medium">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slider */}
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width,
          );
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Bottom controls */}
      <View className="px-8 pb-8">
        {/* Pagination dots */}
        {renderPagination()}

        {/* Navigation buttons */}
        <View className="flex-row justify-between items-center">
          {/* Previous button */}
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentIndex === 0}
            className={`p-3 rounded-full transition-all duration-200 ${
              currentIndex === 0 ? "bg-gray-200 opacity-50" : "bg-gray-100"
            }`}
          >
            <ChevronRight
              size={24}
              color={currentIndex === 0 ? "#999" : "#666"}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          </TouchableOpacity>

          {/* Next/Get Started button */}
          <TouchableOpacity
            onPress={handleNext}
            className="bg-[#2563eb] px-8 py-4 rounded-full flex-1 ml-4 shadow-lg"
          >
            <Text className="text-white font-semibold text-center text-lg">
              {currentIndex === onboardingData.length - 1
                ? "Get Started"
                : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
