<script setup lang="ts">
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";

import { tmConfig } from "@/config";
import type { IAppNavBarConfig, IAppTabBarConfig } from "@/types";
import { isTabBarPage } from "@/utils";

interface IAppContainerProps {
  modelValue?: any;
  config?: {
    color?: string;
    darkColor?: string;
    nav?: IAppNavBarConfig | false;
    tab?: IAppTabBarConfig | false;
  };
}

const props = defineProps<IAppContainerProps>();

const emit = defineEmits(["query", "update:modelValue"]);
const router = useRouter();
const store = useTmpiniaStore();

const currentPages = getCurrentPages();

const route = { path: `/${currentPages[currentPages.length - 1].route}` };

const isHomePage = isTabBarPage(route.path) || route.path === router.routes[0].path;
const darkColor = props.config?.darkColor ?? (tmConfig.theme as Record<string, string>).black;

const emitQuery = (...args: any[]) => {
  emit("query", ...args);
};
</script>

<template>
  <!-- #ifdef MP -->
  <view class="_h-screen">
    <!-- #endif -->
    <TmApp
      class="_relative"
      :class="[{ dark: store.tmStore.dark }]"
      :color="config?.color"
      :dark-color="darkColor"
    >
      <AppScroll
        v-if="modelValue !== undefined"
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        @query="emitQuery"
      >
        <template #top>
          <slot name="top">
            <AppNavbar
              v-if="config?.nav !== false"
              :is-home-page="isHomePage"
              :config="config?.nav"
            />
            <view v-else class="_w-full" style="height: var(--status-bar-height)"></view>
          </slot>
        </template>
        <slot />
        <template #cell>
          <slot name="cell" />
        </template>
        <template #bottom>
          <slot name="bottom">
            <AppTabbar v-if="config?.tab !== false && isHomePage" :config="config?.tab" />
          </slot>
        </template>
      </AppScroll>
      <template v-else>
        <slot name="top">
          <AppNavbar
            v-if="config?.nav !== false"
            :is-home-page="isHomePage"
            :config="config?.nav"
          />
          <view v-else class="_w-full" style="height: var(--status-bar-height)"></view>
        </slot>
        <slot />
        <slot name="bottom">
          <AppTabbar v-if="config?.tab !== false && isHomePage" :config="config?.tab" />
        </slot>
      </template>
      <AppProvider />
    </TmApp>
    <!-- #ifdef MP -->
  </view>
  <!-- #endif -->
</template>
