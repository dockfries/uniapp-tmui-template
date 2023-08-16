<script setup lang="ts">
interface CommonSelectProps {
  modelValue: any;
  placeholder?: string;
}

defineProps<CommonSelectProps>();
defineEmits(["update:modelValue"]);

const isShow = ref(false);
const modelStr = ref("");
</script>

<template>
  <view
    class="common-card common-shadow _flex _items-center _justify-between _bg-white"
    tabindex="0"
    @click="isShow = !isShow"
  >
    <view :class="[!modelStr ? '_text-#71717A' : '']">{{ modelStr || placeholder }}</view>
    <view
      class="i-icon-chevron-down _text-#71717A _rotate-0 _transition-all _duration-300"
      :class="[{ '_rotate-180': isShow }]"
    ></view>
  </view>

  <tm-picker
    v-model:show="isShow"
    v-bind="$attrs"
    v-model:model-str="modelStr"
    :model-value="modelValue"
    @close="isShow = false"
    @update:model-value="(val: any) => $emit('update:modelValue', val)"
  />
</template>
