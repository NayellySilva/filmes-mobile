import { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Heart, Play, Trash2, ArrowLeft, Star } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import DetailActionButton from "../components/DetailActionButton";
import api from "../services/api";

type Movie = {
  id: string;
  titulo: string;
  genero: string;
  ano: number;
  nota: number;
  tipo: string;
  capa: string;
  sinopse: string;
  favorito: boolean;
};

export default function Detalhes() {
  // Lê o ID do filme passado como parâmetro de rota (query param) ao clicar no card
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [favoritado, setFavoritado] = useState(false);

  // Efeito para carregar os detalhes do filme sempre que o ID estiver disponível
  useEffect(() => {
    if (id) {
      fetchMovieDetail();
    }
  }, [id]);

  // Requisição HTTP GET para obter as informações completas do filme selecionado
  async function fetchMovieDetail() {
    try {
      setLoading(true);
      const response = await api.get(`/filmes/${id}`);
      setMovie(response.data);
      setFavoritado(!!response.data.favorito); // Define o estado inicial do coração
    } catch (error) {
      console.error("Erro ao buscar detalhes do filme:", error);
      Alert.alert(
        "Erro",
        "Não foi possível carregar os detalhes deste título.",
      );
      router.replace("/");
    } finally {
      setLoading(false);
    }
  }

  // Atualiza o estado de favorito no servidor fake via HTTP PATCH com atualização otimista na interface
  async function alternarFavorito() {
    if (!movie) return;

    const nextFavoriteState = !favoritado;
    setFavoritado(nextFavoriteState); // Atualização otimista na UI

    try {
      await api.patch(`/filmes/${movie.id}`, {
        favorito: nextFavoriteState, // Envia a alteração para a propriedade favorito
      });
    } catch (error) {
      console.error("Erro ao favoritar:", error);
      setFavoritado(!nextFavoriteState); // Reverte o estado caso a chamada falhe
    }
  }

  // Exclui o filme do catálogo no servidor fake via HTTP DELETE e redireciona para a Home
  function handleExcluir() {
    if (!movie) return;

    const executarExclusao = async () => {
      try {
        await api.delete(`/filmes/${movie.id}`); // Chamada HTTP DELETE
        if (Platform.OS === "web") {
          alert("Título excluído com sucesso.");
        } else {
          Alert.alert("Sucesso", "Título excluído com sucesso.");
        }
        router.replace("/"); // Redireciona e atualiza a Home automaticamente
      } catch (error) {
        console.error("Erro ao excluir título:", error);
        if (Platform.OS === "web") {
          alert("Não foi possível excluir o título do catálogo.");
        } else {
          Alert.alert("Erro", "Não foi possível excluir o título do catálogo.");
        }
      }
    };

    if (Platform.OS === "web") {
      const confirmar = window.confirm(
        `Tem certeza de que deseja remover "${movie.titulo}" do catálogo?`,
      );
      if (confirmar) {
        executarExclusao();
      }
    } else {
      Alert.alert(
        "Excluir título",
        `Tem certeza de que deseja remover "${movie.titulo}" do catálogo?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Excluir",
            style: "destructive",
            onPress: executarExclusao,
          },
        ],
      );
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF1F3D" />
      </SafeAreaView>
    );
  }

  if (!movie) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={{ color: "#FFFFFF" }}>Título não encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace("/")}
        activeOpacity={0.7}
      >
        <ArrowLeft size={22} color="#FFFFFF" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{ uri: movie.capa }}
          style={styles.banner}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.posterArea}>
            <ImageBackground
              source={{ uri: movie.capa }}
              style={styles.poster}
              imageStyle={styles.posterImage}
            />

            <View style={styles.info}>
              <View style={styles.row}>
                <Text style={styles.badge}>{movie.tipo.toUpperCase()}</Text>
                <Text style={styles.year}>{movie.ano}</Text>
              </View>

              <Text style={styles.title} numberOfLines={2}>
                {movie.titulo}
              </Text>
              <Text style={styles.genre}>{movie.genero}</Text>
              <View style={styles.rating}>
                <Star size={11} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.ratingText}>
                  {Number(movie.nota).toFixed(1)}
                </Text>
              </View>
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
                onPress={handleExcluir}
              />
            </View>
          </View>

          <DetailActionButton
            label="Assistir"
            icon={Play}
            variant="light"
            onPress={() =>
              Alert.alert(
                "Assistir",
                `Iniciando reprodução de ${movie.titulo}...`,
              )
            }
          />

          <Text style={styles.description}>
            {movie.sinopse || "Nenhuma sinopse disponível para este título."}
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
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 45,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    height: 400,
    width: "100%",
    backgroundColor: "#000",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
  },
  content: {
    paddingHorizontal: 20,
    marginTop: -95,
    paddingBottom: 40,
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
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
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
    fontSize: 26,
    fontWeight: "800",
    lineHeight: 32,
  },
  genre: {
    color: "#D1D5DB",
    fontSize: 14,
    marginTop: 4,
  },
  rating: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    color: "#F59E0B",
    fontSize: 14,
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
    lineHeight: 24,
    marginTop: 20,
  },
});
