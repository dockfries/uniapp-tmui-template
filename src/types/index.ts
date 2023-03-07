import uniCrazyRouter from "uni-crazy-router";

export interface ITabBar {
  list: ITabBarItem[];
  [k: string]: any;
}

export interface ITabBarItem {
  pagePath: string;
  text: string;
  [k: string]: any;
}

export interface IPushReplaceOpts {
  name?: string;
  path?: string;
  query?: Record<string, unknown>;
}

export interface IPageOpts {
  path: string;
  name?: string;
  meta?: Record<string, any>;
  style?: Record<string, any>;
}

export interface ISubPackage {
  root: string;
  pages: IPageOpts[];
}

export interface IPagesJson {
  pages: IPageOpts[];
  subPackages?: ISubPackage[];
  tabBar?: ITabBar;
  [k: string]: any;
}

export interface ICrazyRoute extends Page.PageInstance {
  $routeParams: Record<string, unknown>;
  $passedParams: Record<string, unknown>;
  $page: {
    options?: Record<string, unknown>;
    [k: string]: any;
  };
}

export interface IRouterGuard {
  beforeEach?: (
    to: Partial<IPageOpts>,
    from: Partial<IPageOpts>,
    next: () => void
  ) => void;
  afterEach?: (to: Partial<IPageOpts>, from: Partial<IPageOpts>) => void;
  instance: uniCrazyRouter;
}
