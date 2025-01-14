import { create } from "zustand";
import { ICity, IArea } from "./types";
import http from "@/shared/api";
import axios from "axios";

interface CityState {
  cities: IArea[];
  loadCities: () => void;
}

export const useCityStore = create<CityState>()((set) => ({
  cities: [],
  loadCities: async () => {
    const cities = (
      await http.get<IArea[]>(import.meta.env.VITE_BACKEND_URL + "/city")
    ).data;
    set(() => {
      return { cities };
    });
  },
}));
