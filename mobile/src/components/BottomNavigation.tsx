import { Heart, Home, Plus, Search } from "lucide-react-native";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  active?: "home" | "buscar" | "favoritos" | "adicionar";
};

export default function BottomNavigation({ active = "home" }: Props) {
  const items = [
    { key: "home", label: "Início", icon: Home, route: "/" },
    { key: "buscar", label: "Buscar", icon: Search, route: "/buscar" },
    { key: "favoritos", label: "Favoritos", icon: Heart, route: "/favoritos" },
    { key: "adicionar", label: "Adicionar", icon: Plus, route: "/adicionar" },
  ] as const;

  return (
    <View style={styles.container}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.key;

        return (
          <TouchableOpacity
            key={item.key}
            style={styles.item}
            onPress={() => router.push(item.route)}
          >
            <Icon
              size={20}
              color={isActive ? "#FF1F3D" : "#FFFFFF"}
              strokeWidth={1.4}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>
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
    height: 50,
    backgroundColor: "#1E293B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 8,
    paddingTop: 8,
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    flex: 1,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },

  labelActive: {
    color: "#FF1F3D",
  },
});
