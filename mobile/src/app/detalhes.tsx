import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Heart, Play, Trash2 } from "lucide-react-native";
import { useState } from "react";
import DetailActionButton from "../components/DetailActionButton";

export default function Detalhes() {
  const [favoritado, setFavoritado] = useState(false);

  function alternarFavorito() {
    setFavoritado(!favoritado);
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{
            uri: "https://ingresso-a.akamaihd.net/prd/img/movie/michael/a10e5eb8-6bef-4612-9288-5eae9dfe0377.webp",
          }}
          style={styles.banner}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.posterArea}>
            <ImageBackground
              source={{
                uri: "https://ingresso-a.akamaihd.net/prd/img/movie/michael/a10e5eb8-6bef-4612-9288-5eae9dfe0377.webp",
              }}
              style={styles.poster}
              imageStyle={styles.posterImage}
            />

            <View style={styles.info}>
              <View style={styles.row}>
                <Text style={styles.badge}>FILME</Text>
                <Text style={styles.year}>2026</Text>
              </View>

              <Text style={styles.title}>Michael</Text>
              <Text style={styles.genre}>Drama</Text>
              <Text style={styles.rating}>⭐ 9.8</Text>
            </View>
          </View>

          <View style={styles.actions}>
            <View style={{ flex: 1 }}>
              <DetailActionButton
                label={favoritado ? "Favoritado" : "Favoritar"}
                icon={Heart}
                filled={favoritado}
                variant="primary"
                onPress={alternarFavorito}
              />
            </View>

            <View style={{ flex: 1 }}>
              <DetailActionButton
                label="Excluir"
                icon={Trash2}
                variant="outline"
              />
            </View>
          </View>

          <DetailActionButton label="Assistir" icon={Play} variant="light" />
          <Text style={styles.description}>
            Cinebiografia do Rei do Pop, Michael Jackson. O longa traz uma
            representação de sua vida e do legado, contando sua história além da
            música, traçando sua jornada desde a descoberta de seu talento até
            se tornar o artista visionário, cuja ambição criativa alimentou uma
            busca incansável para se tornar o maior artista do mundo.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  banner: {
    height: 460,
    width: "100%",
    backgroundColor: "#000",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  content: {
    paddingHorizontal: 20,
    marginTop: -95,
    paddingBottom: 32,
  },
  posterArea: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 16,
  },
  poster: {
    width: 120,
    height: 170,
  },
  posterImage: {
    borderRadius: 14,
  },
  info: {
    flex: 1,
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: "#FF1F3D",
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  year: {
    color: "#D1D5DB",
    fontSize: 12,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
  },
  genre: {
    color: "#D1D5DB",
    fontSize: 14,
    marginTop: 4,
  },
  rating: {
    color: "#FACC15",
    fontSize: 14,
    marginTop: 12,
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 22,
  },
  description: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 30,
    marginTop: 26,
  },
});
