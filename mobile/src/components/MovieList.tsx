import { StyleSheet, View } from "react-native";
import MovieCard from "./ui/MovieCard";

const filmes = [
  {
    id: "1",
    title: "Michael",
    year: 2025,
    rating: 9.8,
    type: "FILME",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv_xkjBRSpTHNbeiYUTTF45B5UMSAEFjsgGA&s",
  },
  {
    id: "2",
    title: "Michael",
    year: 2025,
    rating: 9.8,
    type: "FILME",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv_xkjBRSpTHNbeiYUTTF45B5UMSAEFjsgGA&s",
  },
  {
    id: "3",
    title: "Michael",
    year: 2025,
    rating: 9.8,
    type: "FILME",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv_xkjBRSpTHNbeiYUTTF45B5UMSAEFjsgGA&s",
  },
  {
    id: "4",
    title: "Michael",
    year: 2025,
    rating: 9.8,
    type: "FILME",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv_xkjBRSpTHNbeiYUTTF45B5UMSAEFjsgGA&s",
  },
];

export default function MovieList() {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {filmes.map((filme) => (
          <View style={styles.cardWrapper} key={filme.id}>
            <MovieCard movie={filme} />
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
});