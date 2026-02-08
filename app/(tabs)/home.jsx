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
                style={[styles.iconWrapper, { backgroundColor: "#ffc10733" }]}
              >
                <Feather name="search" size={32} color="#ffc107" />
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
    backgroundColor: "#25292e",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  title: {
    color: "#ffffff",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    color: "#bbbbbb",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 48,
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  buttonContainer: {
    width: "100%",
    gap: 16,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2d3238",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#444",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },

  cardPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.92,
  },

  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },

  cardSubtitle: {
    color: "#bbbbbb",
    fontSize: 15,
    lineHeight: 20,
  },
});
