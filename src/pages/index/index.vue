<template>
  <tm-app ref="app">
    <tm-navbar :title="title" :shadow="0" hide-home>
      <template #left>
        <view class="_flex _flex-center _flex-row">
          <tm-icon
            name="tmicon-ios-sunny"
            _class="px-24"
            :color="store.tmStore.dark ? 'yellow' : ''"
            :font-size="32"
            @click="toggleDarkMode"
          />
        </view>
      </template>
    </tm-navbar>
    <view class="_text-primary-500 _m-4">
      <view class="_text-xl">兼容组件库所以类名前缀_</view>
      <view class="_flex _gap-4 _mt-4 _p-4 _shadow _bg-white _rounded-md">
        <tm-button @click="goLogin">跳转</tm-button>
        <tm-button @click="showMessage">组件消息框</tm-button>
      </view>
    </view>
    <tm-message ref="msg" />
  </tm-app>
</template>

<script lang="ts" setup>
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import tmApp from "@/tmui/components/tm-app/tm-app.vue";
import tmMessage from "@/tmui/components/tm-message/tm-message.vue";
import { request } from "@/request";
import { useRoute } from "@/composable/router/useRoute";
import { useRouter } from "@/composable/router/useRouter";

const store = useTmpiniaStore();
const app = ref<InstanceType<typeof tmApp> | null>(null);
const msg = ref<InstanceType<typeof tmMessage> | null>(null);

const toggleDarkMode = () => app.value?.setDark();

const title: string = useRoute().meta?.title;

const router = useRouter();
const goLogin = () => router.push({ name: "login" });

request<string>("ping", "GET")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

const showMessage = () => {
  msg.value?.show({
    model: "error",
    text: "不能为空",
    mask: true,
  });
};
</script>
