import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { Search } from "lucide-react-native";
import MovieCard from "../components/MovieCard";
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

export default function Buscar() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    try {
      setLoading(true);
      const response = await api.get("/filmes");
      setMovies(response.data);
    } catch (error) {
      console.error("Erro ao buscar filmes para busca:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredMovies = movies.filter((movie) => {
    const query = searchQuery.toLowerCase();
    return (
      movie.titulo.toLowerCase().includes(query) ||
      movie.genero.toLowerCase().includes(query)
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Buscar</Text>
        <Text style={{ color: "#94A3B8", fontSize: 14, marginTop: 4 }}>
          Procure por título ou gênero
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#71717A" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Ex: Interestelar, Drama, Ação..."
          placeholderTextColor="#71717A"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF1F3D" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {filteredMovies.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={{ color: "#94A3B8", fontSize: 15, textAlign: "center" }}>
                Nenhum título encontrado para "{searchQuery}"
              </Text>
            </View>
          ) : (
            <View style={styles.grid}>
              {filteredMovies.map((movie) => (
                <View style={{ width: "48.5%" }} key={movie.id}>
                  <MovieCard
                    movie={{
                      id: movie.id,
                      title: movie.titulo,
                      year: Number(movie.ano),
                      rating: Number(movie.nota),
                      type: movie.tipo,
                      imageUri: movie.capa,
                      favorito: !!movie.favorito,
                    }}
                  />
                </View>
              ))}
            </View>
          )}
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
    marginHorizontal: 24,
    marginBottom: 16,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    borderRadius: 12,
    marginHorizontal: 24,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },

  searchInput: {
    flex: 1,
    height: 48,
    color: "#FFFFFF",
    fontSize: 15,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },

  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
});
