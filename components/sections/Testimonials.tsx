'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data/home';
import type { Testimonial } from '@/lib/data/home';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const typedTestimonials = testimonials as Testimonial[];

  const prev = () => setActive((p) => (p - 1 + typedTestimonials.length) % typedTestimonials.length);
  const next = () => setActive((p) => (p + 1) % typedTestimonials.length);
  const t = typedTestimonials[active];

  return (
    <section className="bg-[#fafafc] py-14 sm:py-20 lg:py-28 border-b border-slate-200 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-[7px] bg-amber-500/10 border border-amber-500/25 text-[11px] sm:text-xs font-mono text-amber-700 font-bold mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
            CLIENT TESTIMONIALS
          </span>
          <h2 className="text-h2 font-bold text-slate-950 tracking-tight font-display">
            Trusted by India&apos;s Industrial Leaders
          </h2>
        </motion.div>

        {/* Spotlight Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
            className="bg-white rounded-[10px] sm:rounded-[10px] p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-lg relative overflow-hidden"
          >
            {/* Quote Icon */}
            <Quote className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-100" size={60} strokeWidth={1} />

            {/* Stars */}
            <div className="flex items-center gap-1 mb-4 sm:mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-800 leading-relaxed font-display font-medium mb-6 sm:mb-8 relative z-10">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 sm:gap-4 border-t border-slate-100 pt-4 sm:pt-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-amber-700 font-bold text-base sm:text-lg font-display flex-shrink-0">
                {t.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900 font-display truncate">{t.name}</p>
                <p className="text-xs text-slate-500 truncate">{t.role} &mdash; {t.company}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-between mt-6 sm:mt-8">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {typedTestimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                aria-label={`Testimonial ${idx + 1}`}
                className={`rounded-[7px] transition-all cursor-pointer ${
                  idx === active
                    ? 'w-6 h-2 bg-amber-500'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-2">
            <button onClick={prev} aria-label="Previous"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-[8px] border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-sm cursor-pointer transition-all">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} aria-label="Next"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-[8px] border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-sm cursor-pointer transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
