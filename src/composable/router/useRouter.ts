import { IPushReplaceOpts } from "@/types";
import { getPathByName, isTabBarPage } from "@/router/loader";

const routerFns = {
  push: (opts: IPushReplaceOpts, isReplace = false) => {
    const getPath = opts.path || getPathByName(opts.name);
    if (!getPath) return;
    if (isTabBarPage(getPath)) {
      uni.switchTab({ url: getPath });
      return;
    }
    uni[isReplace ? "redirectTo" : "navigateTo"]({
      url: getPath,
      routeParams: opts.query ?? {},
      fail(err) {
        throw err;
      },
    });
  },
  replace(opts: IPushReplaceOpts) {
    this.push(opts, true);
  },
  back: (delta = 1) => uni.navigateBack({ delta }),
};

export const useRouter = () => routerFns;
