"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion";
import { AnimatedTitle } from "./AnimatedTitle";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export interface FaqItem {
  question: string;
  answer: string;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.15 }}
    >
      <path d="M6 9l6 6 6-6" />
    </motion.svg>
  );
}

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full min-h-[44px] items-center justify-between gap-4 py-6 text-left"
      >
        <span className="text-[16px] font-semibold text-white md:text-[17px]">{item.question}</span>
        <span className="flex-none text-white/50">
          <ChevronIcon open={isOpen} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: PREMIUM_EASE }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-8 text-[14.5px] leading-relaxed text-white/60">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection({ id, title, items }: { id: string; title: string; items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={id} className="relative px-6 py-20 md:px-10 lg:py-28">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer(0.1)}
        className="mx-auto max-w-[720px]"
      >
        <AnimatedTitle
          lines={[title]}
          className="text-center text-[28px] font-extrabold tracking-tight text-white md:text-[36px]"
        />
        <motion.div variants={fadeUp} className="mt-10 border-t border-white/10">
          {items.map((item, i) => (
            <FaqAccordionItem
              key={item.question}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
