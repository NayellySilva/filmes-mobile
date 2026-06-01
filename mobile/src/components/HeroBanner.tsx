import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

type Movie = {
  id: string;
  title: string;
  year: number;
  rating: number;
  type: string;
  imageUri: string;
  description?: string;
  favorito: boolean;
};

type Props = {
  movie: Movie | null;
};

export default function HeroBanner({ movie }: Props) {
  if (!movie) {
    return null;
  }

  return (
    <ImageBackground
      source={{
        uri: movie.imageUri,
      }}
      style={styles.banner}
      imageStyle={styles.bannerImage}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Em destaque</Text>
          </View>

          <Text style={styles.title}>{movie.title}</Text>

          <Text style={styles.description} numberOfLines={3}>
            {movie.description || "Sem sinopse disponível."}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: "/detalhes",
                params: { id: movie.id },
              })
            }
          >
            <Text style={styles.buttonText}>Ver Detalhes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 500,
    width: "100%",
    justifyContent: "flex-end",
  },

  bannerImage: {
    resizeMode: "cover",
  },

  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(229, 9, 20, 0.15)",
    borderWidth: 1,
    borderColor: "#E50914",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginBottom: 10,
  },

  badgeText: {
    color: "#FF4D5A",
    fontSize: 12,
    fontWeight: "700",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "800",
    marginBottom: 8,
  },

  description: {
    color: "#D1D5DB",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
  },

  button: {
    alignSelf: "flex-start",
    backgroundColor: "#FF1F3D",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 999,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
