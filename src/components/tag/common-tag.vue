<script setup lang="ts">
interface CommonTagProps {
  size?: string;
  type?: string;
  label?: string;
}
const props = withDefaults(defineProps<CommonTagProps>(), { type: "warning" });

const tagStyle = computed(() => {
  let colorByType = "";
  let size = "";

  switch (props.type) {
    case "success":
      colorByType = `_text-_wn_01A63E _bg-_wn_E8F6ED _border-_wn_BAE5C8`;
      break;
    case "warning":
      colorByType = `_text-warning-500 _bg-warning-50 _border-warning-200`;
      break;
    case "primary":
      colorByType = `_text-primary-500 _bg-primary-50 _border-primary-200`;
      break;
    default:
      break;
  }
  switch (props.size) {
    case "sm":
      size = `_px-8rpx _h-32rpx _font-normal _text-20rpx _rounded-4rpx`;
      break;
    default:
      size = "_px-16rpx _h-48rpx _font-medium _text-24rpx _rounded-10rpx";
      break;
  }

  return ["f-center", "_border-2rpx _border-solid", colorByType, size];
});
</script>

<template>
  <view :class="tagStyle">{{ props.label }}</view>
</template>
