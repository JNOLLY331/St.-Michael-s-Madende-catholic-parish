import { useEffect, useState } from 'react';

/**
 * Animates a number from 0 up to `target` using an easeOutExpo curve.
 * Counting only starts once `startCounting` becomes true (e.g. when the
 * element scrolls into view), so it can be paired with an IntersectionObserver.
 */
export function useCountUp(target, duration = 2500, startCounting = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing: easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, startCounting]);

  return count;
}
