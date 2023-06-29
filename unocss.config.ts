import { defineConfig } from "unocss";
import transformerDirectives from "@unocss/transformer-directives";
import presetWeapp from "unocss-preset-weapp";
import { transformerAttributify, transformerClass } from "unocss-preset-weapp/transformer";
import presetIcons from "@unocss/preset-icons";
import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";
import { tmConfig } from "./src/config/index"; // 兼容tmui组件库的color属性

const svgPatchFillReg = /fill="#\w{6}"/g;

export default defineConfig({
  include: [/\.n?vue$/, "./src/pages.json"],
  exclude: ["node_modules", ".git", ".husky", ".vscode", "build", "dist", "public", "src/types"],
  presets: [
    presetWeapp({ prefix: "_", whRpx: false }),
    presetIcons({
      collections: {
        icon: FileSystemIconLoader("./assets/icons", (svg) => {
          // 仅单色图标自动修改为currentColor, 多色图标需要自行处理
          const matches = svg.match(svgPatchFillReg);
          if (matches?.every((match) => match === matches[0])) {
            return svg.replace(svgPatchFillReg, `fill="currentColor"`);
          }
          return svg;
        }),
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerClass({}),
    transformerAttributify({
      classPrefix: "_",
    }),
  ],
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
