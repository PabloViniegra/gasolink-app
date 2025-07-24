import { create } from "zustand";
import { Province } from "../types";

interface ProvinceStore {
    provinces: Province[];
    selectedProvinceId: number;
    setProvinces: (provinces: Province[]) => void;
    setSelectedProvinceId: (provinceId: number) => void;
}

export const useProvinceStore = create<ProvinceStore>((set) => ({
    provinces: [],
    selectedProvinceId: 1,
    setProvinces: (provinces: Province[]) => set({ provinces }),
    setSelectedProvinceId: (provinceId: number) => set({ selectedProvinceId: provinceId }),
}));
