import { Stack, usePathname } from "expo-router";
import { View, StyleSheet } from "react-native";
import Menu from "../components/Menu";

export default function Layout() {
  const pathname = usePathname();
  const showMenu = pathname !== "/detalhes";

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      {showMenu && <Menu />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0F",
  },
  content: {
    flex: 1,
  },
});
