import { useCallback, useState } from "react";
import usePartialCB from "web/utils/hooks/usePartialCallback";

const useToggleState = (dflt: boolean = false) => {
  const [value, setValue] = useState(dflt);
  const enable = usePartialCB(setValue, [true]);
  const disable = usePartialCB(setValue, [false]);
  const toggle = useCallback(() => setValue((v) => !v), [setValue]);
  return {
    value,
    setValue,
    enable,
    disable,
    toggle,
  };
};

export default useToggleState;
