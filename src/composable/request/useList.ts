export interface IResponsePagedData<T = any> {
  data: T;
  total: number;
}

export interface IUseListOpts {
  page?: number;
  size?: number;
  onError?: (err: unknown) => void;
  onSuccess?: () => void;
  immediate?: boolean;
}

export interface IRequestPageParams {
  size: number;
  page: number;
}

export const useList = <T extends (reqArg: IRequestPageParams) => Promise<IResponsePagedData>>(
  requestFn: T,
  options: IUseListOpts = {}
) => {
  const loading = ref(false); // 是否请求中
  const curPage = ref(options.page || 1); // 当前页
  const total = ref(0); // 总页数
  const pageSize = ref(options.size || 10); // 每次请求的分页大小

  const list = ref<Awaited<ReturnType<typeof requestFn>>["data"]>([]); // 请求回来的某页数据

  const loadData = async (page = curPage.value, size = pageSize.value) => {
    try {
      loading.value = true;
      const result = await requestFn({ size, page });
      list.value = result.data;
      total.value = result.total || 0;
      options?.onSuccess?.();
    } catch (error) {
      options?.onError?.(error);
    } finally {
      loading.value = false;
    }
  };

  // 监听分页数据改变
  watch([curPage, pageSize], () => loadData());
  // setup阶段立即执行请求
  options.immediate !== false && loadData();

  return {
    loading,
    curPage,
    total,
    list,
    pageSize,
    loadData,
  };
};

// example
// const testRequest = (pageParams: IRequestPageParams) => {
//   request<IResponsePagedData<string[]>>("a", "GET", {
//     ...pageParams,
//     // ...其他一些请求字段
//   });
// };
// const { loading, list } = useList(testRequest);
