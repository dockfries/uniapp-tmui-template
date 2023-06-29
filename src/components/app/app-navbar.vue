<script setup lang="ts">
import type { IAppNavBarConfig } from "@/types";
import { isTabBarPage } from "@/utils";

interface IAppNavBarProps {
  isHomePage: boolean;
  config?: IAppNavBarConfig;
}
defineProps<IAppNavBarProps>();

const route = useRoute();
const router = useRouter();

const pageTitle = computed<string>(() => {
  return route.meta?.title || "";
});

const pageStackLength = getCurrentPages().length;

const goHome = () => {
  const path = router.routes[0].path;
  isTabBarPage(path) ? router.pushTab({ path }) : router.push({ path });
};
</script>

<template>
  <TmNavbar :title="config?.title || pageTitle" hide-home hide-back>
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
</template>
