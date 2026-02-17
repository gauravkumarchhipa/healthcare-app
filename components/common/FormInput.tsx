import { Eye, EyeOff } from "lucide-react-native";
import { ReactNode, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

type TrimType = "trimStart" | "trim";

interface FormInputProps {
  label?: string;
  value: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void; // ✅ ADD
  inputRef?: any; // ✅ ADD
  placeholder?: string;
  error?: string;

  keyboardType?: "default" | "email-address" | "numeric";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";

  leftIcon?: (color: string) => ReactNode;

  /** PASSWORD */
  isPassword?: boolean;

  minLength?: number;
  maxLength?: number;
  onlyNumbers?: boolean;
  trimType?: TrimType;
}

export function FormInput({
  label,
  value,
  onChangeText,
  onBlur,
  inputRef,
  placeholder,
  error,
  keyboardType = "default",
  autoCapitalize = "none",
  leftIcon,

  isPassword = false,

  minLength,
  maxLength,
  onlyNumbers = false,
  trimType = "trimStart",
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👁️ NEW

  const handleChange = (newValue: string) => {
    let text = newValue;

    if (onlyNumbers) {
      text = text.replace(/[^0-9]/g, "");
    }

    if (trimType === "trim") {
      text = text.trim();
    } else {
      text = text.replace(/^\s+/, "").replace(/\s{2,}/g, " ");
    }

    if (maxLength !== undefined) {
      text = text.slice(0, maxLength);
    }

    onChangeText?.(text);
  };

  const borderColor = error
    ? "border-red-500"
    : isFocused
      ? "border-[#2563eb]"
      : "border-gray-300";

  const iconColor = error ? "#f87171" : isFocused ? "#2563eb" : "#9ca3af";

  return (
    <View className="mb-4">
      {label && <Text className="text-gray-600 mb-2 ml-1">{label}</Text>}

      <View
        className={`flex-row items-center rounded-xl border px-4 bg-white ${borderColor}`}
      >
        {leftIcon && <View className="mr-2">{leftIcon(iconColor)}</View>}

        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          secureTextEntry={isPassword && !showPassword}
          keyboardType={onlyNumbers ? "numeric" : keyboardType}
          autoCapitalize={autoCapitalize}
          className="flex-1 py-4 px-2 text-gray-900 text-base"
          onFocus={() => setIsFocused(true)}
          onBlur={onBlur}
        />

        {/* 👁️ Eye icon only for password */}
        {isPassword && (
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOff size={20} color={iconColor} />
            ) : (
              <Eye size={20} color={iconColor} />
            )}
          </Pressable>
        )}
      </View>

      {error && <Text className="text-red-500 text-sm mt-1 ml-1">{error}</Text>}

      {!error &&
        minLength !== undefined &&
        value.length > 0 &&
        value.length < minLength && (
          <Text className="text-red-500 text-sm mt-1 ml-1">
            Minimum {minLength} characters required
          </Text>
        )}
    </View>
  );
}
