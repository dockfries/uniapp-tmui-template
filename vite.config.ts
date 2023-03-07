import { defineConfig, PluginOption } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import tmuiCss from "./src/tmui/tool/vitePlugs/tmuiCss";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import h5ProdEffectPlugin from "uni-vite-plugin-h5-prod-effect";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    uni(),
    h5ProdEffectPlugin(),
    tmuiCss() as PluginOption,
    Components(),
    AutoImport({
      include: [/\.n?vue$/],
      imports: ["vue", "pinia", "uni-app"],
      eslintrc: { enabled: true },
    }),
  ],
});
