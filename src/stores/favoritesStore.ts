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
}

const FAVORITES_DIR = "gasolink";
const FAVORITES_PATH = "gasolink/favorites.json";

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  setFavorites: (favorites: Favorite[]) => set({ favorites }),
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
  },
};
