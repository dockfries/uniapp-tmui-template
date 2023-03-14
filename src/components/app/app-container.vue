<script setup lang="ts">
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import { useRoute } from "@/composable/router/useRoute";
import { isTabBarPage, mainPages } from "@/router/loader";
import { theme } from "@/theme";
import type { IAppTabBarConfig } from "@/types";
import { useRouter } from "@/composable/router/useRouter";

interface IAppNavBarConfig {
  title: string;
}

interface IAppContainerProps {
  config?: {
    nav?: IAppNavBarConfig;
    tab?: IAppTabBarConfig;
  };
}

defineProps<IAppContainerProps>();

const route = useRoute();
const router = useRouter();
const store = useTmpiniaStore();

const pageTitle: string = route.meta?.title;

const isHomePage = isTabBarPage(route.path) || route.path === mainPages[0].path;
const pageStackLength = getCurrentPages().length;
const goHome = () => router.push({ path: mainPages[0].path });
</script>

<template>
  <TmApp class="_relative" :class="[{ dark: store.tmStore.dark }]" :dark-color="theme.black">
    <TmNavbar :title="config?.nav?.title || pageTitle" hide-home hide-back>
      <template #left>
        <view class="_flex _items-center _px-2">
          <view
            v-show="!isHomePage && pageStackLength === 1"
            class="i-icon-home _text-xl _cursor-pointer dark:_text-white"
            @click="goHome"
          />
          <view
            v-show="!isHomePage && pageStackLength > 1"
            class="_flex _items-center _cursor-pointer dark:_text-white"
            @click="router.back()"
          >
            <view class="i-icon-back _text-2xl" />
            <view>返回</view>
          </view>
        </view>
      </template>
    </TmNavbar>
    <slot />
    <AppTabbar v-if="isHomePage" :config="config?.tab" />
    <AppProvider />
  </TmApp>
</template>
