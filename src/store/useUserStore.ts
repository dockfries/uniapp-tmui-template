export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref<string | null>(null);
    return { token };
  },
  { persist: { enabled: true } }
);
