import { useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  View,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "expo-router";

import HeroBanner from "../components/HeroBanner";
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

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch movies from server
  const fetchMovies = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    try {
      const response = await api.get("/filmes");
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
      console.error("Erro ao carregar catálogo:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMovies(movies.length === 0);
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchMovies(false);
  };

  const filteredMovies =
    selectedGenre === "Todos"
      ? movies
      : movies.filter((m) => m.genero === selectedGenre);

  const featuredMovie = movies.length > 0 ? movies[0] : null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

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
          <HeroBanner movie={featuredMovie} />

          <GenreFilter
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />
          <MovieList movies={filteredMovies} onFavoriteToggle={() => fetchMovies(false)} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0F",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B0B0F",
  },
});
