'use client';

import { motion } from 'framer-motion';
import { stats } from '@/lib/data/home';
import StatCounter from '@/components/ui/StatCounter';

export default function StatsCounter() {
  return (
    <section className="relative bg-white py-12 sm:py-16 lg:py-20 border-b border-slate-200 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 laser-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-amber-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-[7px] bg-cyan-500/10 border border-cyan-500/20 text-[11px] sm:text-xs font-mono text-cyan-700 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse flex-shrink-0" />
            PERFORMANCE METRICS
          </span>
        </motion.div>

        {/* Stats Grid — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                description={stat.sublabel}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
