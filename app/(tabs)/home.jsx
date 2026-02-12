import { StyleSheet, Text, View, Pressable } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Home() {

  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={[
            styles.container,
            { paddingBottom: insets.bottom + 100 },
          ]}>
          <Text style={styles.title}>Peak Form</Text>
          <Text style={styles.subtitle}>
            Build your strength, one rep at a time
          </Text>

          <View style={styles.buttonContainer}>
            {/* Arama Kartı */}
            <Pressable
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
              onPress={() => router.push("/search")}
            >
              <View
                style={[styles.iconWrapper, { backgroundColor: "#6366f133" }]}
              >
                <Feather name="search" size={32} color="#6366f1" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Find Muscle Groups</Text>
                <Text style={styles.cardSubtitle}>
                  Explore 12 different body parts and find exercise ideas.
                </Text>
              </View>
            </Pressable>

            {/* Favoriler Kartı */}
            <Pressable
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
              onPress={() => router.push("/favourites")}
            >
              <View
                style={[styles.iconWrapper, { backgroundColor: "#ff4d6a33" }]}
              >
                <Feather name="heart" size={32} color="#ff4d6a" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>My Favourites</Text>
                <Text style={styles.cardSubtitle}>
                  Save your favorite muscle groups here.
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0f121a",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  title: {
    color: "#f8f9fc",
    fontSize: 48,
    fontWeight: "800",
    marginBottom: 8,
    letterSpacing: -1,
  },

  subtitle: {
    color: "#a0a8b8",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 60,
    lineHeight: 26,
  },

  buttonContainer: {
    width: "100%",
    gap: 20,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#171b22",
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#2a3140",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },

  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
  },

  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 24,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    color: "#f8f9fc",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },

  cardSubtitle: {
    color: "#a0a8b8",
    fontSize: 15,
    lineHeight: 22,
  },
});
