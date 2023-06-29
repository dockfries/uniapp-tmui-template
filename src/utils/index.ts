import router from "@/router";

export const isTabBarPage = (path?: string) => {
  if (!path) return;
  if (router.routes[0] && router.routes[0].aliasPath === path) return true;
  return (uni.$tm.tabBar?.list ?? []).some((t) => `/${t.pagePath}` === path);
};

export const watchOnce = (
  source: () => any,
  callback: (newVal: any, oldVal: any) => any,
  options = {}
) => {
  const stopWatch = watch(
    source,
    (newVal, oldVal) => {
      callback(newVal, oldVal);
      stopWatch();
    },
    options
  );
};
