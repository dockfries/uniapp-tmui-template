import type CommonModal from "@/components/modal/common-modal.vue";
import type { config as MessageConfig } from "@/tmui/components/tm-message/interface";
import type tmMessage from "@/tmui/components/tm-message/tm-message.vue";
import type { fetchConfig, fetchConfigSuccessType } from "@/tmui/tool/lib/interface";

export interface ITabBar {
  list: ITabBarItem[];
  [k: string]: any;
}

export interface ITabBarItem {
  pagePath: string;
  [k: string]: any;
}

export interface IReqConfig extends fetchConfig {
  errMessage?: boolean;
}

export interface ICommonResponse<T = Record<string, any>> {
  code: number;
  data?: T;
  msg?: string;
}

export type mixinErrorResult = fetchConfigSuccessType & { errMsg: string };

export type AppMessageInstance = InstanceType<typeof tmMessage>;
export type AppModalInstance = InstanceType<typeof CommonModal>;

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
  list?: IAppTabBarItem[];
}

export interface IAppNavBarConfig {
  title?: string;
  shadow?: number;
}

export type ModalProps = AppModalInstance["$props"];

export type MessageProps = AppMessageInstance["$props"] & MessageConfig;

export interface IAppProvider<T> {
  instance: T | null;
  key: string;
  destroy: () => void;
}

export type AppModalProvider = IAppProvider<AppModalInstance> & ModalProps;

export interface IModalInstConfig extends AppModalProvider {
  open: () => void;
  close: () => void;
}

export type AppMessageProvider = IAppProvider<AppMessageInstance> & MessageProps;

export interface IMessageInstConfig extends AppMessageProvider {
  show: () => void;
  hide: () => void;
  destroy: () => void;
}

export interface IAppProviders {
  message?: (props?: MessageProps) => IMessageInstConfig;
  modal?: (props?: ModalProps) => IModalInstConfig;
}
