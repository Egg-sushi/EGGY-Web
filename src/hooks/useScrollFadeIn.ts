import { useCallback, useEffect, useRef } from 'react';

function useScrollFadeIn(direction = 'up', duration = 1, delay = 0, once = true) {
  const ref = useRef<HTMLDivElement>(null);

  const handleDirection = (dir: string) => {
    switch (dir) {
      case 'up':
        return 'translate3d(0, 10%, 0)';
      case 'down':
        return 'translate3d(0, -10%, 0)';
      case 'left':
        return 'translate3d(10%, 0, 0)';
      case 'right':
        return 'translate3d(-10%, 0, 0)';
      default:
        return 'translate3d(0, 10%, 0)';
    }
  };

  const handleScroll = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      const { current } = ref;
      if (current && entry.isIntersecting) {
        current.style.transitionProperty = 'all';
        current.style.transitionDuration = `${duration}s`;
        current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
        current.style.transitionDelay = `${delay}s`;
        current.style.opacity = '1';
        current.style.transform = 'translate3d(0, 0, 0)';
      } else if (current && !once) {
        current.style.opacity = '0';
        current.style.transform = handleDirection(direction);
      }
    },
    [delay, duration, direction, once],
  );

  useEffect(() => {
    let observer: IntersectionObserver;
    const { current } = ref;

    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.6 });
      observer.observe(current);
    }

    return () => observer && observer.disconnect();
  }, [handleScroll]);
  return {
    ref,
    style: { opacity: 0, transform: handleDirection(direction) },
  };
}

export default useScrollFadeIn;
