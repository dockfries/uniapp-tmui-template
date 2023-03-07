import { defineConfig, PluginOption } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import tmuiCss from "./src/tmui/tool/vitePlugs/tmuiCss";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import h5ProdEffectPlugin from "uni-vite-plugin-h5-prod-effect";
import UnoCSS from "unocss/vite";

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
    UnoCSS("./unocss.config.ts"),
    Components(),
    AutoImport({
      include: [/\.n?vue$/, /\.ts$/],
      imports: ["vue", "pinia", "uni-app"],
      eslintrc: { enabled: true },
    }),
  ],
});
