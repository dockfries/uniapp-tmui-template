import pagesJson from "@/pages.json";
import { IPageOpts, IPagesJson } from "@/types";
import { pick } from "lodash-es";

export const pickItems = ["name", "path", "meta"];

const pickPages = (p: IPageOpts, root = "") => {
  const page = pick(p, pickItems);
  if (root && page.path) page.path = root + "/" + page.path;
  return page;
};

const mainPages = (pagesJson as IPagesJson).pages.map((p) => pickPages(p));

const subPages =
  (pagesJson as IPagesJson).subPackages?.map((s) => {
    return s.pages.map((p: IPageOpts) => pickPages(p, s.root));
  }) || [];

const allPages = [...mainPages, ...subPages.flat()];

export const getPathByName = (name?: string) => {
  if (!name) return;
  const isInPage = allPages.find((p) => p.name === name)?.path;
  return isInPage;
};

export const getRouteByPath = (path?: string) => {
  if (!path) return;
  const isInPage = allPages.find((p) => p.path === path);
  return isInPage;
};

const tabBarPages = (pagesJson as IPagesJson).tabBar?.list.map((t) => t.pagePath) || [];

export const isTabBarPage = (path?: string) => {
  if (!path) return;
  return tabBarPages.includes(path);
};
