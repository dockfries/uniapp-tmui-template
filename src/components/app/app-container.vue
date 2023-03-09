<template>
  <tm-app :class="[{ dark: store.tmStore.dark }, '_relative']">
    <d-scroll
      :refresh-disabled="!props.refresh"
      :loadmore-disabled="!props.loadmore"
      :skip="requestInfo.skip"
      :total="requestInfo.total"
      class="!_absolute _w-full _h-full"
      background="transparent"
      refresher-background="transparent"
      @fetch="onFetchData"
    >
      <slot />
    </d-scroll>
    <app-provider />
  </tm-app>
</template>
<script setup lang="ts">
import DScroll from "@dimple-smile/uni-scroll";
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
const store = useTmpiniaStore();

interface IAppContainerProps {
  refresh?: boolean;
  loadmore?: boolean;
}

const props = withDefaults(defineProps<IAppContainerProps>(), {
  refresh: false,
  loadmore: false,
});

interface IDScrollFetchEv {
  skip: number;
  limit: number;
  total: number;
  page: number;
  loadmore: number;
  stop: () => void;
}

interface IDScrollInfo {
  skip: number;
  total: number;
  limit: number;
  requestFn?: (...args: any) => Promise<any>;
}

const requestInfo = reactive<IDScrollInfo>({ skip: -1, total: -1, limit: 20 });

const onFetchData = async (ev: IDScrollFetchEv) => {
  if (!requestInfo.requestFn) return;
  try {
    const { data, total } = await requestInfo.requestFn();
    // callback(data);
    requestInfo.total = total;
    if (requestInfo.skip === -1) requestInfo.skip = 0;
    requestInfo.skip += requestInfo.limit;
  } catch (err) {
    // callback(err);
  } finally {
    ev.stop();
  }
};

const setRequestFn = (fn: IDScrollInfo["requestFn"]) => (requestInfo.requestFn = fn);

const exposed = { setRequestFn, ...toRefs(requestInfo) };

defineExpose({ exposed });
</script>
