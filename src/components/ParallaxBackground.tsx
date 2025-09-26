import { useEffect, useRef, useState } from 'react';
import Rellax from 'rellax';

export default function ParallaxBackground() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const rellaxInstance = useRef<Rellax | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Evitar múltiples inicializaciones
    if (isInitialized || !parallaxRef.current) return;

    const timer = setTimeout(() => {
      if (parallaxRef.current && !rellaxInstance.current) {
        rellaxInstance.current = new Rellax(parallaxRef.current, {
          speed: -1,
          center: false,
          wrapper: null,
          round: true,
          vertical: true,
          horizontal: false,
          breakpoints: [576, 768, 1201]
        });
        setIsInitialized(true);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (rellaxInstance.current) {
        rellaxInstance.current.destroy();
        rellaxInstance.current = null;
      }
    };
  }, [isInitialized]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (rellaxInstance.current) {
        rellaxInstance.current.destroy();
        rellaxInstance.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={parallaxRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      data-rellax-speed="-1"
    >
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-50/60 to-purple-50/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-green-50/40 to-blue-50/60 rounded-full blur-3xl"></div>
    </div>
  );
}
