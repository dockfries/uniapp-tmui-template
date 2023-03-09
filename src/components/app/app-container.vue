<template>
  <tm-app :class="[{ dark: store.tmStore.dark }, '_relative']">
    <tm-navbar :title="pageTitle" :shadow="0" :hide-home="isHideHome">
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
    <app-provider />
  </tm-app>
</template>
<script setup lang="ts">
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import { useRoute } from "@/composable/router/useRoute";
import { isTabBarPage } from "@/router/loader";

const route = useRoute();

const pageTitle: string = route.meta?.title;

const isHideHome = isTabBarPage(route.path);

const store = useTmpiniaStore();

const toggleDarkMode = () => store.setTmVuetifyDark(!store.tmStore.dark);
</script>
