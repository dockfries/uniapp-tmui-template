import { resolve } from "node:path";
import uni from "@dcloudio/vite-plugin-uni";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import UnoCSS from "unocss/vite";
import tmuiCss from "./src/tmui/tool/vitePlugs/tmuiCss";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    // 自动导入相关插件必须在uni之前, 否则小程序端将失效
    Components({ dirs: ["src/components", "src/tmui/components"] }),
    AutoImport({
      include: [/\.n?vue$/, /\.ts$/],
      imports: [
        "vue",
        "pinia",
        "uni-app",
        {
          from: "uni-mini-router",
          imports: ["useRouter", "useRoute"],
        },
      ],
      eslintrc: { enabled: true },
    }),
    uni(),
    tmuiCss(),
    UnoCSS(),
  ],
});
