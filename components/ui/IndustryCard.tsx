import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Industry } from '@/lib/data/home';

export default function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <div className="group relative rounded-[10px] overflow-hidden bg-white border border-slate-200/90 hover:border-amber-500/50 shadow-sm hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between h-full">
      {/* Background Image */}
      <div className="relative h-64 w-full bg-slate-50 overflow-hidden">
        <Image
          src={industry.image}
          alt={industry.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {industry.tag && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/95 shadow-sm text-amber-700 text-xs font-mono font-bold uppercase tracking-wider rounded-[7px] border border-slate-200">
              {industry.tag}
            </span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-7 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors flex items-center justify-between font-display">
            <span>{industry.title}</span>
            <ArrowRight
              size={18}
              className="text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all"
            />
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            {industry.description}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-mono text-cyan-700 font-semibold">
          <CheckCircle2 size={14} className="text-cyan-600 flex-shrink-0" />
          <span>{industry.stats}</span>
        </div>
      </div>
    </div>
  );
}
