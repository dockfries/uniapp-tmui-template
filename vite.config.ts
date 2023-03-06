import { defineConfig, PluginOption } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import vueJsx from "@vitejs/plugin-vue-jsx";
import tmuiCss from "./src/tmui/tool/vitePlugs/tmuiCss";
import { resolve } from "path";
// import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
  server: {
    proxy: {
      // "/pag": {
      //   target: "https://cdn.tmui.design",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, "/api"),
      // },
    },
  },
  plugins: [uni(), vueJsx(), tmuiCss() as PluginOption],
});
