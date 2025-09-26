import { useEffect, useRef } from 'react';

export default function ParticlesBackground() {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (particlesRef.current) {
      // Configuración simple de partículas con CSS
      const particles = particlesRef.current;
      particles.innerHTML = '';
      
      // Crear partículas dinámicamente
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(59, 130, 246, 0.3);
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
          animation-delay: ${Math.random() * 2}s;
        `;
        particles.appendChild(particle);
      }

      // Agregar estilos CSS para la animación
      const style = document.createElement('style');
      style.textContent = `
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
        .particle {
          pointer-events: none;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  return (
    <div 
      ref={particlesRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    />
  );
}
