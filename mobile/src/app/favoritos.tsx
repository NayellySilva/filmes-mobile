import { useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react-native";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";

import GenreFilter from "../components/GenreFilter";
import MovieList from "../components/MovieList";
import api from "../services/api";

type Movie = {
  id: string;
  title: string;
  year: number;
  rating: number;
  type: string;
  imageUri: string;
  description?: string;
  favorito: boolean;
  genero: string;
};

export default function Favoritos() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFavorites = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    try {
      const response = await api.get("/filmes?favorito=true");
      const mapped = response.data.map((item: any) => ({
        id: String(item.id),
        title: item.titulo,
        year: Number(item.ano),
        rating: Number(item.nota),
        type: item.tipo,
        imageUri: item.capa,
        description: item.sinopse,
        favorito: !!item.favorito,
        genero: item.genero,
      }));
      setMovies(mapped);
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites(movies.length === 0);
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchFavorites(false);
  };

  const filteredMovies =
    selectedGenre === "Todos"
      ? movies
      : movies.filter((m) => m.genero === selectedGenre);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/")}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color="#94A3B8" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Favoritos</Text>
      </View>

      <View style={styles.filterArea}>
        <GenreFilter
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF1F3D" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FF1F3D"
            />
          }
        >
          <MovieList
            movies={filteredMovies}
            onFavoriteToggle={() => fetchFavorites(false)}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingTop: 10,
  },

  header: {
    marginTop: 24,
    marginLeft: 24,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  backText: {
    color: "#94A3B8",
    fontSize: 14,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 8,
  },

  filterArea: {
    marginBottom: 6,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
