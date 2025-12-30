import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Lock, Mail, User, UserCircle } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";

import { Button } from "@/components/common/Button";
import { FormInput } from "@/components/common/FormInput";
import { usePublicRouteGuard } from "@/hooks/usePublicRouteGuard";
import {
  SignUpFormValues,
  signUpSchema,
} from "@/validation/signup/signup.schema";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
                Sign Up
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

              <Button
                title="Sign Up"
                onPress={handleSubmit(onSubmit)}
                loading={isSubmitting}
                disabled={isSubmitting || (isSubmitted && !isValid)}
              />
            </View>

            <View className="mt-8 mb-16">
              <Text className="text-gray-500 text-center">
                have an account?{" "}
                <Text
                  className="text-blue-500 font-semibold"
                  onPress={() => router.push("/signin")}
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
