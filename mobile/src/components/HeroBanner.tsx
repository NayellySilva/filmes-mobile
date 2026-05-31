import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HeroBanner() {
  return (
    <ImageBackground
      source={{
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv_xkjBRSpTHNbeiYUTTF45B5UMSAEFjsgGA&s",
      }}
      style={styles.banner}
      imageStyle={styles.bannerImage}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Em destaque</Text>
          </View>

          <Text style={styles.title}>Michael</Text>

          <Text style={styles.description}>
            Cinebiografia do Rei do Pop, Michael Jackson. O longa traz uma
            representação de sua vida e do legado, contando sua história além da
            música.
          </Text>

          <TouchableOpacity style={styles.button}>
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
