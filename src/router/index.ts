import router from "./guard";

router.beforeEach = (to, from, next) => {
  next();
};

router.afterEach = (to, from) => {};

export default router.instance;
