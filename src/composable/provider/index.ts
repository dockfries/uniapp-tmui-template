import { useAppStore } from "@/store/useAppStore";
import type { IModalProps } from "@/types";

export const useMessage = () => computed(() => useAppStore().providers.message?.instance);
export const useModal = (props?: IModalProps) =>
  computed(() => {
    const modalInject = useAppStore().providers.modal;
    const { instance, setConfig } = modalInject;
    if (!instance) return null;
    if (props && setConfig && instance) setConfig(props);
    return {
      instance,
      setConfig,
      open: instance.open,
      close: instance.close,
    };
  });
