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

export const useList = <T extends (reqArg: IRequestPageParams) => Promise<IResponsePagedData>>(
  requestFn: T,
  options: IUseListOpts = {}
) => {
  const loading = ref(false); // 是否请求中
  const curPage = ref(options.page || 1); // 当前页
  const total = ref(0); // 总页数
  const pageSize = ref(options.size || 10); // 每次请求的分页大小
  const noMore = ref(false);
  const noData = ref(false);

  const list = ref<Awaited<ReturnType<typeof requestFn>>["data"]>([]); // 请求回来的某页数据

  const loadData = async (resetList = false) => {
    if (!resetList && noMore) return;
    try {
      noMore.value = false;
      noData.value = false;

      loading.value = true;

      const result = await requestFn({ size: pageSize.value, page: curPage.value });
      if (!resetList) list.value = [list.value, ...result.data];
      else list.value = result.data || [];

      total.value = result.total || 0;
      if (curPage.value > 1 && !list.value.length) noMore.value = true;
      if (curPage.value === 1 && (!list.value.length || total.value === 0)) noData.value = true;

      options?.onSuccess?.();
    } catch (error) {
      options?.onError?.(error);
    } finally {
      loading.value = false;
    }
  };

  // 监听分页大小改变
  watch(
    () => pageSize.value,
    (_, prev) => {
      if (prev !== 1) curPage.value = 1;
      else loadData(true);
    }
  );

  // 监听页码大小改变
  watch(
    () => curPage.value,
    (curr, prev) => {
      loadData(options.reset !== false && curr < prev);
    }
  );

  // setup阶段立即执行请求
  options.immediate !== false && loadData(true);

  return {
    loading,
    curPage,
    total,
    list,
    pageSize,
    loadData,
    noData,
    noMore,
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
