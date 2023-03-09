<template>
  <app-container refresh loadmore>
    <view class="_text-primary-500 _m-4">
      <view class="f-center">
        <view class="i-icon-chip _text-warning-500 _text-2xl _mr-1" />
        <text class="_text-xl">兼容组件库所以类名前缀_</text>
      </view>
      <view class="_flex _gap-4 _mt-4 _p-4 _shadow _bg-white _rounded-md dark:_bg-gray-900">
        <tm-button @click="goLogin">跳转</tm-button>
        <tm-button @click="showMessage">组件消息框</tm-button>
      </view>
    </view>
  </app-container>
</template>

<script lang="ts" setup>
import { request } from "@/request";
import { useRouter } from "@/composable/router/useRouter";
import { useMessage } from "@/composable/provider/useMessage";

const router = useRouter();
const goLogin = () => router.push({ name: "login" });

const msg = useMessage();
const showMessage = () => {
  msg.value?.show({
    model: "error",
    text: "不能为空",
    mask: true,
  });
};

request<string>("ping", "GET")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
</script>
