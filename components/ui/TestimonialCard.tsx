import { Star, Quote } from 'lucide-react';
import { Testimonial } from '@/lib/data/home';

export default function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="bg-white rounded-[10px] p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full relative group hover:border-amber-500/50 hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)] transition-all duration-300">
      <Quote
        size={48}
        className="text-slate-100 absolute top-6 right-6 group-hover:text-amber-500/10 transition-colors pointer-events-none"
      />

      <div>
        {/* Rating */}
        <div className="flex items-center gap-1 text-amber-500 mb-5">
          {[...Array(item.rating)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
        </div>

        {/* Quote text */}
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-sans">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3.5 pt-5 border-t border-slate-100">
        <div className="w-11 h-11 rounded-[8px] bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center font-bold text-sm tracking-wider font-display shadow-sm">
          {item.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-sm leading-tight font-display">
            {item.name}
          </h4>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            {item.role} &bull; <span className="text-amber-700 font-bold">{item.company}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
