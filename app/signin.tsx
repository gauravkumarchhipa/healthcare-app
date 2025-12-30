import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";

import { Button } from "@/components/common/Button";
import { FormInput } from "@/components/common/FormInput";
import { usePublicRouteGuard } from "@/hooks/usePublicRouteGuard";
import { login } from "@/store/slices/auth/authSlice";
import { AppDispatch } from "@/store/store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
    formState: { errors, isSubmitting, isValid, isSubmitted },
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
      })
    );
    router.push("/home");

    console.log("LOGGED IN & STORED");
  };

  return (
    <LinearGradient
      colors={["#0a0a0a", "#1a1a2e", "#16213e"]}
      className="flex-1"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 justify-center">
            <View className="mb-12 mt-16">
              <Text className="text-4xl font-bold text-white mb-3 text-center">
                Welcome Back
              </Text>
              <Text className="text-lg text-gray-400 text-center">
                Sign in to continue your space journey
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

              <Button
                title="Sign In"
                onPress={handleSubmit(onSubmit)}
                loading={isSubmitting}
                disabled={isSubmitting || (isSubmitted && !isValid)}
              />
            </View>

            <View className="mt-8 mb-16">
              <Text className="text-gray-500 text-center">
                Don't have an account?{" "}
                <Text
                  className="text-blue-500 font-semibold"
                  onPress={() => router.push("/signup")}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
