<template>
  <d-scroll
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
      <tm-result :show-btn="false" />
    </template>
    <template #loadmorer="{ loading }">
      <tm-spin :load="loading" />
    </template>
    <template #noMore>
      <view class="_p-4">
        <tm-divider label="没有更多数据了" :font-size="28" />
      </view>
    </template>
    <template #error>
      <tm-result
        :show-btn="false"
        color="error"
        status="error"
        title="服务异常"
        sub-title="请稍后刷新重试"
      />
    </template>
  </d-scroll>
</template>
<script setup lang="ts">
import { IAppScrollConfig, IAppScrollEvent } from "@/types";
import DScroll from "@dimple-smile/uni-scroll";

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
