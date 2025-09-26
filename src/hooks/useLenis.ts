import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  const lenisInstance = useRef<Lenis | null>(null);

  useEffect(() => {
    // Evitar múltiples inicializaciones
    if (lenisInstance.current) return;

    lenisInstance.current = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time: number) {
      if (lenisInstance.current) {
        lenisInstance.current.raf(time);
        requestAnimationFrame(raf);
      }
    }

    requestAnimationFrame(raf);

    return () => {
      if (lenisInstance.current) {
        lenisInstance.current.destroy();
        lenisInstance.current = null;
      }
    };
  }, []);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (lenisInstance.current) {
        lenisInstance.current.destroy();
        lenisInstance.current = null;
      }
    };
  }, []);
};
