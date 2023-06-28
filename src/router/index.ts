import { createRouter } from "uni-mini-router";
import pagesJsonToRoutes from "uni-parse-pages";
import pagesJson from "../pages.json";
import { createRouterGuard } from "./guard";

const router = createRouter({
  routes: pagesJsonToRoutes(pagesJson),
});

createRouterGuard(router);

export default router;
