<script setup lang="ts">
interface CommonTextAreaProps {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  maxlength?: number;
  cursorSpacing?: number;
  focus?: boolean;
  confirmType?: string;
  confirmHold?: boolean;
  cursor?: number;
  selectionStart?: number;
  selectionEnd?: number;
  adjustPosition?: boolean;
  autoBlur?: boolean;
}
withDefaults(defineProps<CommonTextAreaProps>(), { maxlength: 512 });
defineEmits([
  "update:modelValue",
  "focus",
  "blur",
  "confirm",
  "keyboardheightchange",
  "linechange",
]);
</script>

<template>
  <view class="common-card common-shadow _flex _items-center _justify-between _bg-white">
    <textarea
      class="_text-28rpx _w-full _h-200rpx"
      placeholder-class="_text-#71717A"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :cursorSpacing="cursorSpacing"
      :focus="focus"
      :confirmType="confirmType"
      :confirmHold="confirmHold"
      :cursor="cursor"
      :selectionStart="selectionStart"
      :selectionEnd="selectionEnd"
      :adjustPosition="adjustPosition"
      :autoBlur="autoBlur"
      :value="modelValue"
      @input="(e) => $emit('update:modelValue', e.detail.value)"
      @focus="(e) => $emit('focus', e)"
      @blur="(e) => $emit('blur', e)"
      @confirm="(e) => $emit('confirm', e)"
      @keyboardheightchange="(e) => $emit('keyboardheightchange', e)"
      @linechange="(e) => $emit('linechange', e)"
    />
  </view>
</template>
