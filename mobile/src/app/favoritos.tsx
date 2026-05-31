import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MovieCard from "../components/ui/MovieCard";

const movies = [
  {
    id: "1",
    title: "Michael",
    year: 2026,
    rating: 9.8,
    type: "FILME",
    imageUri:
      "https://ingresso-a.akamaihd.net/prd/img/movie/michael/a10e5eb8-6bef-4612-9288-5eae9dfe0377.webp",
    genre: "Ação",
  },
  {
    id: "2",
    title: "Michael",
    year: 2026,
    rating: 9.8,
    type: "FILME",
    imageUri:
      "https://ingresso-a.akamaihd.net/prd/img/movie/michael/a10e5eb8-6bef-4612-9288-5eae9dfe0377.webp",
    genre: "Animação",
  },
  {
    id: "3",
    title: "Michael",
    year: 2026,
    rating: 9.8,
    type: "FILME",
    imageUri:
      "https://ingresso-a.akamaihd.net/prd/img/movie/michael/a10e5eb8-6bef-4612-9288-5eae9dfe0377.webp",
    genre: "Comédia",
  },
];

const genres = ["Todos", "Ação", "Animação", "Comédia"];

export default function Favoritos() {
  const [selectedGenre, setSelectedGenre] = useState("Todos");

  const filteredMovies =
    selectedGenre === "Todos"
      ? movies
      : movies.filter((movie) => movie.genre === selectedGenre);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft size={20} color="#94A3B8" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Favoritos</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      >
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre}
            style={[
              styles.filterButton,
              selectedGenre === genre && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedGenre(genre)}
          >
            <Text
              style={[
                styles.filterText,
                selectedGenre === genre && styles.filterTextActive,
              ]}
            >
              {genre}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {filteredMovies.map((movie) => (
            <View key={movie.id} style={styles.cardWrapper}>
              <MovieCard movie={movie} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 18,
    marginBottom: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  backText: {
    color: "#94A3B8",
    fontSize: 14,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
  },

  filters: {
    gap: 12,
    paddingBottom: 24,
  },

  filterButton: {
    backgroundColor: "#27272A",
    borderWidth: 1,
    borderColor: "#3F3F46",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },

  filterButtonActive: {
    backgroundColor: "#FF1F3D",
    borderColor: "#FF1F3D",
  },

  filterText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  filterTextActive: {
    color: "#FFFFFF",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 32,
  },

  cardWrapper: {
    width: "47%",
    marginBottom: 18,
  },
});
