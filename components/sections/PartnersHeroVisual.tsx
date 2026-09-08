'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Barcode, Handshake, Monitor, Printer, Radio } from 'lucide-react';

const nodes = [
  {
    label: 'Printing',
    icon: Printer,
    position: 'left-[4%] top-[5%] sm:left-[19%] sm:top-[5%]',
    delay: '-0.7s',
  },
  {
    label: 'RFID',
    icon: Radio,
    position: 'right-[4%] top-[6%] sm:right-[17%] sm:top-[6%]',
    delay: '-2.1s',
  },
  {
    label: 'Barcode',
    icon: Barcode,
    position: 'left-[2%] bottom-[9%] sm:left-[12%] sm:bottom-[14%]',
    delay: '-3.1s',
  },
  {
    label: 'POS',
    icon: Monitor,
    position: 'right-[2%] bottom-[9%] sm:right-[11%] sm:bottom-[14%]',
    delay: '-1.4s',
  },
] as const;

const floatingDots = [
  { className: 'left-[33%] top-[23%] size-2.5 bg-[#2563eb]', delay: 0.1 },
  { className: 'right-[31%] top-[22%] size-2.5 bg-[#f58220]', delay: 0.5 },
  { className: 'left-[29%] bottom-[31%] size-2 bg-[#f58220]', delay: 0.8 },
  { className: 'right-[27%] bottom-[29%] size-2.5 bg-[#2563eb]', delay: 0.25 },
];

export default function PartnersHeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[690px] overflow-hidden py-2 sm:overflow-visible sm:py-5 lg:py-0">
      <div className="relative aspect-square min-h-[300px] sm:aspect-[1.16/1] sm:min-h-[430px]">
        {/* Soft sweeping background, intentionally close to reference direction #5. */}
        <div className="pointer-events-none absolute -bottom-[10%] -left-[7%] h-[58%] w-[93%] rotate-[-12deg] rounded-[50%] bg-[linear-gradient(135deg,rgba(37,99,235,.10),rgba(96,165,250,.045)_50%,transparent_72%)] blur-[1px]" />
        <div className="pointer-events-none absolute -bottom-[17%] left-[6%] h-[44%] w-[82%] rotate-[-11deg] rounded-[50%] border-[26px] border-blue-100/45 dark:border-blue-900/10" />
        <div className="pointer-events-none absolute right-[3%] top-[7%] h-[28%] w-[34%] rounded-full bg-orange-100/30 blur-3xl dark:bg-orange-500/8" />

        {/* Thin connector paths made as SVG rather than baked into an image. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 690 590"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          preserveAspectRatio="none"
        >
          <path d="M168 122 C248 164, 263 224, 331 269" fill="none" stroke="rgba(37,99,235,.20)" strokeWidth="1.5" />
          <path d="M522 125 C448 160, 429 219, 367 268" fill="none" stroke="rgba(245,130,32,.23)" strokeWidth="1.5" />
          <path d="M135 445 C221 400, 253 343, 324 310" fill="none" stroke="rgba(37,99,235,.17)" strokeWidth="1.4" />
          <path d="M550 442 C461 398, 433 344, 372 309" fill="none" stroke="rgba(245,130,32,.18)" strokeWidth="1.4" />
        </svg>

        {/* Two subtle orbital paths with moving brand-colour dots. */}
        <div aria-hidden="true" className="partners-orbit-v11 partners-orbit-v11-outer">
          <span className="partners-orbit-v11-runner partners-orbit-v11-runner-blue">
            <span className="partners-orbit-v11-dot partners-orbit-v11-dot-blue" />
          </span>
          <span className="partners-orbit-v11-runner partners-orbit-v11-runner-blue partners-orbit-v11-half">
            <span className="partners-orbit-v11-dot partners-orbit-v11-dot-blue partners-orbit-v11-dot-small" />
          </span>
        </div>

        <div aria-hidden="true" className="partners-orbit-v11 partners-orbit-v11-inner">
          <span className="partners-orbit-v11-runner partners-orbit-v11-runner-orange">
            <span className="partners-orbit-v11-dot partners-orbit-v11-dot-orange" />
          </span>
          <span className="partners-orbit-v11-runner partners-orbit-v11-runner-orange partners-orbit-v11-third">
            <span className="partners-orbit-v11-dot partners-orbit-v11-dot-orange partners-orbit-v11-dot-small" />
          </span>
        </div>

        {floatingDots.map((dot, index) => (
          <motion.span
            key={index}
            aria-hidden="true"
            className={`pointer-events-none absolute z-10 rounded-full ${dot.className}`}
            animate={reduceMotion ? undefined : { y: [0, -6, 0], x: [0, index % 2 ? 3 : -3, 0], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 4.4 + index * 0.45, delay: dot.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Reference-style central blue partnership circle. */}
        <motion.div
          className="partners-reference-hub absolute left-1/2 top-[48%] z-20 -translate-x-1/2 -translate-y-1/2"
          animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="grid h-[108px] w-[108px] place-items-center rounded-full bg-[radial-gradient(circle_at_30%_25%,#4f8dfd,#2563eb_58%,#1d4ed8_100%)] shadow-[0_24px_52px_rgba(37,99,235,.22)] sm:h-[150px] sm:w-[150px]"
            whileHover={reduceMotion ? undefined : { scale: 1.035 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <Handshake size={40} strokeWidth={1.85} className="text-white sm:size-[56px]" />
          </motion.div>
          <div className="mt-3 text-center">
            <p className="text-base font-bold leading-tight text-foreground sm:text-lg">Stronger</p>
            <p className="text-base font-bold leading-tight text-foreground sm:text-lg">Together</p>
          </div>
        </motion.div>

        {/* Circular feature nodes, matching option #5 rather than rectangular cards. */}
        {nodes.map((node) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.label}
              className={`partners-reference-node absolute z-30 ${node.position}`}
              style={{ animationDelay: node.delay }}
              whileHover={reduceMotion ? undefined : { y: -4, scale: 1.035 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            >
              <div className="flex h-[72px] w-[72px] flex-col items-center justify-center rounded-full border border-blue-100/80 bg-white/94 text-center shadow-[0_14px_34px_rgba(15,23,42,.09)] backdrop-blur-sm sm:h-[100px] sm:w-[100px]">
                <Icon size={24} strokeWidth={2.1} className="text-brand-blue sm:size-[32px]" />
                <span className="mt-1.5 text-[10px] font-bold leading-none text-foreground sm:text-xs">{node.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
