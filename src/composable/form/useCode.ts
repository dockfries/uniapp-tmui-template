export interface IUseCodeParams {
  seconds?: number;
  startText?: string;
  changeText?: string;
  endText?: String;
  change?: (text: string) => void;
  start?: () => void;
  end?: () => void;
}

export const useCode = (params?: IUseCodeParams) => {
  let timer: NodeJS.Timeout | null = null;
  const cleanTimer = () => timer && clearInterval(timer);

  const canGetCode = ref(true);
  const seconds = ref(-1);

  const startText = (params?.startText || "获取验证码") as string;
  const changeText = (params?.changeText || "秒后重试") as string;
  const endText = (params?.endText || "重新获取") as string;

  const currText = ref<string>(startText);

  const end = () => {
    if (canGetCode.value) return false;
    cleanTimer();
    canGetCode.value = true;
    currText.value = endText;
    params?.end && params.end();
    return true;
  };

  const start = (cb?: () => void) => {
    if (!canGetCode.value) return false;
    canGetCode.value = false;

    cleanTimer();

    seconds.value = params?.seconds || -1;
    if (!seconds.value || seconds.value <= 0 || seconds.value > 1000) {
      seconds.value = 60;
    }

    currText.value = `${seconds.value}${changeText}`;

    timer = setInterval(() => {
      seconds.value && seconds.value--;
      currText.value = `${seconds.value}${changeText}`;
      if (seconds.value === 0) end();
      params?.change && params.change(currText.value);
    }, 1000);

    cb && cb();
    return true;
  };

  const callbackChange = () => params?.change && params.change(currText.value);

  callbackChange();

  onUnmounted(cleanTimer);

  return {
    text: currText,
    canGetCode,
    start,
    end,
  };
};
