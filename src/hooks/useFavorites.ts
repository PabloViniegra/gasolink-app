import { useCallback } from "react";
import { useFavoritesStore, favoritesFs } from "../stores/favoritesStore";
import { Favorite } from "../types";

export function useFavorites() {
  const { favorites, setFavorites } = useFavoritesStore();

  const loadFavorites = useCallback(async () => {
    const favs = await favoritesFs.load();
    setFavorites(favs);
  }, [setFavorites]);

  const saveFavorites = useCallback(
    async (favs: Favorite[]) => {
      await favoritesFs.save(favs);
      setFavorites(favs);
    },
    [setFavorites]
  );

  const addFavorite = useCallback(
    async (fav: Favorite) => {
      if (!favorites.some((f) => f.id === fav.id)) {
        const newFavs = [...favorites, fav];
        await saveFavorites(newFavs);
      }
    },
    [favorites, setFavorites]
  );

  const removeFavourite = useCallback(
    async (id: string) => {
      const newFavs = favorites.filter((f) => f.id !== id);
      await saveFavorites(newFavs);
    },
    [favorites, saveFavorites]
  );

  const isFavorite = useCallback(
    (id: string) => {
      return favorites.some((f) => f.id === id);
    },
    [favorites]
  );

  return {
    favorites,
    loadFavorites,
    addFavorite,
    removeFavourite,
    isFavorite,
  };
}
