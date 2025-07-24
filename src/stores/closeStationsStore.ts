import { create } from "zustand";
import { NearStation } from "../types";

interface CloseStationsStore {
  closeStations: NearStation[];
  radio: number;
  pagina: number;
  limite: number;
  latitud: number;
  longitud: number;
  setCloseStations: (stations: NearStation[]) => void;
  setRadio: (stations: number) => void;
  setPagina: (pagina: number) => void;
  setLimite: (limite: number) => void;
  setLatitud: (latitud: number) => void;
  setLongitud: (longitud: number) => void;
}

export const useCloseStationsStore = create<CloseStationsStore>((set) => ({
  closeStations: [],
  setCloseStations: (stations) => set({ closeStations: stations }),
  radio: 10,
  pagina: 1,
  limite: 30,
  latitud: 0,
  longitud: 0,
  setRadio: (radio) => set({ radio }),
  setPagina: (pagina) => set({ pagina }),
  setLimite: (limite) => set({ limite }),
  setLatitud: (latitud) => set({ latitud }),
  setLongitud: (longitud) => set({ longitud }),
}));
