import { useEffect, useState } from 'react';

export function useDeferredInit(delay = 500) {
  const [shouldInit, setShouldInit] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let handle;
    const trigger = () => setShouldInit(true);

    if ('requestIdleCallback' in window) {
      handle = window.requestIdleCallback(trigger, { timeout: delay });
    } else {
      handle = setTimeout(trigger, delay);
    }

    return () => {
      if ('requestIdleCallback' in window) {
        window.cancelIdleCallback(handle);
      } else {
        clearTimeout(handle);
      }
    };
  }, [delay]);

  return shouldInit;
}
