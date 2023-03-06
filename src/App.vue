<template>
  <slot></slot>
</template>
<style>
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
