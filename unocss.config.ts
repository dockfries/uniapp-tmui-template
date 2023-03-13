import { defineConfig } from "unocss";
import transformerDirectives from "@unocss/transformer-directives";
import presetWeapp from "unocss-preset-weapp";
import { transformerClass } from "unocss-preset-weapp/transformer";
import presetIcons from "@unocss/preset-icons";
import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";
import { theme } from "./src/theme/index"; // 兼容tmui组件库的color属性

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
        500: theme.primary,
        50: "#EBF1FD",
      },
      success: {
        500: theme.success,
        50: "#E8F6ED",
      },
      warning: {
        500: theme.warning,
        50: "#FFF0D8",
      },
      error: {
        500: theme.error,
      },
      gray: {
        900: theme.black,
        800: "#5F5F61",
      },
    },
  },
});
