import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

const generos = ["Todos", "Ação", "Animação", "Comédia"];

export default function GenreFilter() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {generos.map((item, index) => (
        <TouchableOpacity
          key={item}
          style={[styles.button, index === 0 && styles.buttonActive]}
        >
          <Text style={[styles.text, index === 0 && styles.textActive]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    gap: 12,
  },

  button: {
    backgroundColor: "#27272A",
    borderWidth: 1,
    borderColor: "#3F3F46",

    paddingVertical: 10,
    paddingHorizontal: 20,

    borderRadius: 999,
  },

  buttonActive: {
    backgroundColor: "#FF1F3D",
    borderColor: "#FF1F3D",
  },

  text: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  textActive: {
    color: "#FFFFFF",
  },
});
