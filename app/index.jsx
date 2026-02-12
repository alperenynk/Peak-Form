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
    backgroundColor: "rgba(15, 18, 26, 0.78)",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 120,
  },

  content: {
    width: "100%",
    alignItems: "center",
  },

  startButton: {
    backgroundColor: "#6366f1",
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 1,
    borderColor: "#818cf8",
  },

  startButtonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.92,
  },

  buttonText: {
    color: "#f8f9fc",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});