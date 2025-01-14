import { createContext } from "react";

export type routes = undefined | "main" | "practice";

export const RouteContext = createContext<routes>(undefined);
