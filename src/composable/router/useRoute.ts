import { getRouteByPath, pickItems } from "@/router/loader";
import { ICrazyRoute } from "@/types";
import { merge, pick } from "lodash-es";

export const useRoute = () => {
  const pageStack = getCurrentPages();
  const {
    route: path,
    $routeParams,
    $page: { options },
  } = pageStack[pageStack.length - 1] as ICrazyRoute;

  const routeInfo = getRouteByPath(path) || {};
  return merge(
    { query: merge({}, options, $routeParams || {}) },
    pick(routeInfo, pickItems)
  );
};
