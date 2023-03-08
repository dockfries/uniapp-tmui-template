import AppContainer from "@/components/app/app-container.vue";

interface IUseRequest {
  instance: InstanceType<typeof AppContainer> | null;
  requestFn: (...args: unknown[]) => unknown;
}

export const useRequest = (params: IUseRequest) => {
  params.instance?.exposed.setRequestFn(params.requestFn);
  return params.instance?.exposed;
  // ReturnType
};
