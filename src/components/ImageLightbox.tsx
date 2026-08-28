"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  src: string | null;
  alt?: string;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 3;
const ZOOM_IN_SCALE = 2.2;

export default function ImageLightbox({ src, alt, onClose }: Props) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOrigin, setDragOrigin] = useState({ x: 0, y: 0, posX: 0, posY: 0 });

  const open = src !== null;

  const reset = () => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scale > 1) {
      reset();
    } else {
      setScale(ZOOM_IN_SCALE);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prev) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev - e.deltaY * 0.0015)));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    if (scale <= 1) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    setDragOrigin({ x: e.clientX, y: e.clientY, posX: pos.x, posY: pos.y });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!isDragging) return;
    setPos({ x: dragOrigin.posX + (e.clientX - dragOrigin.x), y: dragOrigin.posY + (e.clientY - dragOrigin.y) });
  };

  const stopDragging = () => setIsDragging(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          onClick={handleClose}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        >
          <button
            onClick={handleClose}
            aria-label="Cerrar"
            className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border-none bg-white/10 text-xl leading-none text-white hover:bg-white/20"
          >
            &times;
          </button>

          <div
            className="flex h-full w-full items-center justify-center overflow-hidden p-6"
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
          >
            <img
              src={src ?? ""}
              alt={alt ?? ""}
              draggable={false}
              onClick={toggleZoom}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={stopDragging}
              onPointerLeave={stopDragging}
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                cursor: scale > 1 ? "grab" : "zoom-in",
                transition: isDragging ? "none" : "transform 0.2s ease-out",
              }}
              className="max-h-full max-w-full select-none object-contain"
            />
          </div>

          <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[11.5px] text-white/40">
            Click para hacer zoom · scroll para ajustar
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
