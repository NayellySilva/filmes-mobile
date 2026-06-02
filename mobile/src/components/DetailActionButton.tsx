import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { LucideIcon } from "lucide-react-native";
type Props = {
  label: string;
  variant?: "primary" | "outline" | "light";
  icon?: LucideIcon;
  filled?: boolean;
  onPress?: () => void;
};

export default function DetailActionButton({
  label,
  variant = "primary",
  icon: Icon,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "primary" && styles.primary,
        variant === "outline" && styles.outline,
        variant === "light" && styles.light,
      ]}
      onPress={onPress}
    >
      <>
        {Icon && (
          <Icon
            size={18}
            fill={label === "Favoritado" ? "#FFFFFF" : "transparent"}
            color={
              variant === "outline"
                ? "#FF1F3D"
                : variant === "light"
                  ? "#111827"
                  : "#FFFFFF"
            }
          />
        )}

        <Text
          style={[
            styles.text,
            variant === "outline" && styles.outlineText,
            variant === "light" && styles.lightText,
          ]}
        >
          {label}
        </Text>
      </>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    marginBottom: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  primary: {
    backgroundColor: "#FF1F3D",
  },
  outline: {
    borderWidth: 1,
    borderColor: "#FF1F3D",
    backgroundColor: "transparent",
  },
  light: {
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  outlineText: {
    color: "#FF1F3D",
  },
  lightText: {
    color: "#111827",
  },
});
