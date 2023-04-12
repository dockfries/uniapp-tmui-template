import { router } from ".";

router.beforeEach((from, to, next) => {
  console.log(from, to);
  next();
});

router.afterEach((from, to) => {
  console.log(from, to);
});
