import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFavouritesStore = create(
  persist(
    (set, get) => ({
      favourites: [],

      toggleFavourite: (item) => {
        set((state) => {
          const alreadyExists = state.favourites.some(
            (fav) => fav.id === item.id,
          );

          if (alreadyExists) {
            return {
              favourites: state.favourites.filter((fav) => fav.id !== item.id),
            };
          }

          return {
            favourites: [...state.favourites, item],
          };
        });
      },

      isFavourite: (id) => {
        return get().favourites.some((item) => item.id === id);
      },

      clearFavourites: () => set({ favourites: [] }),
    }),

    {
      name: "favourites-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ favourites: state.favourites }),
    },
  ),
);

export default useFavouritesStore;
