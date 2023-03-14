<script setup lang="ts">
import { useRoute } from "@/composable/router/useRoute";
import { useRouter } from "@/composable/router/useRouter";
import { mainPages, tabBarPages } from "@/router/loader";
import type { IAppTabBarConfig, IAppTabBarItem } from "@/types";

interface IAppTabBarProps {
  config?: IAppTabBarConfig;
}

withDefaults(defineProps<IAppTabBarProps>(), {
  config: () => {
    return {
      list:
        mainPages
          .filter((p) => p.path && tabBarPages.includes(p.path))
          .map((t): IAppTabBarItem => {
            return {
              icon: t.meta?.icon,
              text: t.meta?.title,
              route: t.path || "",
            };
          }) || [],
    };
  },
});

const route = useRoute();
const router = useRouter();

const isActive = (item: IAppTabBarItem) => route.path === item.route;
const isURL = (url: string) => /^(http)s?/.test(url);

const patchHeight = ref<number>(0);

onMounted(() => {
  uni.hideTabBar();
  const selector = uni.createSelectorQuery().in(this);
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
    class="_bg-white dark:_bg-dark-100 _fixed _left-0 _right-0 _bottom-0 _flex _p-2 _z-100 _shadow dark:_shadow-none app-tabbar"
    :class="[
      config.background ? `_bg-${config.background}` : '',
      config.darkBackground ? `dark:_bg-${config.darkBackground}` : '',
      config._class,
    ]"
  >
    <view
      v-for="item in config.list"
      :key="item.route"
      class="_flex _flex-col _justify-center _items-center _flex-1"
      :class="[`${isActive(item) ? '_text-primary-500 dark:_text-white' : '_text-#636263'}`]"
      @click="router.push({ path: item.route })"
    >
      <TmImage
        v-if="isURL(item.icon)"
        :width="24"
        :height="24"
        :src="isActive(item) ? item.activeIcon || item.icon : item.icon"
        :_class="isActive(item) ? item.iconActiveClass : item.iconClass"
      />

      <view
        v-else
        class="_text-2xl"
        :class="[
          `${isActive(item) ? item.activeIcon || item.icon : item.icon}`,
          isActive(item) ? item.iconActiveClass : item.iconClass,
        ]"
      />

      <view
        class="_mt-1.5 _text-sm _font-semibold dark:_font-normal"
        :class="[isActive(item) ? item.textActiveClass : item.textClass]"
        >{{ item.text }}</view
      >
    </view>
  </view>
  <view :style="{ height: `${patchHeight}px` }" />
</template>
