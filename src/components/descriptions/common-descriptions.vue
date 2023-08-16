<script setup lang="ts">
interface CommonDescriptionsProps {
  titleWidth?: number | string;
  border?: boolean;
  config?: {
    title: string;
    value: string | number;
    icon?: string;
    copyable?: boolean;
    showable?: boolean;
  }[];
}

withDefaults(defineProps<CommonDescriptionsProps>(), { titleWidth: 150 });

function copyValue(value: string | number) {
  uni.setClipboardData({ data: String(value) });
}
</script>

<template>
  <view>
    <template v-for="item in config" :key="item.title">
      <view
        v-if="item.showable === undefined ? true : item.showable"
        class="_flex _items-center _gap-16rpx"
        :class="{
          '_border-b-2rpx _border-b-solid _border-b-#E6E6E6 last:_border-b-none _py-24rpx': border,
          '_mb-24rpx last:_mb-0': !border,
        }"
      >
        <view class="_flex _flex-shrink-0 _items-center">
          <view v-if="item.icon" class="_w-40rpx _h-40rpx _text-#A1A1AA" :class="item.icon"></view>
          <view
            class="_ml-8rpx _text-20rpx _text-#71717A _font-semibold"
            :style="{ width: `${titleWidth}rpx` }"
            >{{ item.title }}</view
          >
        </view>
        <view class="_flex _justify-between _items-start _w-full">
          <view class="_text-24rpx _font-semibold _text-#111827">{{ item.value }}</view>
          <view
            v-if="item.copyable"
            class="_font-bold _text-primary-500"
            @click="copyValue(item.value)"
            >复制</view
          >
        </view>
      </view>
    </template>
  </view>
</template>
