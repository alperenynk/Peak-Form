import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { muscleGroups, muscleGifs } from "../../src/data/muscleData";

const { width } = Dimensions.get("window");

export default function MuscleDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const muscle = muscleGroups.find((m) => m.id === id);

  if (!muscle) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>Muscle group not found.</Text>
      </SafeAreaView>
    );
  }

  const gifs = muscleGifs[id] || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Feather
          name="arrow-left"
          size={28}
          color="white"
          onPress={() => router.back()}
          style={styles.backButton}
        />
        <Text style={styles.headerTitle}>{muscle.title}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        <Image source={muscle.image} style={styles.mainImage} />

        {/* Gif'ler bölümü */}
        {gifs.length === 0 ? (
          <View style={styles.noContent}>
            <Feather name="image" size={64} color="#555" />
            <Text style={styles.noContentText}>
              No exercise GIFs have been added yet.
            </Text>
          </View>
        ) : (
          <View style={styles.gifsSection}>
            <Text style={styles.sectionTitle}>Exercise Examples</Text>

            <FlatList
              data={gifs}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item: gifSource }) => (
                <View style={styles.gifCard}>
                  <Image
                    source={gifSource}
                    style={styles.gif}
                    resizeMode="contain"
                  />
                </View>
              )}
              contentContainerStyle={styles.gifListContent}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#25292e",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },

  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  backButton: {
    padding: 8,
  },

  scrollView: {
    flex: 1,
  },

  mainImage: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 24,
    resizeMode: "cover",
  },

  gifsSection: {
    paddingHorizontal: 16,
  },

  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },

  gifListContent: {
    paddingBottom: 24,
  },

  gifCard: {
    width: width * 0.82,
    height: 320,
    marginRight: 16,
    backgroundColor: "#2a2e35",
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  gif: {
    width: "100%",
    height: "100%",
  },

  noContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    marginTop: 80,
  },

  noContentText: {
    color: "#888",
    fontSize: 18,
    marginTop: 16,
    textAlign: "center",
  },

  errorText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 100,
  },
});
