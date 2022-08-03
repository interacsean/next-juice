import { useState, useEffect, useCallback } from 'react';

const throttle = <A extends any[], F extends Function>(
  fn: F,
  delay: number,
) => {
  let canCall = true;
  return (...args: A) => {
    if (canCall) {
      fn.apply(null, args);
      canCall = false;
      setTimeout(() => {
        canCall = true;
      }, delay);
    }
  };
};

const BKPT_TABLET = 768;
const BKPT_TABLET_980 = 980;
const BKPT_DESKTOP_SMALL = 1024;
const BKPT_DESKTOP_LARGE = 1280;

const getDeviceConfig = (width: number): BreakPoint => {
  /**
   * /!\ Warning
   *
   * Stay in sync with scss breakpoints
   */
  if (width >= BKPT_DESKTOP_LARGE) {
    return 'desktop-large';
  } else if (width >= BKPT_DESKTOP_SMALL && width < BKPT_DESKTOP_LARGE) {
    return 'desktop-small';
  } else if (width >= BKPT_TABLET_980 && width < BKPT_DESKTOP_SMALL) {
    return 'tablet-large';
  } else if (width >= BKPT_TABLET && width < BKPT_TABLET_980) {
    return 'tablet';
  } /* if(width < BKPT_TABLET) */ else {
    return 'mobile';
  }
};

type BreakPoint =
  | 'desktop-large'
  | 'desktop-small'
  | 'tablet-large'
  | 'tablet'
  | 'mobile';

const useBreakpoint = (): BreakPoint => {
  // @ts-ignore
  const win: any = process?.browser ? window : {};
  const [brkPnt, setBrkPnt] = useState(getDeviceConfig(win?.innerWidth));

  const setBreakpoint = useCallback(
    throttle(() => setBrkPnt(getDeviceConfig(win?.innerWidth)), 50),
    [setBrkPnt],
  );

  useEffect(() => {
    win?.addEventListener('resize', setBreakpoint);
    return () => win?.removeEventListener('resize', setBreakpoint);
  }, [win]);

  return brkPnt;
};

export default useBreakpoint;
