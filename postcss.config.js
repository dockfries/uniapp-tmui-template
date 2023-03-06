import { uniPostcssPlugin } from "@dcloudio/uni-cli-shared";
import autoprefixer from "autoprefixer";

export default {
  plugins: [uniPostcssPlugin(), autoprefixer()],
};
