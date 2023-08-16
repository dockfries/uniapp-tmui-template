<script setup lang="ts">
import { getBoundingClientRect } from "@/utils";

interface CommonBottomButtonsProps {
  config: {
    type?: "default" | "warning" | "primary" | "success" | "error" | "black-gold" | "error-line";
    label?: string;
    iconClass?: string | (string | object)[];
    _class?: string;
    loading?: boolean;
    disabled?: boolean;
  }[];
}

defineProps<CommonBottomButtonsProps>();
defineEmits(["click"]);

const placeholderHeight = ref(0);

onMounted(() => {
  getBoundingClientRect(".common-bottom-buttons__wrapper", true).then(({ height }) => {
    placeholderHeight.value = height;
  });
});
</script>

<template>
  <view
    class="common-bottom-buttons__wrapper safe-area _bg-white _border-t _border-t-solid _border-t-#E6E6E6 _fixed _bottom-0 _left-0 _right-0"
  >
    <view class="_p-24rpx _flex _gap-20rpx">
      <CommonButton
        v-for="(button, index) in config"
        :key="index"
        :class="button._class || '_flex-1'"
        :type="button.type"
        :label="button.label"
        :loading="button.loading"
        :disabled="button.disabled"
        :icon-class="button.iconClass"
        @click="$emit('click', button.label)"
      />
    </view>
  </view>

  <view
    class="common-bottom-buttons__placeholder"
    :style="{ height: `${placeholderHeight}px` }"
  ></view>
</template>

<style lang="scss" scoped>
.common-bottom-buttons__wrapper {
  height: 130rpx;
}
</style>
