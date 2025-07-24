import { create } from "zustand";
import { Locality } from "../types";

interface LocalityStore {
  localities: Locality[];
  selectedLocalityId: number | null;
  setLocalities: (localities: Locality[]) => void;
  setSelectedLocalityId: (localityId: number | null) => void;
}

export const useLocalityStore = create<LocalityStore>((set) => ({
  localities: [],
  selectedLocalityId: null,
  setLocalities: (localities: Locality[]) => set({ localities }),
  setSelectedLocalityId: (localityId: number | null) =>
    set({ selectedLocalityId: localityId }),
}));
