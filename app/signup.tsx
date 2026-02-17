import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Heart, Lock, Mail, User, UserCircle } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { FormInput } from "@/components/common/FormInput";
import { usePublicRouteGuard } from "@/hooks/usePublicRouteGuard";
import {
  SignUpFormValues,
  signUpSchema,
} from "@/validation/signup/signup.schema";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  usePublicRouteGuard();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isSubmitted },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "all", // ✅ VALIDATE ON BLUR
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: SignUpFormValues) => {
    console.log("FORM DATA", data);
    // 🔐 API login here
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER */}
          <View className="flex-row justify-between items-center px-6 pt-4 mb-8">
            <View className="flex-row items-center">
              <Heart
                size={22}
                color="#FF0000"
                fill="#FF0000"
                className="mb-1.5"
              />
              <Text className="text-2xl ml-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-[#0047AB] mb-2">
                ForHealth
              </Text>
            </View>
          </View>

          <View className="flex-1 px-8 justify-center">
            <View className="mb-12">
              <Text className="text-4xl font-bold text-[#2563eb] mb-3 text-center">
                Sign Up
              </Text>
              <Text className="text-lg text-gray-600 text-center">
                Create your account to start your health journey
              </Text>
            </View>

            <View className="space-y-4">
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <FormInput
                    label="First Name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    inputRef={ref}
                    placeholder="Enter first name"
                    leftIcon={(color) => <User size={20} color={color} />}
                    error={errors.firstName?.message}
                    trimType="trim"
                  />
                )}
              />

              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <FormInput
                    label="Last Name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    inputRef={ref}
                    placeholder="Enter last name"
                    leftIcon={(color) => <UserCircle size={20} color={color} />}
                    error={errors.lastName?.message}
                    trimType="trim"
                  />
                )}
              />

              {/* EMAIL */}
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <FormInput
                    label="Email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    inputRef={ref}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    leftIcon={(color) => <Mail size={20} color={color} />}
                    error={errors.email?.message}
                    trimType="trim"
                  />
                )}
              />

              {/* PASSWORD */}
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <FormInput
                    label="Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    inputRef={ref}
                    placeholder="Enter your password"
                    isPassword
                    leftIcon={(color) => <Lock size={20} color={color} />}
                    error={errors.password?.message}
                    trimType="trim"
                  />
                )}
              />

              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                activeOpacity={0.8}
                className="mt-6"
              >
                <LinearGradient
                  colors={["#FF0000", "#0047AB"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    paddingVertical: 16,
                    borderRadius: 999,
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}
                  >
                    Sign Up
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View className="mt-8 mb-16">
              <Text className="text-gray-500 text-center">
                Already have an account?{" "}
                <Text
                  className="text-[#2563eb] font-semibold"
                  onPress={() => router.push("/signin")}
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
