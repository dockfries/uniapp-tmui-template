import { defineConfig, PluginOption } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import vueJsx from "@vitejs/plugin-vue-jsx";
import tmuiCss from "./src/tmui/tool/vitePlugs/tmuiCss";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    uni(),
    vueJsx(),
    tmuiCss() as PluginOption,
    Components(),
    AutoImport({
      include: [/\.vue$/, /\.nvue$/],
      imports: ["vue", "pinia", "uni-app"],
      eslintrc: { enabled: true },
    }),
  ],
});
