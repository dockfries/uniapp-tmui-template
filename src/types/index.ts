import type tmMessage from "@/tmui/components/tm-message/tm-message.vue";
import type tmModal from "@/tmui/components/tm-modal/tm-modal.vue";
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
  errModal?: boolean;
}

export interface ICommonResponse<T = Record<string, any>> {
  code: number;
  data?: T;
  msg?: string;
}

export type mixinErrorResult = fetchConfigSuccessType & { errMsg: string };

export type AppMessageInstance = InstanceType<typeof tmMessage>;
export type AppModalInstance = InstanceType<typeof tmModal>;

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

export interface IModalProps {
  mask?: boolean;
  border?: number;
  width?: number;
  height?: number;
  round?: number;
  duration?: number;
  overlayClick?: boolean;
  transparent?: boolean;
  closeable?: boolean;
  color?: string;
  title?: string;
  okText?: string;
  okColor?: string;
  okLinear?: string;
  okLinearDeep?: string;
  btnRound?: number;
  hideCancel?: boolean;
  content?: string;
  disabled?: boolean;
  titleStyle?: string;
  zIndex?: number;
  onOpen?: () => void;
  onClose?: () => boolean | Promise<boolean>;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClick?: () => void;
}

export interface IAppProviders {
  message: { instance?: Ref<AppMessageInstance | null> };
  modal: {
    instance?: Ref<AppModalInstance | null>;
    setConfig?: (props: IModalProps) => void;
  };
}
