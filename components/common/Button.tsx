import { ReactNode } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "back"
  | "icon";

interface ButtonProps {
  title?: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;

  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconOnly?: boolean;
  className?: string;
}

export function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  leftIcon,
  rightIcon,
  iconOnly = false,
  className = "",
}: ButtonProps) {
  // 🔑 Single source of truth
  const isDisabled = !!disabled || !!loading;
  const base = "flex-row items-center justify-center";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 active:bg-blue-700 px-5 py-4 rounded-xl",
    secondary: "bg-gray-700 active:bg-gray-800 px-5 py-4 rounded-xl",
    outline: "border border-gray-600 px-5 py-4 rounded-xl",
    ghost: "bg-transparent px-5 py-4",
    danger: "bg-red-600 active:bg-red-700 px-5 py-4 rounded-xl",

    back: "bg-transparent flex-row items-center",
    icon: "bg-gray-500 active:bg-gray-600 rounded-full h-12 w-12",
  };

  const textVariants: Record<ButtonVariant, string> = {
    primary: "text-white text-lg font-semibold",
    secondary: "text-white text-lg font-semibold",
    outline: "text-white text-lg font-semibold",
    ghost: "text-white text-lg font-semibold",
    danger: "text-white text-lg font-semibold",

    back: "text-white text-lg ml-2",
    icon: "",
  };

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      className={`${base} ${variants[variant]} ${
        isDisabled ? "opacity-60" : ""
      } ${className}`}
    >
      <View className="flex-row items-center space-x-2">
        {loading && <ActivityIndicator color="#ffffff" />}
        {leftIcon && <View>{leftIcon}</View>}

        {!iconOnly && title && (
          <Text className={textVariants[variant]}>{title}</Text>
        )}

        {rightIcon && <View>{rightIcon}</View>}
      </View>
    </Pressable>
  );
}
