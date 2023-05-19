export const isTabBarPage = (path?: string) => {
  if (!path) return;
  return (uni.$tm.tabBar?.list ?? []).some((t) => `/${t.pagePath}` === path);
};
