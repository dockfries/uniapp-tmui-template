import router from "./guard";

router.beforeEach = (to, from, next) => {
  next();
};

router.afterEach = (to, from) => {
  //
};

// 兼容tmui
// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};
export const useTmRouterBefore = NOOP;
export const useTmRouterAfter = NOOP;

export default router.instance;
