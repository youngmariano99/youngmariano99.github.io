import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

interface TypedTextProps {
  strings: string[];
  className?: string;
  delay?: number;
}

export default function TypedText({ strings, className = '', delay = 0 }: TypedTextProps) {
  const el = useRef<HTMLSpanElement>(null);
  const typedInstance = useRef<Typed | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (el.current && !typedInstance.current) {
        typedInstance.current = new Typed(el.current, {
          strings: strings,
          typeSpeed: 50,
          backSpeed: 30,
          backDelay: 2000,
          loop: true,
          showCursor: true,
          cursorChar: '|'
        });
      }
    }, delay);

    return () => {
      clearTimeout(timer);
      if (typedInstance.current) {
        typedInstance.current.destroy();
        typedInstance.current = null;
      }
    };
  }, [strings, delay]);

  return <span ref={el} className={className}></span>;
}
