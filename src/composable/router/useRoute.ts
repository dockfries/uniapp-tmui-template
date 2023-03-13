import { merge, pick } from "lodash-es";
import { getRouteByPath, pickItems } from "@/router/loader";
import type { ICrazyRoute } from "@/types";

export const useRoute = () => {
  const pageStack: ICrazyRoute[] = getCurrentPages();
  const { route: path, $routeParams } = pageStack[pageStack.length - 1];
  let options;
  // #ifdef MP
  options = pageStack[pageStack.length - 1].options;
  // #endif
  // #ifndef MP
  options = pageStack[pageStack.length - 1].$page.options;
  // #endif

  const routeInfo = getRouteByPath(path) || {};
  return merge({ query: merge({}, options, $routeParams || {}) }, pick(routeInfo, pickItems));
};
