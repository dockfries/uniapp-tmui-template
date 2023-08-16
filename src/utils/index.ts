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

export function getBoundingClientRect(dom: string, inThis = false) {
  return new Promise<any>((resolve) => {
    const selector = inThis
      ? uni.createSelectorQuery().in(getCurrentInstance())
      : uni.createSelectorQuery();
    return selector.select(dom).boundingClientRect(resolve).exec();
  });
}

export async function navigateToDom(root: string, element: string, patchNavHeight = 0) {
  const rootDom = await getBoundingClientRect(root);
  const elementDom = await getBoundingClientRect(element);
  return new Promise((resolve) => {
    uni.pageScrollTo({
      scrollTop: elementDom.top - rootDom.top - patchNavHeight,
      complete() {
        resolve(null);
      },
    });
  });
}
