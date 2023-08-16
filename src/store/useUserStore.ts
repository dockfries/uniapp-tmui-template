import { userApi } from "@/request/modules/user";
import router from "@/router";

export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref<string | null>(null);
    const userInfo = ref<any>({});

    async function _login(code: string) {
      const res = await userApi.getAuthByCode(code);

      // 未绑定手机号
      if (res.auth_login === 1) {
        router.push({ name: "login", params: { key: res.key } });
        return;
      }

      // 绑了手机号直接登录
      setUserInfo(res);
    }

    function login() {
      // #ifdef MP-WEIXIN
      uni.showLoading({ title: "登录中" });
      uni.login({
        provider: "weixin",
        success({ code }) {
          _login(code);
          uni.hideLoading();
        },
        fail(err) {
          uni.hideLoading();
          console.log(err);
        },
      });
      // #endif
      // #ifdef H5
      router.push({ name: "login" });
      // #endif
    }

    function logout() {
      token.value = null;
      userInfo.value = {};

      setTimeout(() => {
        // #ifdef MP-WEIXIN
        router.pushTab({ name: "my" });
        // #endif
        // #ifdef H5
        router.replace({ name: "login" });
        // #endif
      }, 1500);
    }

    function setUserInfo(res: any) {
      token.value = res.token;
      userInfo.value = res.user;

      router.pushTab({ name: "my" });
    }

    return { token, userInfo, login, logout, setUserInfo };
  },
  { persist: { enabled: true } }
);
