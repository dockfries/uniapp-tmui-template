import { getRouteByPath } from "./loader";
import uniCrazyRouter from "uni-crazy-router";
import { IRouterGuard } from "@/types";
import { merge } from "lodash-es";

const router: IRouterGuard = {
  instance: uniCrazyRouter,
};

const getEnhancedInfo = (to: any, from: any) => {
  const toInfo = getRouteByPath(to.url) || {};
  const fromInfo = getRouteByPath(from?.url) || {};
  merge(toInfo, { query: merge(to.query, to.routeParams) });
  merge(fromInfo, { query: merge(from.query, from.routeParams) });
  return { toInfo, fromInfo };
};

uniCrazyRouter.beforeEach((to, from, next) => {
  const { toInfo, fromInfo } = getEnhancedInfo(to, from);
  if (!router.beforeEach) return next();
  router.beforeEach(toInfo, fromInfo, next as any);
});

uniCrazyRouter.afterEach((to, from) => {
  const { toInfo, fromInfo } = getEnhancedInfo(to, from);
  router.afterEach && router.afterEach(toInfo, fromInfo);
});

export default router;
