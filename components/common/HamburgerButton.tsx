import { useNavigation } from 'expo-router';
import { Menu } from 'lucide-react-native';
import { Pressable } from 'react-native';

export function HamburgerButton() {
  const navigation = useNavigation<any>();

  return (
    <Pressable onPress={() => navigation.openDrawer()}>
      <Menu size={26} color="#ffffff" />
    </Pressable>
  );
}
