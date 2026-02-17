import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Heart, Lock, Mail } from "lucide-react-native";
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
import { login } from "@/store/slices/auth/authSlice";
import { AppDispatch } from "@/store/store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import {
  SignInFormValues,
  signInSchema,
} from "../validation/signin/signin.schema";

export default function SignInScreen() {
  usePublicRouteGuard();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: SignInFormValues) => {
    dispatch(
      login({
        email: data.email,
        password: data.password,
      }),
    );
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Logged in successfully 👋",
    });
    router.push("/home");

    console.log("LOGGED IN & STORED");
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
                Welcome Back
              </Text>
              <Text className="text-lg text-gray-600 text-center">
                Sign in to continue your health journey
              </Text>
            </View>

            <View className="space-y-4">
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
                    Sign In
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View className="mt-8 mb-16">
              <Text className="text-gray-500 text-center">
                Don&apos;t have an account?{" "}
                <Text
                  className="text-[#2563eb] font-semibold"
                  onPress={() => router.push("/signup")}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
