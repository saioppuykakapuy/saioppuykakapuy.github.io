import { useEffect, useMemo, useState } from 'react';

export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export function assetPath(path = '') {
  if (!path || path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}/${cleanPath}`;
}

export function useTypewriter(text, deps = [], speed = 42) {
  const [output, setOutput] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let timer = window.setTimeout(function typeNext() {
      setOutput(text.slice(0, index + 1));
      index += 1;

      if (index < text.length) {
        timer = window.setTimeout(typeNext, speed);
      } else {
        setDone(true);
      }
    }, 120);

    setOutput('');
    setDone(false);

    return () => window.clearTimeout(timer);
  }, [text, speed, ...deps]);

  return { output, done };
}

export function useCountUp(target, active, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }

    const lowMotion =
      document.documentElement.dataset.motion === 'low' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (lowMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * easeOutCubic(progress)));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, target]);

  return value;
}

export function useFilteredItems(items, category) {
  return useMemo(() => {
    if (category === 'all') {
      return items;
    }

    return items.filter((item) => item.category === category);
  }, [category, items]);
}
