<script lang="ts" setup>
import { request } from "@/request";
import { useRouter } from "@/composable/router/useRouter";
import { useMessage, useModal } from "@/composable/provider";
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import type { IAppScrollConfig, IAppScrollEvent } from "@/types";

const store = useTmpiniaStore();

const router = useRouter();
const goLogin = () => router.push({ name: "login" });

const msg = useMessage();
const showMessage = () => {
  msg.value?.hide();
  msg.value?.show({
    model: "error",
    text: "不能为空",
    mask: true,
  });
};

const modal = useModal({
  title: "提示",
  content: "我是一个模态框",
  height: 300,
  onConfirm() {
    console.log("ok");
  },
  onCancel() {
    console.log("cancel");
  },
});
const showModal = () => {
  modal.value?.open();
};

const scrollConfig = reactive<IAppScrollConfig>({
  // refresh: false,
});

const down = async (ev: IAppScrollEvent) => {
  try {
    await request<string>("ping", "GET");
  } finally {
    ev.stop();
    scrollConfig.noMore = true;
  }
};
</script>

<template>
  <AppContainer>
    <view class="_m-4">
      <view class="f-center">
        <view class="i-icon-chip _text-warning-500 _text-2xl _mr-1" />
        <text class="_text-xl _text-primary-500">兼容组件库所以类名前缀_</text>
      </view>
      <view class="_flex _gap-4 _mt-4 _p-4 _shadow _bg-white _rounded-md dark:_bg-dark-100">
        <TmButton @click="goLogin">跳转</TmButton>
        <TmButton @click="showMessage">组件消息框</TmButton>
        <TmButton @click="showModal">模态框</TmButton>
      </view>
      <TmCell :margin="[0, 40]" title="深色模式">
        <template #right>
          <TmSwitch v-model="store.tmStore.dark" />
        </template>
      </TmCell>
    </view>
    <AppScroll :config="scrollConfig" @down="down" @up="down">
      <view class="dark:_text-light-900">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. A nulla quasi, repudiandae illo
        nihil, harum error voluptas maxime quia aliquid placeat? Recusandae eos, ducimus sapiente
        harum aliquam et labore molestias.
      </view>
    </AppScroll>
  </AppContainer>
</template>
