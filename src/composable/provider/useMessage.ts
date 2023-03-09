import { useAppStore } from "@/store/useAppStore";

export const useMessage = () => computed(() => useAppStore().providers.messageInstance);
