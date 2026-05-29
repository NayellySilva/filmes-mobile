import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";

import HeroBanner from "../components/HeroBanner";
import GenreFilter from "../components/GenreFilter";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <HeroBanner />

        <GenreFilter />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0F",
  },
});
