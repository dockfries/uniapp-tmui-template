<template>
  <tm-app :class="[{ dark: store.tmStore.dark }, '_relative']" :dark-color="theme.black">
    <tm-navbar
      :title="pageTitle"
      :shadow="0"
      :hide-home="isHideHome"
      :home-path="mainPages[0].path"
    >
      <template #left>
        <view class="_flex _flex-row">
          <tm-icon
            name="tmicon-ios-sunny"
            _class="px-24"
            :color="store.tmStore.dark ? 'yellow' : ''"
            :font-size="32"
            @click="toggleDarkMode"
          />
        </view>
      </template>
    </tm-navbar>
    <slot />
    <app-tabbar />
    <app-provider />
  </tm-app>
</template>
<script setup lang="ts">
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import { useRoute } from "@/composable/router/useRoute";
import { isTabBarPage, mainPages } from "@/router/loader";
import { theme } from "@/theme";

const route = useRoute();

const pageTitle: string = route.meta?.title;

const isHideHome = isTabBarPage(route.path) || route.path === mainPages[0].path;

const store = useTmpiniaStore();

const toggleDarkMode = () => store.setTmVuetifyDark(!store.tmStore.dark);
</script>
