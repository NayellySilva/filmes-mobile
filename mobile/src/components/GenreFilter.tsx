import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

const generos = [
  "Todos",
  "Ação",
  "Aventura",
  "Comédia",
  "Drama",
  "Fantasia",
  "Ficção Científica",
];

type Props = {
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
};

export default function GenreFilter({ selectedGenre, onSelectGenre }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {generos.map((item) => {
        const active = item === selectedGenre;
        return (
          <TouchableOpacity
            key={item}
            style={[styles.button, active && styles.buttonActive]}
            onPress={() => onSelectGenre(item)}
            activeOpacity={0.7}
          >
            <Text style={[styles.text, active && styles.textActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
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
