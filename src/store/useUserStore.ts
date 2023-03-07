export const useUserStore = defineStore(
  "user",
  () => {
    const token = "";
    return { token };
  },
  { persist: true }
);
