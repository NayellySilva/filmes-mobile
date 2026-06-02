import { useRouter, usePathname } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Home, Search, Heart, Plus } from "lucide-react-native";

const menuItems = [
  { label: "Início", icon: Home, route: "/" },
  { label: "Buscar", icon: Search, route: "/buscar" },
  { label: "Favoritos", icon: Heart, route: "/favoritos" },
  { label: "Adicionar", icon: Plus, route: "/adicionar" },
];

export default function Menu() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {menuItems.map((item) => {
        const active = pathname === item.route;
        const Icon = item.icon;
        return (
          <TouchableOpacity
            key={item.label}
            style={styles.item}
            onPress={() => router.replace(item.route as any)}
            activeOpacity={0.7}
          >
            <Icon
              size={22}
              color={active ? "#FF1F3D" : "#71717A"}
              fill={active && item.label === "Favoritos" ? "#FF1F3D" : "transparent"}
            />
            <Text style={[styles.label, active && styles.labelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#13131A",
    borderTopWidth: 1,
    borderTopColor: "#27272A",
    paddingBottom: 28,
    paddingTop: 12,
    paddingHorizontal: 8,
  },

  item: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },

  label: {
    fontSize: 11,
    fontWeight: "500",
    color: "#71717A",
  },

  labelActive: {
    color: "#FF1F3D",
    fontWeight: "700",
  },
});