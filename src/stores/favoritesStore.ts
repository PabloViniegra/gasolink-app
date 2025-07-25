import { create } from "zustand";
import {
  readTextFile,
  BaseDirectory,
  exists,
  mkdir,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import { Favorite } from "../types";

interface FavoritesState {
  favorites: Favorite[];
  setFavorites: (favorites: Favorite[]) => void;
  addFavorite: (favorite: Favorite) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  loadFavorites: () => Promise<Favorite[]>;
}

const FAVORITES_DIR = "gasolink";
const FAVORITES_PATH = "gasolink/favorites.json";

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  setFavorites: (favorites: Favorite[]) => set({ favorites }),
  addFavorite: async (favorite: Favorite) => {
    try {
      const currentFavorites = [...get().favorites];
      const favId = String(favorite.id).trim();
      const existingIndex = currentFavorites.findIndex(f => String(f.id).trim() === favId);
      if (existingIndex === -1) {
        const newFavorite = { ...favorite, id: favId };
        const newFavorites = [...currentFavorites, newFavorite];
        await favoritesFs.save(newFavorites);
        set({ favorites: newFavorites });
      } else {
        const updatedFavorites = [...currentFavorites];
        updatedFavorites[existingIndex] = { ...favorite, id: favId };
        await favoritesFs.save(updatedFavorites);
        set({ favorites: updatedFavorites });
      }
    } catch (error) {
      console.error('Error in addFavorite:', error);
      throw error;
    }
  },
  removeFavorite: async (id: string) => {
    const currentFavorites = get().favorites;
    const newFavorites = currentFavorites.filter(f => String(f.id) !== id);
    await favoritesFs.save(newFavorites);
    set({ favorites: newFavorites });
  },
  loadFavorites: async () => {
    try {
      const favs = await favoritesFs.load();
      const loadedFavorites = Array.isArray(favs) ? favs : [];
      const normalizedFavorites = loadedFavorites.map(fav => ({
        ...fav,
        id: String(fav.id).trim()
      }));
      
      const currentFavorites = get().favorites;
      if (JSON.stringify(currentFavorites) !== JSON.stringify(normalizedFavorites)) {
        set({ favorites: normalizedFavorites });
      }
      
      return normalizedFavorites;
    } catch (error) {
      console.error('Error loading favorites:', error);
      set({ favorites: [] });
      return [];
    }
  },
}));

export const favoritesFs = {
  async load() {
    try {
      const txt = await readTextFile(FAVORITES_PATH, {
        baseDir: BaseDirectory.AppData,
      });
      return JSON.parse(txt);
    } catch (error) {
      if (
        typeof error === "object" &&
        error &&
        "message" in error &&
        String(error.message).includes("not found")
      ) {
        return [];
      }
      console.error("Error loading favorites:", error);
      return [];
    }
  },
  async save(favs: Favorite[]) {
    try {
      const folderExists = await exists(FAVORITES_DIR, {
        baseDir: BaseDirectory.AppData,
      });
      if (!folderExists) {
        await mkdir(FAVORITES_DIR, {
          baseDir: BaseDirectory.AppData,
          recursive: true,
        });
      }
      await writeTextFile(FAVORITES_PATH, JSON.stringify(favs, null, 2), {
        baseDir: BaseDirectory.AppData,
      });
    } catch (error) {
      console.error('Error saving favorites:', error);
      throw error;
    }
  },
};
