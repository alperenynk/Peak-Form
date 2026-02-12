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
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter } from 'expo-router';

import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import useFavouritesStore from "../../src/store/favouritesStore";
import { muscleGroups } from "../../src/data/muscleData";

const { width } = Dimensions.get("window");

export default function Search() {

  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { toggleFavourite, isFavourite } = useFavouritesStore();
  const router = useRouter();

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

  const renderItem = ({ item }) => {
    const isFav = isFavourite(item.id);

    return (
      <Pressable
        style={({ pressed }) => [
          styles.gridItem,
          pressed && styles.gridItemPressed,
        ]}
        onPress={() => router.push(`/muscle/${item.id}`)}
      >
        <Image source={item.image} style={styles.image} />

        <Pressable
          style={styles.favouriteButton}
          onPress={(e) => {
          e.stopPropagation();
          toggleFavourite(item);
          }}
        >
          <FontAwesome
            name={isFav ? "heart" : "heart-o"}
            size={16}
            color={isFav ? "#ff4d6a" : "#3a3a3a"}
          />
        </Pressable>

        <View style={styles.titleOverlay}>
          <Text style={styles.imageTitle}>{item.title}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>E X E R C I S E S</Text>

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
          contentContainerStyle={[
            styles.flatListContent,
            { paddingBottom: insets.bottom + 100 },
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Feather name="search" size={70} color="#555" />
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
    backgroundColor: "#0f121a",
  },

  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  header: {
    color: "#f8f9fc",
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: -0.5,
  },

  searchContainer: {
    marginBottom: 20,
  },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#171b22",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2a3140",
  },

  searchIcon: {
    marginLeft: 16,
  },

  searchInput: {
    flex: 1,
    color: "#f8f9fc",
    paddingVertical: 14,
    paddingHorizontal: 8,
    fontSize: 16,
  },

  clearButton: {
    paddingHorizontal: 12,
  },

  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  sortText: {
    color: "#a0a8b8",
    fontSize: 13,
    fontWeight: "600",
  },

  columnWrapper: {
    justifyContent: "space-between",
  },

  flatListContent: {
    paddingHorizontal: 16,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 80,
    minHeight: 500,
  },

  emptyText: {
    color: "#a0a8b8",
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
  },

  emptySubText: {
    color: "#6b7280",
    fontSize: 16,
    marginTop: 8,
  },

  gridItem: {
    width: (width - 48) / 2,
    aspectRatio: 1,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#171b22",
    borderWidth: 1,
    borderColor: "#2a3140",
  },

  gridItemPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  favouriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(23, 27, 34, 0.75)",
  },

  titleOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(15, 18, 26, 0.75)",
    paddingVertical: 10,
    alignItems: "center",
  },

  imageTitle: {
    color: "#f8f9fc",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});