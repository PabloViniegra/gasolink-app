import { getStations } from "../services/precioilService";
import { useStationStore } from "../stores/stationsStore";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Station } from "../types";

export const FUEL_TYPES = [
  { key: "Gasolina95", label: "Gasolina 95" },
  { key: "Gasolina98", label: "Gasolina 98" },
  { key: "Diesel", label: "Diésel" },
  { key: "DieselPremium", label: "Diésel Premium" },
  { key: "DieselB", label: "Diésel B" },
  { key: "GLP", label: "GLP" },
  { key: "GPL", label: "GPL" },
  { key: "Simples95", label: "Gasolina 95 Simple" },
  { key: "Simples98", label: "Gasolina 98 Simple" },
  { key: "Gasoleo", label: "Gasóleo" },
  { key: "GasoleoEspecial", label: "Gasóleo Especial" },
  { key: "Especial95", label: "Especial 95" },
  { key: "Especial98", label: "Especial 98" },
  { key: "Gazole", label: "Gasóleo" },
  { key: "SP95", label: "SP95" },
  { key: "E85", label: "E85" },
  { key: "E10", label: "E10" },
  { key: "GPLc", label: "GPL" },
  { key: "SP98", label: "SP98" },
];

export type FuelType = (typeof FUEL_TYPES)[number]["key"];

export type PriceRange = {
  min: number | null;
  max: number | null;
};

export type FilterOptions = {
  fuelTypes: FuelType[];
  priceRange: PriceRange;
  recentlyUpdated: boolean;
};

export const STATIONS_PER_PAGE = 8;

export type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc";

