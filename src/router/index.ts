import { createRouter } from "uni-mini-router";
import { createRouterGuard } from "./guard";

const router = createRouter({
  routes: [...ROUTES],
});

createRouterGuard(router);

export default router;
