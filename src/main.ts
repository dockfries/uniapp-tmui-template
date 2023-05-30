import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist-uni";
import tmui from "./tmui";
import App from "./App.vue";
import router from "./router";
import "uno.css";
import { tmConfig, zPagingConfig } from "./config";
import zPagingSettings from "./uni_modules/z-paging/components/z-paging/js/z-paging-config";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  pinia.use(piniaPersist);
  app.use(router);
  app.use(pinia);
  app.use(tmui, tmConfig);
  zPagingSettings.setConfig(zPagingConfig);
  return { app };
}
