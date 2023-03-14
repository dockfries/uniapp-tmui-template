import type uniCrazyRouter from "uni-crazy-router";
import type tmMessage from "@/tmui/components/tm-message/tm-message.vue";

export interface ITabBar {
  list: ITabBarItem[];
  [k: string]: any;
}

export interface ITabBarItem {
  pagePath: string;
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
  options?: Record<string, unknown>;
}

export interface IRouterGuard {
  beforeEach?: (to: Partial<IPageOpts>, from: Partial<IPageOpts>, next: () => void) => void;
  afterEach?: (to: Partial<IPageOpts>, from: Partial<IPageOpts>) => void;
  instance: uniCrazyRouter;
}

export interface IReqConfig extends fetchConfig {
  errModal?: boolean;
}

export interface ICommonResponse<T = Record<string, any>> {
  code: number;
  data?: T;
  msg?: string;
}

export type mixinErrorResult = fetchConfigSuccessType & { errMsg: string };

export type AppMessageInstance = InstanceType<typeof tmMessage>;

export interface IAppScrollConfig {
  refresh?: boolean;
  noMore?: boolean;
  noData?: boolean;
  error?: boolean;
}

export interface IAppScrollEvent {
  loadmore: boolean;
  stop: () => void;
}

export interface IResponsePagedData<T = any> {
  data: T;
  total: number;
}

export interface IUseListOpts {
  page?: number;
  size?: number;
  immediate?: boolean;
  reset?: boolean;
  onError?: (err: unknown) => void;
  onSuccess?: () => void;
}

export interface IRequestPageParams {
  size: number;
  page: number;
}

export interface IAppTabBarItem {
  icon: string;
  activeIcon?: string;
  text: string;
  route: string;
  iconClass?: string;
  iconActiveClass?: string;
  textClass?: string;
  textActiveClass?: string;
}

export interface IAppTabBarConfig {
  _class?: string;
  background?: string;
  darkBackground?: string;
  list?: IAppTabBarItem[];
}
