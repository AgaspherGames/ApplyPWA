import { create } from "zustand";
import { Internship } from "../../internship";
import { FavoriteApi } from "../api";

interface FavoriteState {
  favorites: Internship[];
  setFavorites: () => void;
  isFavorite: (id: string) => boolean;
  addFavorite: (internship: Internship) => void;
  removeFavorite: (internship: Internship) => void;
}

export const useFavoriteStore = create<FavoriteState>()((set) => ({
  favorites: [],
  setFavorites: async () => {
    const favorites = await (
      await FavoriteApi.getFavoriteInternships()
    ).data.internships;
    set(() => ({
      favorites: favorites,
    }));
  },
  addFavorite: async (internship) => {
    set((state) => ({
      favorites: [...state.favorites, internship],
    }));
    await FavoriteApi.addFavoriteInternship(internship.id);
    const state = useFavoriteStore.getState();
    await state.setFavorites();
  },
  removeFavorite: async (internship) => {
    set((state) => ({
      favorites: state.favorites.filter((x) => x.id != internship.id),
    }));
    await FavoriteApi.removeFavoriteInternship(internship.id);
    const state = useFavoriteStore.getState();
    await state.setFavorites();
  },
  isFavorite: (id) => {
    const state = useFavoriteStore.getState();
    console.log(state.favorites.findIndex((x) => x.id == id));

    return false;
  },
}));

export const isFavoriteGetter = (id: string) => {
  return (state: FavoriteState) =>
    !~state.favorites.findIndex((x) => x.id == id);
};
