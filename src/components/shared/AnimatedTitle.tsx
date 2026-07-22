"use client";

import { motion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const line = {
  hidden: { y: "100%" },
  show: { y: "0%", transition: { duration: 0.8, ease: PREMIUM_EASE } },
};

const container = (stagger = 0.12) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

interface AnimatedTitleProps {
  lines: string[];
  as?: ElementType;
  className?: string;
  stagger?: number;
}

export function AnimatedTitle({ lines, as: Tag = "h2", className = "", stagger = 0.12 }: AnimatedTitleProps) {
  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container(stagger)}
        className="block"
      >
        {lines.map((text, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span variants={line} className="block">
              {text}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function RevealText({ children, className = "", delay = 0 }: RevealTextProps) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: PREMIUM_EASE, delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
