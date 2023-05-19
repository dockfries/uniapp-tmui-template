import type { Router } from "uni-mini-router";

export function createRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    console.log(to, from);
    next();
  });

  router.afterEach((to, from) => {
    console.log(to, from);
  });
}
