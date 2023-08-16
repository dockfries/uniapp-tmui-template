import { post } from "@/request";

export const userApi = {
  getAuthByCode(code: string) {
    return post<{ auth_login: number; key: string }>("wechat/routine_login", { code });
  },
};
