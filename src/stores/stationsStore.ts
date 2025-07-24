import { create } from "zustand";
import { DetailStation, Historic, Station } from "../types";

interface StationStore {
  stations: Station[];
  currentPage: number;
  selectedStation: DetailStation | null;
  selectedStationHistoric: Historic | null;
  setStations: (stations: Station[]) => void;
  setCurrentPage: (page: number) => void;
  setSelectedStation: (station: DetailStation | null) => void;
  setSelectedStationHistoric: (station: Historic | null) => void;
}

export const useStationStore = create<StationStore>((set) => ({
  stations: [],
  currentPage: 1,
  selectedStation: null,
  selectedStationHistoric: null,
  setStations: (stations: Station[]) => set({ stations }),
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  setSelectedStation: (station: DetailStation | null) =>
    set({ selectedStation: station }),
  setSelectedStationHistoric: (station: Historic | null) =>
    set({ selectedStationHistoric: station }),
}));
