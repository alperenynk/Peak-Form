import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Index() {
  const muscleGroups = [
    { id: "1", title: "Biceps", image: require("../assets/icon.png") },
    { id: "2", title: "Triceps", image: require("../assets/icon.png") },
    { id: "3", title: "Chest", image: require("../assets/icon.png") },
    { id: "4", title: "Back", image: require("../assets/icon.png") },
    { id: "5", title: "Quadriceps", image: require("../assets/icon.png") },
    { id: "6", title: "Shoulders", image: require("../assets/icon.png") },
    { id: "7", title: "Abs", image: require("../assets/icon.png") },
    { id: "8", title: "Forearms", image: require("../assets/icon.png") },
    { id: "9", title: "Calves", image: require("../assets/icon.png") },
    { id: "10", title: "Hamstrings", image: require("../assets/icon.png") },
    { id: "11", title: "Glutes", image: require("../assets/icon.png") },
    { id: "12", title: "Neck", image: require("../assets/icon.png") },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc

  const filteredGroups = muscleGroups
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title),
    );

  const clearSearch = () => {
    setSearchQuery("");
  };

  const renderItem = ({ item }) => (
    <Pressable
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
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>E X E R C I S E S</Text>

          {/* Search + Sort */}
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <Feather
                name="search"
                size={20}
                color="#888"
                style={styles.searchIcon}
              />

              <TextInput
                style={styles.searchInput}
                placeholder="Search muscle group..."
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
              />

              {searchQuery.length > 0 && (
                <Pressable onPress={clearSearch} style={styles.clearButton}>
                  <Feather name="x" size={20} color="#888" />
                </Pressable>
              )}

              {/* Sort Button */}
              <Pressable
                onPress={() =>
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
                style={styles.sortButton}
              >
                <Text style={styles.sortText}>
                  {sortOrder === "asc" ? "A–Z" : "Z–A"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <FlatList
          data={filteredGroups}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Feather name="search" size={48} color="#555" />
              <Text style={styles.emptyText}>
                No muscle group found for "{searchQuery}"
              </Text>
              <Text style={styles.emptySubText}>Try another keyword</Text>
            </View>
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },

  headerContainer: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },

  header: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },

  searchContainer: {
    marginBottom: 16,
  },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#444",
  },

  searchIcon: {
    marginLeft: 14,
  },

  searchInput: {
    flex: 1,
    color: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
  },

  clearButton: {
    paddingHorizontal: 8,
  },

  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  sortText: {
    color: "#aaa",
    fontSize: 12,
    fontWeight: "600",
  },

  flatListContent: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },

  columnWrapper: {
    justifyContent: "space-between",
  },

  gridItem: {
    width: (width - 36) / 2,
    aspectRatio: 1,
    marginBottom: 12,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#333",
    elevation: 4,
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
    alignItems: "center",
    marginTop: 100,
  },

  emptyText: {
    color: "#bbb",
    fontSize: 18,
    marginTop: 16,
    textAlign: "center",
  },

  emptySubText: {
    color: "#777",
    fontSize: 15,
    marginTop: 8,
  },
});
