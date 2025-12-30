// import { RootState } from "@/store/store";
// import { Redirect } from "expo-router";
// import { Drawer } from "expo-router/drawer";
// import { useSelector } from "react-redux";

// export default function DrawerLayout() {
//   const auth = useSelector((state: RootState) => state.auth);

//   if (!auth?.email) {
//     return <Redirect href="/signin" />;
//   }

//   return (
//     <Drawer
//       screenOptions={{
//         headerShown: false,
//         drawerStyle: {
//           backgroundColor: "#0a0a0a",
//           width: 280,
//         },
//       }}
//     >
//       <Drawer.Screen name="(tabs)" />
//     </Drawer>
//   );
// }



import { CustomDrawer } from "@/components/common/CustomDrawer";
import { RootState } from "@/store/store";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useSelector } from "react-redux";

export default function DrawerLayout() {
  const auth = useSelector((state: RootState) => state.auth);

  if (!auth?.email) {
    return <Redirect href="/signin" />;
  }

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#0a0a0a",
          width: 280,
        },
      }}
    >
      {/* Keep tabs as the main screen */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerItemStyle: { display: "none" }, // 🔥 hide "(tabs)" item
        }}
      />
    </Drawer>
  );
}
