import { defineConfig } from "unocss";
import transformerDirectives from "@unocss/transformer-directives";
import presetWeapp from "unocss-preset-weapp";
import { transformerClass } from "unocss-preset-weapp/transformer";
import presetIcons from "@unocss/preset-icons";
import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";
import { tmConfig } from "./src/config/index"; // 兼容tmui组件库的color属性

export default defineConfig({
  include: [/\.n?vue$/, "./src/pages.json"],
  exclude: ["node_modules", ".git", ".husky", ".vscode", "build", "dist", "public", "src/types"],
  presets: [
    presetWeapp({ prefix: "_", whRpx: false }),
    presetIcons({
      collections: {
        icon: FileSystemIconLoader("./assets/icons", (svg) =>
          svg.replace(/fill="#\w{6}"/g, `fill="currentColor"`)
        ),
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerClass()],
  shortcuts: {
    "f-center": "_flex _justify-center _items-center",
  },
  theme: {
    colors: {
      primary: {
        500: tmConfig.theme.primary,
        50: "#EBF1FD",
      },
      success: {
        500: tmConfig.theme.success,
        50: "#E8F6ED",
      },
      warning: {
        500: tmConfig.theme.warning,
        50: "#FFF0D8",
      },
      error: {
        500: tmConfig.theme.error,
      },
      gray: {
        900: tmConfig.theme.black,
        800: "#5F5F61",
        600: "#4B5563",
      },
    },
  },
});
