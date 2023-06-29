import type { Route } from "uni-mini-router";
import { useAppStore } from "@/store/useAppStore";

export const usePage = (route: Route) => {
  const path = route.path;
  return computed(() => {
    const defaultRouteRef = useAppStore().pagingRef.get(path!)?.value;
    if (defaultRouteRef) return defaultRouteRef;

    if (!route.aliasPath) return;

    const aliasRouteRef = useAppStore().pagingRef.get(route.aliasPath)?.value;
    return aliasRouteRef;
  });
};
