import { useEffect } from 'react';

/**
 * JS-based page snap — intercepts wheel/touch, scrolls to sections manually.
 * All sections stay rendered → no 3-4s paint delay like CSS scroll-snap.
 * Skips interception inside .faq-scroll so FAQ list can scroll normally.
 */
export function usePageSnap(selector = '.snap-sec, .no-snap') {
  useEffect(() => {
    let isAnimating = false;
    let currentIdx = 0;

    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>(selector));

    // Find which section is currently most in view
    const detectCurrent = () => {
      const secs = getSections();
      let best = 0, bestScore = -Infinity;
      secs.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
        if (visible > bestScore) { bestScore = visible; best = i; }
      });
      return best;
    };

    const scrollToIdx = (idx: number) => {
      const secs = getSections();
      if (idx < 0 || idx >= secs.length) return;
      if (isAnimating) return;
      isAnimating = true;
      currentIdx = idx;
      secs[idx].scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => { isAnimating = false; }, 900);
    };

    const onWheel = (e: WheelEvent) => {
      // Allow scroll inside faq list
      if ((e.target as Element)?.closest?.('.faq-scroll')) return;
      e.preventDefault();
      if (isAnimating) return;
      currentIdx = detectCurrent();
      if (e.deltaY > 10) scrollToIdx(currentIdx + 1);
      else if (e.deltaY < -10) scrollToIdx(currentIdx - 1);
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if ((e.target as Element)?.closest?.('.faq-scroll')) return;
      const diff = touchY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 40) return;
      currentIdx = detectCurrent();
      if (diff > 0) scrollToIdx(currentIdx + 1);
      else scrollToIdx(currentIdx - 1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [selector]);
}
