import { StyleSheet, View, Text } from "react-native";
import MovieCard from "./MovieCard";

type Movie = {
  id: string;
  title: string;
  year: number;
  rating: number;
  type: string;
  imageUri: string;
  favorito: boolean;
};

type Props = {
  movies: Movie[];
  onFavoriteToggle?: () => void;
};

export default function MovieList({ movies, onFavoriteToggle }: Props) {
  if (movies.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum título encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {movies.map((filme) => (
          <View style={styles.cardWrapper} key={filme.id}>
            <MovieCard movie={filme} onFavoriteToggle={onFavoriteToggle} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },

  cardWrapper: {
    width: "48.5%",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  emptyText: {
    color: "#94A3B8",
    fontSize: 15,
  },
});
