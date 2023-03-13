<script setup lang="ts">
import DScroll from "@dimple-smile/uni-scroll";
import type { IAppScrollConfig, IAppScrollEvent } from "@/types";

interface IAppScrollProps {
  config?: IAppScrollConfig;
}

withDefaults(defineProps<IAppScrollProps>(), {
  config() {
    return { refresh: true };
  },
});

const emit = defineEmits(["up", "down"]);

const onFetchData = (ev: IAppScrollEvent) => {
  emit(ev.loadmore ? "up" : "down", ev);
};

/* #ifdef H5 */
const dScrollPatch = ref<{ $el: HTMLDivElement } | null>(null);
onMounted(() => {
  const patchScrollDom = dScrollPatch.value?.$el.children[0].children[0].children[0].children;
  if (!patchScrollDom) return;
  patchScrollDom[0].appendChild(patchScrollDom[1]);
});
/* #endif  */
</script>

<template>
  <DScroll
    ref="dScrollPatch"
    :refresh-disabled="config.refresh === false"
    :no-more="config.noMore"
    :no-data="config.noData"
    :error="config.error"
    background="transparent"
    refresher-background="transparent"
    @fetch="onFetchData"
  >
    <slot />
    <template #noData>
      <TmResult :show-btn="false" />
    </template>
    <template #loadmorer="{ loading }">
      <TmSpin :load="loading" />
    </template>
    <template #noMore>
      <view class="_p-4">
        <TmDivider label="没有更多数据了" :font-size="28" />
      </view>
    </template>
    <template #error>
      <TmResult
        :show-btn="false"
        color="error"
        status="error"
        title="服务异常"
        sub-title="请稍后刷新重试"
      />
    </template>
  </DScroll>
</template>
