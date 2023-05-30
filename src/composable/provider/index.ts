import { useAppStore } from "@/store/useAppStore";
import type { IMessageInstConfig, IModalInstConfig, MessageProps, ModalProps } from "@/types";
import { watchOnce } from "@/utils";

export const useMessage = (props?: MessageProps) => {
  let messageInstance: IMessageInstConfig | undefined;

  if (!useAppStore().providers.message) {
    watchOnce(
      () => useAppStore().providers.message,
      (val) => (messageInstance = val?.(props))
    );
  } else {
    messageInstance = useAppStore().providers.message?.(props);
  }
  return computed(() => messageInstance);
};

export const useModal = (props?: ModalProps) => {
  let modalInstance: IModalInstConfig | undefined;

  if (!useAppStore().providers.modal) {
    watchOnce(
      () => useAppStore().providers.modal,
      (val) => (modalInstance = val?.(props))
    );
  } else {
    modalInstance = useAppStore().providers.modal?.(props);
  }
  return computed(() => modalInstance);
};
