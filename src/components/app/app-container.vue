<script setup lang="ts">
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import { useRoute } from "@/composable/router/useRoute";
import { isTabBarPage, mainPages } from "@/router/loader";
import { theme } from "@/theme";

const route = useRoute();

const pageTitle: string = route.meta?.title;

const isHomePage = isTabBarPage(route.path) || route.path === mainPages[0].path;

const store = useTmpiniaStore();

const toggleDarkMode = () => store.setTmVuetifyDark(!store.tmStore.dark);
</script>

<template>
  <TmApp class="_relative" :class="[{ dark: store.tmStore.dark }]" :dark-color="theme.black">
    <TmNavbar :title="pageTitle" :shadow="0" :hide-home="isHomePage" :home-path="mainPages[0].path">
      <template #left>
        <view class="_flex _flex-row">
          <TmIcon
            name="tmicon-ios-sunny"
            _class="px-24"
            :color="store.tmStore.dark ? 'yellow' : ''"
            :font-size="32"
            @click="toggleDarkMode"
          />
        </view>
      </template>
    </TmNavbar>
    <slot />
    <AppTabbar v-if="isHomePage" />
    <AppProvider />
  </TmApp>
</template>
