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
import { useRouter } from "expo-router";

import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import useFavouritesStore from "../../src/store/favouritesStore";
import { muscleGroups } from "../../src/data/muscleData";

const { width } = Dimensions.get("window");

export default function Favourites() {
  const insets = useSafeAreaInsets();
  const { favourites, toggleFavourite } = useFavouritesStore();
  const [sortOrder] = useState("asc");
  const router = useRouter();

  const favouriteItems = favourites
    .map((fav) => {
      const fullItem = muscleGroups.find((item) => item.id === fav.id);
      return fullItem || fav;
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  const renderItem = ({ item }) => (
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
            <Feather name="heart" size={70} color="#6b7280" />
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
    backgroundColor: "#0f121a",
  },

  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
  },

  header: {
    color: "#f8f9fc",
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.5,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },

  emptyText: {
    color: "#a0a8b8",
    fontSize: 20,
    marginTop: 24,
    textAlign: "center",
  },

  emptySubText: {
    color: "#6b7280",
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
    lineHeight: 22,
  },

  columnWrapper: {
    justifyContent: "space-between",
  },

  flatListContent: {
    paddingHorizontal: 16,
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
    backgroundColor: "rgba(23, 27, 34, 0.8)",
  },

  titleOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(15, 18, 26, 0.8)",
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