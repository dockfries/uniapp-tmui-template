import type { IAppProviders } from "@/types";

export const useAppStore = defineStore("app", () => {
  const providers = reactive<IAppProviders>({});
  const pagingRef = ref(new Map<string, Ref<any>>());
  return { providers, pagingRef };
});
