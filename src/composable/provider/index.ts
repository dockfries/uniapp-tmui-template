import { useAppStore } from "@/store/useAppStore";
import type { IMessageInstConfig, IModalInstConfig, MessageProps, ModalProps } from "@/types";

export const useMessage = (props?: MessageProps) => {
  let messageInstance: IMessageInstConfig | undefined;

  if (!useAppStore().providers.message) {
    const stopWatch = watch(
      () => useAppStore().providers.message,
      (val) => {
        messageInstance = val?.(props);
        stopWatch();
      }
    );
  } else {
    messageInstance = useAppStore().providers.message?.(props);
  }
  return computed(() => messageInstance);
};

export const useModal = (props?: ModalProps) => {
  let modalInstance: IModalInstConfig | undefined;

  if (!useAppStore().providers.modal) {
    const stopWatch = watch(
      () => useAppStore().providers.modal,
      (val) => {
        modalInstance = val?.(props);
        stopWatch();
      }
    );
  } else {
    modalInstance = useAppStore().providers.modal?.(props);
  }
  return computed(() => modalInstance);

  // 无效
  // computed(() => {
  //   const modal = useAppStore().providers.modal;
  //   console.log("zxxxxxxxx");
  //   return modal?.(props);
  // });
};
