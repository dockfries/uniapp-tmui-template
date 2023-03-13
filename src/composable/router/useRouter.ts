import type { IPushReplaceOpts } from "@/types";
import { getPathByName, isTabBarPage } from "@/router/loader";

const routerFns = {
  push: (opts: IPushReplaceOpts, isReplace = false) => {
    const getPath = opts.path || getPathByName(opts.name);
    if (!getPath) throw new Error("页面不存在");
    const fail = (err: unknown) => {
      throw err;
    };
    if (isTabBarPage(getPath)) {
      uni.switchTab({ url: `/${getPath}`, fail });
      return;
    }
    const params = {
      url: `/${getPath}`,
      routeParams: opts.query ?? {},
      fail,
    };
    (isReplace ? uni.redirectTo : uni.navigateTo)(params);
  },
  replace(opts: IPushReplaceOpts) {
    this.push(opts, true);
  },
  back: (delta = 1) => uni.navigateBack({ delta }),
};

export const useRouter = () => routerFns;
