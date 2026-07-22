import { motion } from "framer-motion";
import type { ServiceIcon } from "../types";

export function NodexaMark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#10B981] ${className}`}
    >
      <span className="text-[13px] font-bold tracking-tight text-[#05080F]">
        MY
      </span>
    </div>
  );
}

const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: "easeOut" as const, delay },
  }),
};

const drawFill = {
  hidden: { scale: 0, opacity: 0 },
  show: (delay: number) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" as const, delay },
  }),
};

const viewport = { once: true, margin: "-40px" } as const;
const STROKE = "#10B981";

export function ServiceGlyph({ icon }: { icon: ServiceIcon }) {
  if (icon === "network") {
    return (
      <svg viewBox="0 0 48 48" width={40} height={40} aria-hidden="true">
        <motion.circle
          cx="12"
          cy="14"
          r="4"
          fill="none"
          stroke={STROKE}
          strokeWidth="2"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          custom={0}
          variants={drawLine}
        />
        <motion.circle
          cx="36"
          cy="14"
          r="4"
          fill="none"
          stroke={STROKE}
          strokeWidth="2"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          custom={0.1}
          variants={drawLine}
        />
        <motion.circle
          cx="24"
          cy="38"
          r="4"
          fill={STROKE}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          custom={0.6}
          variants={drawFill}
        />
        <motion.line
          x1="15"
          y1="17"
          x2="22"
          y2="34"
          stroke={STROKE}
          strokeWidth="2"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          custom={0.2}
          variants={drawLine}
        />
        <motion.line
          x1="33"
          y1="17"
          x2="26"
          y2="34"
          stroke={STROKE}
          strokeWidth="2"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          custom={0.3}
          variants={drawLine}
        />
        <motion.line
          x1="16"
          y1="14"
          x2="32"
          y2="14"
          stroke={STROKE}
          strokeWidth="2"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          custom={0.4}
          variants={drawLine}
        />
      </svg>
    );
  }
  if (icon === "flow") {
    return (
      <svg viewBox="0 0 48 48" width={40} height={40} aria-hidden="true">
        <motion.line
          x1="6"
          y1="16"
          x2="30"
          y2="16"
          stroke={STROKE}
          strokeWidth="2"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          custom={0}
          variants={drawLine}
        />
        <motion.circle
          cx="34"
          cy="16"
          r="4"
          fill="none"
          stroke={STROKE}
          strokeWidth="2"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          custom={0.3}
          variants={drawLine}
        />
        <motion.line
          x1="18"
          y1="32"
          x2="42"
          y2="32"
          stroke={STROKE}
          strokeWidth="2"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          custom={0.15}
          variants={drawLine}
        />
        <motion.circle
          cx="14"
          cy="32"
          r="4"
          fill={STROKE}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          custom={0.6}
          variants={drawFill}
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" width={40} height={40} aria-hidden="true">
      <motion.circle
        cx="24"
        cy="24"
        r="14"
        fill="none"
        stroke={STROKE}
        strokeWidth="2"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        custom={0}
        variants={drawLine}
      />
      <motion.circle
        cx="24"
        cy="24"
        r="5"
        fill={STROKE}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        custom={0.6}
        variants={drawFill}
      />
    </svg>
  );
}
