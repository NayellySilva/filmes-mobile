import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import Menu from "../components/Menu";


export default function Layout() {
  return(
  
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />
      <Menu />
    </View>
  
)}

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0F",
  },
});