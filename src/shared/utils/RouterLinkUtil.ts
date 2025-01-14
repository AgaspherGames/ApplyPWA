import { routes } from "@/app/providers/RouteContext";

export function routerLink(route: routes, path: string) {
  return `/${route}/${path}`;
}
