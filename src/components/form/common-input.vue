<script setup lang="ts">
interface CommonInputProps {
  modelValue?: string;
  type?: string;
  textContentType?: string;
  password?: boolean;
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
withDefaults(defineProps<CommonInputProps>(), { maxlength: 512 });
defineEmits(["update:modelValue", "focus", "blur", "confirm", "keyboardheightchange"]);
</script>

<template>
  <view
    class="common-card common-shadow _flex _items-center _justify-between _bg-white _p-20rpx _h-80rpx _box-border"
    :class="disabled ? '_opacity-50' : ''"
  >
    <view class="_flex _items-center _flex-1">
      <slot name="left"></slot>
      <input
        class="_text-28rpx _flex-1"
        placeholder-class="_text-#71717A"
        :type="type"
        :textContentType="textContentType"
        :password="password"
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
      />
    </view>
    <slot name="right"> </slot>
  </view>
</template>

<style scoped></style>
