import { parse } from "qs";
import { cloneDeep, merge } from "lodash-es";
import { getPathByName, getRouteByPath, isTabBarPage } from "./loader";
import type { IInnerRoute, IPageOpts, IRouterStruct } from "@/types";

export const innerRoute: IInnerRoute = {
  from: null,
  prev: null,
  to: null,
  beforeEach: (from, to, next) => next(),
};

export const setFromTo = (to?: IPageOpts | null) => {
  if (innerRoute.from) innerRoute.prev = cloneDeep(innerRoute.from);
  innerRoute.from = to || innerRoute.to;
};

export const router: IRouterStruct = {
  push(opts, isReplace = false) {
    const getPath = opts.path || getPathByName(opts.name);
    if (!getPath) throw new Error("页面不存在");
    const fail = (err: unknown) => {
      throw err;
    };
    const additionTo = getRouteByPath(getPath);

    innerRoute.to = merge(additionTo, { query: opts.query ?? {} });

    const next = () => {
      if (isTabBarPage(getPath)) {
        uni.switchTab({ url: `/${getPath}`, success: () => setFromTo(), fail });
        return;
      }

      const params = {
        url: `/${getPath}${opts.query ? `?${parse(opts.query as Record<string, string>)}` : ""}`,
        success: () => setFromTo(),
        fail,
      };
      (isReplace ? uni.redirectTo : uni.navigateTo)(params);
    };
    if (!innerRoute.beforeEach) return next();
    innerRoute.beforeEach(innerRoute.from, innerRoute.to, next);
  },
  replace(opts) {
    this.push(opts, true);
  },
  back() {
    const next = () => {
      innerRoute.to = innerRoute.prev;
      uni.navigateBack({ delta: 1, success: () => setFromTo() });
    };

    if (!innerRoute.beforeEach) return next();
    innerRoute.beforeEach(innerRoute.from, innerRoute.prev, next);
  },
  beforeEach(fn) {
    innerRoute.beforeEach = fn;
  },
  afterEach(fn) {
    innerRoute.afterEach = fn;
  },
};
