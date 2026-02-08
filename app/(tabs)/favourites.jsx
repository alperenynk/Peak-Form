import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import useFavouritesStore from "../../src/store/favouritesStore";

const { width } = Dimensions.get("window");

const muscleGroups = [
  { id: "1", title: "Biceps", image: require("../../assets/images/biceps.png") },
  { id: "2", title: "Triceps", image: require("../../assets/images/triceps.png") },
  { id: "3", title: "Chest", image: require("../../assets/images/chest.png") },
  { id: "4", title: "Back", image: require("../../assets/images/back.png") },
  { id: "5", title: "Quadriceps", image: require("../../assets/images/quadriceps.png") },
  { id: "6", title: "Shoulders", image: require("../../assets/images/shoulder.png") },
  { id: "7", title: "Abs", image: require("../../assets/images/abs.png") },
  { id: "8", title: "Forearms", image: require("../../assets/images/forearm.png") },
  { id: "9", title: "Calves", image: require("../../assets/images/calves.png") },
  { id: "10", title: "Hamstrings", image: require("../../assets/images/hamstrings.png") },
  { id: "11", title: "Glutes", image: require("../../assets/images/glutes.png") },
  { id: "12", title: "Neck", image: require("../../assets/images/neck.png") },
];

export default function Favourites() {
  const insets = useSafeAreaInsets();
  const { favourites, toggleFavourite } = useFavouritesStore();
  const [sortOrder] = useState("asc");

  const favouriteItems = favourites
    .map((fav) => {
      const fullItem = muscleGroups.find((item) => item.id === fav.id);
      return fullItem || fav;
    })
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title),
    );

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.gridItem,
        pressed && styles.gridItemPressed,
      ]}
    >
      <Image source={item.image} style={styles.image} />

      <Pressable
        style={styles.favouriteButton}
        onPress={() => toggleFavourite(item)}
      >
        <FontAwesome name="heart" size={16} color="#ff4d6a" />
      </Pressable>

      <View style={styles.titleOverlay}>
        <Text style={styles.imageTitle}>{item.title}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>F A V O U R I T E S</Text>
        </View>

        {favouriteItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="heart" size={70} color="#555" />
            <Text style={styles.emptyText}>No favourites yet</Text>
            <Text style={styles.emptySubText}>
              Tap the heart icon on muscle groups in the search screen to add
              them here
            </Text>
          </View>
        ) : (
          <FlatList
            data={favouriteItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={[
              styles.flatListContent,
              { paddingBottom: insets.bottom + 100 },
            ]}
            showsVerticalScrollIndicator={false}
          />
        )}
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
    paddingTop: 40,
    paddingBottom: 16,
  },

  header: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },

  emptyText: {
    color: "#bbb",
    fontSize: 20,
    marginTop: 24,
    textAlign: "center",
  },

  emptySubText: {
    color: "#777",
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },

  columnWrapper: {
    justifyContent: "space-between",
  },

  flatListContent: {
    paddingHorizontal: 12,
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

  favouriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.45)",
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
});
