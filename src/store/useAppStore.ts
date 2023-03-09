import { AppMessageInstance } from "@/types";

interface IAppProviders {
  messageInstance?: Ref<AppMessageInstance | null>;
}

export const useAppStore = defineStore("app", () => {
  const providers = reactive<IAppProviders>({});
  return { providers };
});
