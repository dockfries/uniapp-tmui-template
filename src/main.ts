import { createSSRApp } from "vue";
import * as Pinia from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import tmui from "./tmui";
import App from "./App.vue";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = Pinia.createPinia();
  const compatUniPinia = createPersistedState({
    storage: { getItem: uni.getStorageSync, setItem: uni.setStorageSync },
  });
  pinia.use(compatUniPinia);
  app.use(pinia);
  app.use(tmui);
  return { app, Pinia };
}
