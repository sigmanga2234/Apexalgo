import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Award, CheckCircle2, Star, TrendingUp } from 'lucide-react';
import { Testimonial } from '../types';

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'David K.',
    avatar: 'https://picsum.photos/seed/david/150/150',
    style: 'Intraday',
    fundedStatus: 'FTMO $100,000 Verified',
    profitRatio: 'Avg 1:4.2 RR',
    growthPct: 184,
    quote: "I was stuck in the retail support/resistance cycle for 3 years, constantly blowing accounts. Learning how the algorithm engineered those retail liquidity pools completely changed my perspective. Passed my $100k FTMO challenge in 14 trading days.",
    date: 'June 2026',
    beforeEquity: [10, 9.5, 9, 8.2, 8.5, 7.8],
    afterEquity: [10, 10.4, 11.2, 11.8, 11.5, 12.8, 13.5]
  },
  {
    id: '2',
    name: 'Sarah M.',
    avatar: 'https://picsum.photos/seed/sarah/150/150',
    style: 'Scalping',
    fundedStatus: 'FundedNext $200,000 Verified',
    profitRatio: 'Avg 1:5.0 RR',
    growthPct: 324,
    quote: "The Silver Bullet strategy mapping has given me ultimate session structure. I only trade London open for 45 minutes, grab my standard +2.5% on the daily liquidity sweep, and shut down my terminal. Outstanding psychology support inside the mentorship group.",
    date: 'May 2026',
    beforeEquity: [50, 48, 49, 44, 42, 45, 38],
    afterEquity: [50, 52, 58, 64, 62, 71, 78, 86]
  },
  {
    id: '3',
    name: 'Marcus L.',
    avatar: 'https://picsum.photos/seed/marcus/150/150',
    style: 'Swing',
    fundedStatus: 'Personal Portfolio Veteran',
    profitRatio: 'Avg 1:6.1 RR',
    growthPct: 142,
    quote: "I prefer higher timeframes. The order block mitigation guides helped me catch large weekly swings on Gold with zero drawdown. Best part of the mentorship is the live daily trade recaps where mentors show their exact executions.",
    date: 'April 2026',
    beforeEquity: [20, 20.5, 19, 18.2, 18.5],
    afterEquity: [20, 22.4, 23.1, 25.8, 28.2, 32.5]
  },
  {
    id: '4',
    name: 'Alexandre P.',
    avatar: 'https://picsum.photos/seed/alexandre/150/150',
    style: 'Intraday',
    fundedStatus: '5%ers $100,000 Verified',
    profitRatio: 'Avg 1:4.5 RR',
    growthPct: 204,
    quote: "Unbelievable quality. The risk models alone are worth 10x the price. Being able to visualize the simulated runs on the Risk Terminal helped me stop over-risking. Now I risk exactly 0.5% per trade with complete robotic discipline.",
    date: 'March 2026',
    beforeEquity: [30, 28.5, 29, 27.2, 26],
    afterEquity: [30, 31.2, 34.5, 36.8, 38.5, 42.1]
  },
  {
    id: '5',
    name: 'Yuki T.',
    avatar: 'https://picsum.photos/seed/yuki/150/150',
    style: 'Scalping',
    fundedStatus: 'FTMO $200,000 Verified',
    profitRatio: 'Avg 1:3.8 RR',
    growthPct: 256,
    quote: "Before this, I was chasing signals in Telegram channels. The mentors showed me how to read the price action myself. No indicators, just pure price delivery. It is like having X-ray vision for the charts.",
    date: 'January 2026',
    beforeEquity: [15, 14.2, 13.5, 14.1, 12],
    afterEquity: [15, 16.8, 19.4, 21.2, 23.5, 26.8]
  }
];

export default function Testimonials() {
  const [filter, setFilter] = React.useState<'All' | 'Scalping' | 'Intraday' | 'Swing'>('All');
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);

  const filteredTestimonials = filter === 'All' 
    ? TESTIMONIALS 
    : TESTIMONIALS.filter(t => t.style === filter);

  // Helper to generate elegant Sparkline
  const renderSparkline = (data: number[], color: string) => {
    const width = 100;
    const height = 30;
    const padding = 2;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const points = data.map((val, idx) => {
      const x = padding + (idx / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((val - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg className="w-full h-8 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Background Liquid soft blue light */}
      <div className="absolute top-[10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase font-sans text-blue-400 tracking-[0.2em] font-bold">
            Verifiable Success Stories
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-white mt-3 tracking-tight">
            The Wall of Love
          </h2>
          <p className="text-sm text-zinc-400 font-sans mt-3 leading-relaxed">
            Real student results. Review audited prop-firm accounts, average risk setups, and visual before vs after performance curves.
          </p>
        </div>

        {/* Style Filter Tabs: Crisp and square */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 relative z-10">
          {(['All', 'Scalping', 'Intraday', 'Swing'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-none text-xs font-semibold tracking-wide transition-all cursor-pointer border ${
                filter === tab
                  ? 'bg-blue-500/15 border-blue-500/30 text-blue-300 font-bold'
                  : 'bg-zinc-900/30 border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              {tab === 'All' ? 'All Trading Styles' : `${tab} Mentees`}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 items-stretch">
          {filteredTestimonials.map((testimonial) => {
            const isHovered = hoveredCard === testimonial.id;

            return (
              <motion.div
                key={testimonial.id}
                onMouseEnter={() => setHoveredCard(testimonial.id)}
                onMouseLeave={() => setHoveredCard(null)}
                layout
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="p-6 rounded-none bg-[#121212] border border-white/10 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 shadow-2xl flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-none border border-white/10 object-cover"
                    />
                    <div>
                      <h4 className="text-sm sm:text-base font-serif font-bold text-white">
                        {testimonial.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Award className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-[10px] font-mono text-zinc-400">
                          {testimonial.fundedStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profit Specs Grid */}
                  <div className="grid grid-cols-3 gap-2 bg-black/40 border border-white/5 rounded-none p-3 text-center">
                    <div>
                      <span className="text-[9px] text-zinc-500 font-mono block">STYLE</span>
                      <span className="text-[11px] text-white font-semibold font-sans">{testimonial.style}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 font-mono block">PROFIT RATIO</span>
                      <span className="text-[11px] text-blue-400 font-semibold font-mono">{testimonial.profitRatio}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 font-mono block">GROWTH</span>
                      <span className="text-[11px] text-blue-400 font-semibold font-mono">+{testimonial.growthPct}%</span>
                    </div>
                  </div>

                  {/* Star rating */}
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Interactive Curve Reveal on hover */}
                <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-3">
                  <span className="text-[9px] uppercase font-mono text-zinc-500 tracking-wider">
                    Interactive Performance Curve
                  </span>
                  
                  <div className="grid grid-cols-2 gap-4 items-center">
                    {/* Before (loss) */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] text-zinc-600 font-mono uppercase block">BEFORE MENTORSHIP</span>
                      <div className="p-1 rounded-none bg-red-500/5 border border-red-500/10 h-10 flex items-center">
                        {renderSparkline(testimonial.beforeEquity, '#f43f5e')}
                      </div>
                    </div>

                    {/* After (growth) */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] text-blue-400/80 font-mono uppercase block">AFTER</span>
                      <div className="p-1 rounded-none bg-blue-500/5 border border-blue-500/10 h-10 flex items-center relative overflow-hidden">
                        {renderSparkline(testimonial.afterEquity, '#3b82f6')}
                        <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-none bg-blue-400 animate-ping" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                    <span>Verified Audit ID: AP-{testimonial.id}9F</span>
                    <span>{testimonial.date}</span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
