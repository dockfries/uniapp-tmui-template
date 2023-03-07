import { defineConfig } from "unocss";
import transformerDirectives from "@unocss/transformer-directives";
import presetWeapp from "unocss-preset-weapp";
import { transformerClass } from "unocss-preset-weapp/transformer";

export default defineConfig({
  include: /\.n?vue$/,
  exclude: ["node_modules", ".git", ".husky", ".vscode", "build", "dist", "public", "src/types"],
  presets: [presetWeapp({ prefix: "_", whRpx: false })],
  transformers: [transformerDirectives(), transformerClass()],
  shortcuts: {
    "f-center": "flex justify-center items-center",
  },
  theme: {
    colors: {
      primary: {
        500: " #105DFB",
        50: "#EBF1FD",
      },
      success: {
        500: "#01A63E",
        50: "#E8F6ED",
      },
      warning: {
        500: "#F4A118",
        50: "#FFF0D8",
      },
      error: {
        500: "#E73F3F",
      },
      gray: {
        900: "#222124",
        800: "#5F5F61",
      },
    },
  },
});
