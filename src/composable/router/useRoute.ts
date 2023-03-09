import { getRouteByPath, pickItems } from "@/router/loader";
import { ICrazyRoute } from "@/types";
import { merge, pick } from "lodash-es";

export const useRoute = () => {
  const pageStack: ICrazyRoute[] = getCurrentPages();
  const { route: path, $routeParams } = pageStack[pageStack.length - 1];
  // #ifdef MP
  const { options } = pageStack[pageStack.length - 1];
  // #endif
  // #ifndef MP
  const { options } = pageStack[pageStack.length - 1].$page;
  // #endif

  const routeInfo = getRouteByPath(path) || {};
  return merge({ query: merge({}, options, $routeParams || {}) }, pick(routeInfo, pickItems));
};
