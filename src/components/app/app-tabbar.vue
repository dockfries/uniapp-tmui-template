<script setup lang="ts">
import type { IAppTabBarConfig, IAppTabBarItem } from "@/types";
import { isTabBarPage } from "@/utils";

interface IAppTabBarProps {
  config?: IAppTabBarConfig;
}

const props = defineProps<IAppTabBarProps>();

const router = useRouter();

const tabBarList = computed(() => {
  return (
    router.routes
      .filter((p: any) => isTabBarPage(p.path))
      .map((t: any): IAppTabBarItem => {
        return {
          icon: t.meta?.icon,
          text: t.meta?.title,
          route: t.path || "",
        };
      }) || []
  );
});

const config = computed(() => {
  return props.config || {};
});

const curKeepAliveRoute = computed(() => `/${getCurrentPages()[0].route}`);

const isURL = (url: string) => /^(http)s?/.test(url);

const patchHeight = ref<number>(0);

onMounted(() => {
  uni.$tm.tabBar.selectedColor = ""; // 兼容tmui深色切换
  uni.hideTabBar();
  const instance = getCurrentInstance();
  const selector = uni.createSelectorQuery().in(instance);
  const tabBar = selector.select(".app-tabbar");
  if (!tabBar) return;
  const setPatchHeight = ({ height }: any) => {
    patchHeight.value = height;
  };
  tabBar.boundingClientRect(setPatchHeight).exec();
});
</script>

<template>
  <view
    class="dark:_bg-dark-100 _fixed _left-0 _right-0 _bottom-0 _flex _z-100 _shadow dark:_shadow-none app-tabbar"
    :class="[config._class]"
    bg="white"
    p="2"
  >
    <view
      v-for="item in tabBarList"
      :key="item.route"
      class="_flex _flex-col _justify-center _items-center _flex-1"
      :class="[
        `${
          item.route === curKeepAliveRoute ? '_text-primary-500 dark:_text-white' : '_text-#636263'
        }`,
      ]"
      @click="item.route !== curKeepAliveRoute && router.pushTab({ path: item.route })"
    >
      <TmImage
        v-if="isURL(item.icon)"
        :width="24"
        :height="24"
        :src="item.route === curKeepAliveRoute ? item.activeIcon || item.icon : item.icon"
        :_class="item.route === curKeepAliveRoute ? item.iconActiveClass : item.iconClass"
      />

      <view
        v-else
        class="_text-2xl"
        :class="[
          `${item.route === curKeepAliveRoute ? item.activeIcon || item.icon : item.icon}`,
          item.route === curKeepAliveRoute ? item.iconActiveClass : item.iconClass,
        ]"
      />

      <view
        class="_mt-1.5 _text-sm _font-semibold dark:_font-normal"
        :class="[item.route === curKeepAliveRoute ? item.textActiveClass : item.textClass]"
        >{{ item.text }}</view
      >
    </view>
  </view>
  <view :style="{ height: `${patchHeight}px` }" />
</template>
