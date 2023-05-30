<script lang="ts" setup>
import { request } from "@/request";
import { useMessage, useModal } from "@/composable/provider";
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import { usePage } from "@/composable/request/usePage";

const store = useTmpiniaStore();

const route = useRoute();
const router = useRouter();
const goLogin = () => router.push({ name: "login" });

const msg = useMessage({
  model: "error",
  text: "不能为空",
});

const showMessage = () => {
  msg.value?.show();
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

const myPagingData = ref([]);

const query = async (pageNo: number, pageSize: number) => {
  const paging = usePage(route);
  try {
    const data = await request<string>("ping", "GET", { pageNo, pageSize });
    paging.value.complete([data]);
  } catch (err) {
    paging.value.complete(false);
  }
};
</script>

<template>
  <AppContainer v-model="myPagingData" @query="query">
    <view class="_m-4">
      <view class="f-center">
        <view class="i-icon-chip _text-warning-500 _text-2xl _mr-1" />
        <text class="_text-xl _text-primary-500">兼容组件库所以类名前缀_</text>
      </view>
      <view flex="~ wrap" class="_gap-4 _mt-4 _p-4 _shadow _bg-white _rounded-md dark:_bg-dark-100">
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
    <view class="dark:_text-light-900">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. A nulla quasi, repudiandae illo
      nihil, harum error voluptas maxime quia aliquid placeat? Recusandae eos, ducimus sapiente
      harum aliquam et labore molestias.
    </view>
    <view v-for="(item, idx) in myPagingData" :key="idx">
      {{ item }}
    </view>
  </AppContainer>
</template>