export function useStations(localityId: number) {
  const [sortOption, setSortOption] = useState<SortOption>("name-asc");
  const [filters, setFilters] = useState<FilterOptions>({
    fuelTypes: [],
    priceRange: { min: null, max: null },
    recentlyUpdated: false,
  });

  const { setStations, currentPage, setCurrentPage } = useStationStore();

  const availableFuelTypes = useMemo(() => {
    return [...new Set(FUEL_TYPES.map((f) => f.label))].sort();
  }, []);

  const getLastUpdatedHours = (dateString: string | null): number => {
    if (!dateString) return Infinity;
    const updatedAt = new Date(dateString);
    const now = new Date();
    return (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60);
  };

  const stationsQuery = useQuery({
    queryKey: ["stations", localityId],
    queryFn: () => {
      if (!localityId) return Promise.resolve([]);
      return getStations(localityId);
    },
    enabled: !!localityId,
  });

  const totalPages = useMemo(() => {
    if (!stationsQuery.data) return 0;
    return Math.ceil(stationsQuery.data.length / STATIONS_PER_PAGE);
  }, [stationsQuery.data]);

  type FuelPrice = {
    price: number;
    fuelType: string;
  };

  const getAllPrices = (station: Station): FuelPrice[] => {
    return FUEL_TYPES.map(({ key, label }) => {
      const priceStr = station[key as keyof Station];
      if (!priceStr || priceStr === "null") return null;

      const price = parseFloat(String(priceStr));
      return !isNaN(price) ? { price, fuelType: label } : null;
    })
      .filter((price): price is FuelPrice => price !== null)
      .sort((a, b) => a.price - b.price);
  };

  const filteredAndSortedStations = useMemo(() => {
    if (!stationsQuery.data) return [];

    return [...stationsQuery.data]
      .filter((station) => {
        if (filters.fuelTypes.length > 0) {
          const hasSelectedFuel = filters.fuelTypes.some((fuelKey) => {
            const fuelType = FUEL_TYPES.find((f) => f.key === fuelKey);
            if (!fuelType) return false;
            const price = station[fuelKey as keyof Station];
            return price && price !== "null";
          });
          if (!hasSelectedFuel) return false;
        }

        if (
          filters.priceRange.min !== null ||
          filters.priceRange.max !== null
        ) {
          const prices = FUEL_TYPES.map((type) =>
            parseFloat(String(station[type.key as keyof Station] || "0"))
          ).filter((price) => !isNaN(price) && price > 0);

          if (prices.length === 0) return false;

          const minPrice = Math.min(...prices);
          if (
            filters.priceRange.min !== null &&
            minPrice < filters.priceRange.min
          )
            return false;
          if (
            filters.priceRange.max !== null &&
            minPrice > filters.priceRange.max
          )
            return false;
        }

        if (filters.recentlyUpdated) {
          const hoursSinceUpdate = getLastUpdatedHours(
            station.lastUpdate || null
          );
          if (hoursSinceUpdate > 24) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const aName = a.nombreEstacion || "";
        const bName = b.nombreEstacion || "";

        switch (sortOption) {
          case "name-asc":
            return aName.localeCompare(bName);
          case "name-desc":
            return bName.localeCompare(aName);
          case "price-asc":
          case "price-desc": {
            const aPrices = getAllPrices(a).map((p) => p.price);
            const bPrices = getAllPrices(b).map((p) => p.price);

            if (aPrices.length === 0)
              return sortOption === "price-asc" ? 1 : -1;
            if (bPrices.length === 0)
              return sortOption === "price-asc" ? -1 : 1;

            const maxLength = Math.max(aPrices.length, bPrices.length);
            for (let i = 0; i < maxLength; i++) {
              const aPrice = aPrices[i] !== undefined ? aPrices[i] : Infinity;
              const bPrice = bPrices[i] !== undefined ? bPrices[i] : Infinity;

              if (aPrice !== bPrice) {
                return sortOption === "price-asc"
                  ? aPrice - bPrice
                  : bPrice - aPrice;
              }
            }

            return aName.localeCompare(bName);
          }
          default:
            return 0;
        }
      });
  }, [stationsQuery.data, sortOption]);

  const paginatedStations = useMemo(() => {
    const startIndex = (currentPage - 1) * STATIONS_PER_PAGE;
    return filteredAndSortedStations.slice(
      startIndex,
      startIndex + STATIONS_PER_PAGE
    );
  }, [filteredAndSortedStations, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [localityId, setCurrentPage]);

  useEffect(() => {
    if (stationsQuery.data) {
      setStations(paginatedStations);
    }
  }, [stationsQuery.data, paginatedStations, setStations]);

  useEffect(() => {
    if (stationsQuery.error) {
      console.error("Error fetching stations:", stationsQuery.error);
    }
  }, [stationsQuery.error]);

  const updateFilters = (updates: Partial<FilterOptions>) => {
    setCurrentPage(1);
    setFilters((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const handleFuelFilterChange = (fuelType: string, isChecked: boolean) => {
    updateFilters({
      fuelTypes: isChecked
        ? [...filters.fuelTypes, fuelType as FuelType]
        : filters.fuelTypes.filter((f) => f !== fuelType),
    });
  };

  const handlePriceRangeChange = (min: number | null, max: number | null) => {
    updateFilters({
      priceRange: { min, max },
    });
  };

  const toggleRecentlyUpdated = (enabled: boolean) => {
    updateFilters({
      recentlyUpdated: enabled,
    });
  };

  const clearFilters = () => {
    updateFilters({
      fuelTypes: [],
      priceRange: { min: null, max: null },
      recentlyUpdated: false,
    });
  };

  return {
    stations: paginatedStations,
    allStations: stationsQuery.data || [],
    totalPages,
    currentPage,
    setCurrentPage,
    sortOption,
    setSortOption,
    isLoading: stationsQuery.isLoading,
    error: stationsQuery.error,
    refetch: stationsQuery.refetch,
    availableFuelTypes,
    selectedFuels: filters.fuelTypes,
    onFuelFilterChange: handleFuelFilterChange,
    onPriceRangeChange: handlePriceRangeChange,
    onToggleRecentlyUpdated: toggleRecentlyUpdated,
    onClearFilters: clearFilters,
    activeFilterCount:
      filters.fuelTypes.length +
      (filters.priceRange.min !== null ? 1 : 0) +
      (filters.priceRange.max !== null ? 1 : 0) +
      (filters.recentlyUpdated ? 1 : 0),
  };
}
