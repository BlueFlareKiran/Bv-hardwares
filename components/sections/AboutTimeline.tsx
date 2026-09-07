'use client';

import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { timeline } from '@/lib/data/about';
import { Sparkles } from 'lucide-react';

export default function AboutTimeline() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden border-b border-slate-200/70">
      {/* Laser Grid Background */}
      <div className="absolute inset-0 laser-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[7px] bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-mono font-bold uppercase tracking-widest mb-4">
              <Sparkles size={13} />
              <span>Institutional Evolution</span>
            </div>
            <h2 className="text-display-2xl font-bold text-slate-950 tracking-tight leading-tight font-display">
              Four Decades of Engineering Milestones
            </h2>
            <p className="mt-4 text-lead text-slate-600 leading-relaxed">
              Trace our historical transformation from a specialized local supplier into Karnataka&apos;s leading industrial barcode, RFID, and automated identification hardware powerhouse.
            </p>
          </ScrollReveal>
        </div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Vertical Central Line for desktop */}
          <div className="hidden lg:block absolute top-8 bottom-8 left-1/2 w-[2px] bg-gradient-to-b from-amber-400 via-amber-500 to-amber-400 -translate-x-1/2 opacity-40" />

          <div className="space-y-16 lg:space-y-24">
            {timeline.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.year}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-8 lg:gap-16`}
                >
                  {/* Central Year Node for desktop */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-[10px] bg-white border-2 border-amber-500 shadow-[0_0_24px_rgba(245,158,11,0.25)] items-center justify-center font-bold text-base z-10 font-mono text-amber-700">
                    {item.year}
                  </div>

                  {/* Content Card */}
                  <div className="w-full lg:w-1/2">
                    <ScrollReveal delay={idx * 0.08} direction={isEven ? 'left' : 'right'}>
                      <div className="group rounded-[10px] p-8 sm:p-10 bg-slate-50 border border-slate-200/90 hover:border-amber-500/50 hover:bg-white shadow-sm hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1">
                        {/* Mobile Year Badge */}
                        <div className="lg:hidden inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-[7px] font-mono mb-3">
                          {item.year}
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 font-display mb-3 group-hover:text-amber-600 transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Graphic Illustration */}
                  <div className="w-full lg:w-1/2 flex items-center justify-center">
                    <ScrollReveal delay={idx * 0.08 + 0.05} direction={isEven ? 'right' : 'left'}>
                      <div className="relative w-56 sm:w-64 h-36 sm:h-44 p-4 rounded-[10px] bg-white border border-slate-200 shadow-sm flex items-center justify-center group hover:border-amber-500/50 transition-colors">
                        <Image
                          src={item.image}
                          alt={`${item.year} milestone badge`}
                          width={240}
                          height={160}
                          className="object-contain max-h-full max-w-full drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
