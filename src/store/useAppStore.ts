import type { IAppProviders } from "@/types";

export const useAppStore = defineStore("app", () => {
  const providers = reactive<IAppProviders>({ message: {}, modal: {} });
  return { providers };
});
