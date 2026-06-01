import { Heart, Star } from "lucide-react-native";
import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import api from "../services/api";

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
  movie: Movie;
  onFavoriteToggle?: () => void;
};

export default function MovieCard({ movie, onFavoriteToggle }: Props) {
  const [favorited, setFavorited] = useState(movie.favorito);

  useEffect(() => {
    setFavorited(movie.favorito);
  }, [movie.favorito]);

  async function handleToggleFavorite() {
    const nextFavoriteState = !favorited;
    setFavorited(nextFavoriteState);

    try {
      await api.patch(`/filmes/${movie.id}`, {
        favorito: nextFavoriteState,
      });
      if (onFavoriteToggle) {
        onFavoriteToggle();
      }
    } catch (error) {
      console.error("Erro ao alternar favorito:", error);
      // Revert state on error
      setFavorited(!nextFavoriteState);
    }
  }

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "/detalhes",
          params: { id: movie.id },
        })
      }
    >
      <Image source={{ uri: movie.imageUri }} style={styles.image} />

      <TouchableOpacity
        style={styles.heartButton}
        onPress={handleToggleFavorite}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Heart
          size={16}
          color={favorited ? "#FF1F3D" : "#FFFFFF"}
          fill={favorited ? "#FF1F3D" : "transparent"}
        />
      </TouchableOpacity>

      <View style={styles.footer}>
        <View style={styles.badgeRow}>
          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>{movie.type}</Text>
          </View>
          <View style={styles.ratingRow}>
            <Star size={11} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>{movie.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#1C1C22",
  },

  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },

  heartButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 999,
    padding: 7,
  },

  footer: {
    padding: 10,
    gap: 4,
  },

  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  typeBadge: {
    backgroundColor: "#FF1F3D",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  typeBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  ratingText: {
    color: "#F59E0B",
    fontSize: 11,
    fontWeight: "700",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});
