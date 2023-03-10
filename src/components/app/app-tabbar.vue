<template>
  <view class="_fixed _left-0 _right-0 _bottom-0 _flex app-tabbar">
    <view
      v-for="item in list"
      :key="item.route"
      :class="[
        '_flex _flex-col _justify-center _items-center _flex-1',
        `_bg-${background} dark:_bg-${darkBackground}`,
        _class,
      ]"
    >
      <view
        :class="[
          `_text-xl`,
          `i-icon-${isActive(item) ? item.activeIcon : item.icon}`,
          isActive(item) ? item.iconActiveClass : item.iconClass,
        ]"
      />

      <view :class="['_mt-2', isActive(item) ? item.textActiveClass : item.textClass]">{{
        item.text
      }}</view>
    </view>
  </view>
  <view :style="{ height: patchHeight + 'px' }"></view>
</template>
<script setup lang="ts">
import { useRoute } from "@/composable/router/useRoute";

import { theme } from "@/theme";

const route = useRoute();

const isActive = (item: IAppTabBarItem) => route.path === item.route;

const patchHeight = ref<number>(0);

interface IAppTabBarItem {
  icon: string;
  activeIcon?: string;
  text: string;
  route: string;
  iconClass?: string;
  iconActiveClass?: string;
  textClass?: string;
  textActiveClass?: string;
}

interface IAppTabBarProps {
  _class?: string;
  background?: string;
  darkBackground?: string;
  list?: IAppTabBarItem[];
}

withDefaults(defineProps<IAppTabBarProps>(), {
  background: theme.white,
  darkBackground: theme.black,
  list: () => [],
});

uni.hideTabBar();

onMounted(() => {
  const selector = uni.createSelectorQuery().in(this);
  const tabBar = selector.select(".app-tabbar");
  const setPatchHeight = ({ height }: any) => {
    patchHeight.value = height;
  };
  tabBar.boundingClientRect(setPatchHeight).exec();
});
</script>
