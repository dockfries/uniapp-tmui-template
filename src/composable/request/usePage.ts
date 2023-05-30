import type { Route } from "uni-mini-router";
import { useAppStore } from "@/store/useAppStore";

export const usePage = (route: Route) => {
  return computed(() => useAppStore().pagingRef.get(route.path!)?.value);
};
