import { useCallback, useEffect, useState } from "react";
import { useFavoritesStore } from "../stores/favoritesStore";
import { Favorite } from "../types";

export function useFavorites() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { 
    favorites, 
    addFavorite: storeAddFavorite, 
    removeFavorite: storeRemoveFavorite, 
    loadFavorites: storeLoadFavorites 
  } = useFavoritesStore();

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        await storeLoadFavorites();
        setError(null);
      } catch (err) {
        console.error('Failed to load favorites:', err);
        setError(err instanceof Error ? err : new Error('Failed to load favorites'));
      } finally {
        setIsLoading(false);
      }
    };
    
    load();
  }, [storeLoadFavorites]);

  const loadFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      const loadedFavorites = await storeLoadFavorites();
      setError(null);
      return loadedFavorites;
    } catch (err) {
      console.error('Failed to load favorites:', err);
      setError(err instanceof Error ? err : new Error('Failed to load favorites'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeLoadFavorites]);

  const addFavorite = useCallback(async (fav: Favorite) => {
    try {
      setIsLoading(true);
      await storeAddFavorite(fav);
      setError(null);
    } catch (err) {
      console.error('Failed to add favorite:', err);
      setError(err instanceof Error ? err : new Error('Failed to add favorite'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeAddFavorite]);

  const removeFavourite = useCallback(async (id: string | number) => {
    try {
      setIsLoading(true);
      await storeRemoveFavorite(String(id));
      setError(null);
    } catch (err) {
      console.error('Failed to remove favorite:', err);
      setError(err instanceof Error ? err : new Error('Failed to remove favorite'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeRemoveFavorite]);

  const isFavorite = useCallback((id: string | number) => {
    return favorites.some((f) => String(f.id) === String(id));
  }, [favorites]);

  return {
    favorites,
    isLoading,
    error,
    loadFavorites,
    addFavorite,
    removeFavourite,
    isFavorite,
  };
}
