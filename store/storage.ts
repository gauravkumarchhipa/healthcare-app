import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Web storage (localStorage)
const webStorage = createWebStorage("local");

// Native storage (AsyncStorage)
const nativeStorage = AsyncStorage;

// Pick correct storage by platform
const storage = Platform.OS === "web" ? webStorage : nativeStorage;

export default storage;
