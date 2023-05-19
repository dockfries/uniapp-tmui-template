import "uni-mini-router";

declare global {
  const ROUTES: [];
}

declare module "uni-mini-router" {
  interface Route {
    meta: Record<string, any>;
  }
}
