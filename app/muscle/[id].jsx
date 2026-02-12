import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Pressable,
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

  const renderExercise = ({ item, index }) => {
    const isRightColumn = index % 2 !== 0;

    return (
      <Pressable
        style={[
          styles.card,
          isRightColumn ? styles.rightColumn : styles.leftColumn,
        ]}
        android_ripple={{
          color: "rgba(255,255,255,0.1)",
        }}
        onPress={() => {
          // ileride egzersiz detay sayfası açılabilir
        }}
      >
        <Image source={item} style={styles.image} resizeMode="cover" />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.iconButton}
        >
          <Feather name="arrow-left" size={22} color="white" />
        </Pressable>

        <Text style={styles.headerTitle}>{muscle.title.toUpperCase()}</Text>

        <View style={{ width: 32 }} />
      </View>

      {/* Exercise Grid */}
      <FlatList
        data={gifs}
        keyExtractor={(_, index) => `${id}-${index}`}
        renderItem={renderExercise}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.noContent}>
            <Feather name="image" size={56} color="#444" />
            <Text style={styles.noContentText}>
              No exercises available yet.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0f121a",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  headerTitle: {
    color: "#f8f9fc",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  iconButton: {
    padding: 8,
    borderRadius: 12,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  card: {
    width: (width - 16 * 3) / 2,
    height: 200,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#171b22",
    borderWidth: 1,
    borderColor: "#2a3140",
  },

  leftColumn: {
    marginRight: 16,
  },

  rightColumn: {
    marginRight: 0,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  noContent: {
    marginTop: 140,
    alignItems: "center",
  },

  noContentText: {
    color: "#6b7280",
    fontSize: 15,
    marginTop: 12,
  },

  errorText: {
    color: "#f8f9fc",
    fontSize: 18,
    textAlign: "center",
    marginTop: 100,
  },
});