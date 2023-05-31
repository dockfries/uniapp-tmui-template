import type { Route } from "uni-mini-router";
import { useAppStore } from "@/store/useAppStore";

export const usePage = (route: Route) => {
  const path = route.path;
  return computed(() => useAppStore().pagingRef.get(path!)?.value);
};
