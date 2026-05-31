import { ArrowLeft } from "lucide-react-native";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import GenreFilter from "../components/GenreFilter";
import MovieList from "../components/MovieList";
import { router } from "expo-router";
import BottomNavigation from "../components/BottomNavigation";

export default function Favoritos() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/")}
        >
          <ArrowLeft size={20} color="#94A3B8" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Favoritos</Text>
      </View>

      <GenreFilter />

      <ScrollView showsVerticalScrollIndicator={false}>
        <MovieList />
      </ScrollView>
      <BottomNavigation active="favoritos" />
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
    gap: 5,
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
  },
});
