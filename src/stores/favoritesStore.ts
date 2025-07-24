import { create } from "zustand";
import {
  readTextFile,
  writeTextFile,
  BaseDirectory,
  exists,
  create as createDir,
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
    if (!(await exists(FAVORITES_DIR, { baseDir: BaseDirectory.AppData }))) {
      await createDir(FAVORITES_DIR, {
        baseDir: BaseDirectory.AppData
      });
    }
    const contents = JSON.stringify(favs, null, 2);
    await writeTextFile(FAVORITES_PATH, contents, {
      baseDir: BaseDirectory.AppData,
    });
  },
};
