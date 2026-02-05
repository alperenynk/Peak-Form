import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");

  const muscleGroups = [
    { id: 1, title: "Biceps", image: require("../assets/icon.png") },
    { id: 2, title: "Triceps", image: require("../assets/icon.png") },
    { id: 3, title: "Chest", image: require("../assets/icon.png") },
    { id: 4, title: "Back", image: require("../assets/icon.png") },
    { id: 5, title: "Legs", image: require("../assets/icon.png") },
    { id: 6, title: "Shoulders", image: require("../assets/icon.png") },
    { id: 7, title: "Abs", image: require("../assets/icon.png") },
    { id: 8, title: "Forearms", image: require("../assets/icon.png") },
  ];

  const filteredGroups = muscleGroups.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.header}>EXERCISES</Text>

          {/* Arama Çubuğu Alanı */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search muscle group..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing"
            />
          </View>

          <View style={styles.grid}>
            {filteredGroups.length > 0 ? (
              filteredGroups.map((item) => (
                <Pressable
                  key={item.id}
                  style={({ pressed }) => [
                    styles.gridItem,
                    pressed && styles.gridItemPressed,
                  ]}
                >
                  <Image source={item.image} style={styles.image} />

                  <View style={styles.titleOverlay}>
                    <Text style={styles.imageTitle}>{item.title}</Text>
                  </View>
                </Pressable>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No muscle group found.</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  scrollContent: {
    padding: 12,
    paddingBottom: 24,
  },
  header: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    marginLeft: 4,
  },
  searchContainer: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  searchInput: {
    backgroundColor: "#333",
    color: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#444",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    aspectRatio: 1,
    marginBottom: 12,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#333",
    position: "relative",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  gridItemPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  titleOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 8,
    alignItems: "center",
  },
  imageTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
  },
});
