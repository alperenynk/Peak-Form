import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
} from "react-native";
import { Link } from "expo-router";

export default function Index() {
  const backgroundImage = require("../assets/images/welcome-screen.png");

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Pressable
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.startButtonPressed,
            ]}
          >
            <Link href="/home" style={styles.buttonText}>
              Get Started
            </Link>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(37, 41, 46, 0.65)",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 100,
  },

  content: {
    width: "100%",
    alignItems: "center",
  },

  startButton: {
    backgroundColor: "#ffc107",
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#3a3a3a",
    width: "100%",
    alignItems: "center",
    shadowColor: "#ffc107",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },

  startButtonPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.92,
  },

  buttonText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});
