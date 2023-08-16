<script setup lang="ts">
interface IconTitleProps {
  _class?: string;
  icon: string;
  title: string;
}

defineProps<IconTitleProps>();
</script>

<template>
  <view class="_p-24rpx _flex _gap-16rpx _items-center" :class="[_class || '']">
    <view class="_text-48rpx" :class="[icon]"></view>
    <view class="_font-bold _text-36rpx">{{ title }}</view>
  </view>
</template>
