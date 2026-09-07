import { Boxes, Building2, Headset, Waypoints } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { differentiators } from '@/lib/data/home';

const icons = { Boxes, Building2, Headset, Waypoints };

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-[#071126] py-[clamp(3.75rem,7vw,6.5rem)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(61,91,210,0.24),transparent_30rem),radial-gradient(circle_at_88%_10%,rgba(243,91,10,0.12),transparent_24rem)]" />
      <div className="container-shell relative">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <ScrollReveal>
            <div>
              <Badge className="border-white/15 bg-white/8 text-blue-200 dark:text-blue-200">Why Bhagyashree Ventures</Badge>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.45rem)] font-bold leading-[1.06] tracking-[-0.04em]">
                Less guesswork. Better-fit solutions.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-300">
                Our role is to help narrow the options, match hardware with media and software, and give your team a practical path from enquiry to deployment.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {differentiators.map((item, index) => {
              const Icon = icons[item.iconName as keyof typeof icons] ?? Waypoints;
              return (
                <ScrollReveal key={item.title} delay={index * 0.05}>
                  <article className="h-full rounded-[10px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_24px_60px_-46px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.075] sm:p-6">
                    <div className="inline-flex size-10 items-center justify-center rounded-[8px] bg-orange-500/12 text-orange-300">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
