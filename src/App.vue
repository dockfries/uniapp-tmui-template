<script setup lang="ts">
import { merge } from "lodash-es";
import { innerRoute, setFromTo } from "@/router";
import { getRouteByPath } from "@/router/loader";
import "@/router/guard";

onLaunch((opts) => {
  if (!opts) return;
  const { path, query } = opts;
  const additionTo = getRouteByPath(path);
  const innerTo = merge(additionTo, { query });
  innerRoute.afterEach?.(null, innerTo);
  setFromTo(innerTo);
});
</script>

<template>
  <slot />
</template>

<style lang="scss">
@import "../assets/css/common.scss";

/* #ifdef APP-PLUS-NVUE */
@import "./tmui/scss/nvue.css";
/* #endif */

/* #ifndef APP-PLUS-NVUE */
@import "./tmui/scss/noNvue.css";
/* #endif */

/* #ifdef H5 */
body::-webkit-scrollbar,
div::-webkit-scrollbar,
*::-webkit-scrollbar {
  display: none;
}
/* #endif */
</style>
