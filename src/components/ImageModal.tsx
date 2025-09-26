import { useEffect, useRef } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  projectName: string;
}

export default function ImageModal({ isOpen, onClose, imageSrc, imageAlt, projectName }: ImageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Overlay con animación */}
      <div 
        className="absolute inset-0 bg-black/90 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div 
        ref={modalRef}
        className="relative z-10 max-w-6xl max-h-[90vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Título del proyecto */}
        <div className="absolute top-4 left-4 z-20">
          <h3 className="text-white text-xl font-light bg-black/50 backdrop-blur-sm px-4 py-2 rounded">
            {projectName}
          </h3>
        </div>

        {/* Imagen */}
        <div className="relative overflow-hidden rounded-lg shadow-2xl">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-auto max-h-[80vh] object-contain"
            style={{ animation: 'fadeInScale 0.3s ease-out' }}
          />
        </div>

        {/* Controles de navegación */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded hover:bg-white/30 transition-colors duration-300"
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Estilos CSS para animaciones */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
