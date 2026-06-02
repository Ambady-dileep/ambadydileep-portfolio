import { useCallback, useRef } from 'react';

export function useMagnetic(strength = 0.35) {
  const ref = useRef(null);
  const rectRef = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      if (!rectRef.current) {
        rectRef.current = el.getBoundingClientRect();
      }
      const rect = rectRef.current;
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    rectRef.current = null;
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
