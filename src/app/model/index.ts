import { create } from "zustand";

interface AppState {
  isTabBarOpen: boolean;
  isServicesMenuOpen: boolean;
  isAuthLoaded: boolean;
  setIsTabBarOpen: (isTabBarOpen: boolean) => void;
  setIsAuthLoaded: (isAuthLoaded: boolean) => void;
  setIsServicesMenuOpen: (isServicesMenuOpen: boolean) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  isTabBarOpen: true,
  isServicesMenuOpen: false,
  isAuthLoaded: false,
  setIsAuthLoaded: (isAuthLoaded) => set(() => ({ isAuthLoaded })),
  setIsTabBarOpen: (isTabBarOpen) => set(() => ({ isTabBarOpen })),
  setIsServicesMenuOpen: (isServicesMenuOpen) =>
    set(() => ({ isServicesMenuOpen })),
}));
