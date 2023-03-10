import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist-uni";
import tmui from "./tmui";
import App from "./App.vue";
import router from "./router";
import "uno.css";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  pinia.use(piniaPersist);
  app.use(pinia);
  app.use(tmui);
  app.use(router);
  return { app };
}
