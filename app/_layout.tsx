import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { Providers } from "@/store/Providers";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
export default function RootLayout() {
  useFrameworkReady();

  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="light" />
    </Providers>
  );
}
