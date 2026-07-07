import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, Users, Play, Sparkles, TrendingUp } from 'lucide-react';

interface HeroProps {
  onOpenApply: () => void;
  onOpenReplay: () => void;
}

export default function Hero({ onOpenApply, onOpenReplay }: HeroProps) {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Editorial background elements */}
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-blue-600/5 blur-[120px] -z-10 animate-liquid-3" />
      <div className="absolute top-[50%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-950/20 blur-[130px] -z-10 animate-liquid-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-left">
            
            {/* Editorial Tagline */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 border-t border-b border-white/10 w-fit backdrop-blur-md bg-white/[0.01]"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span className="text-[11px] font-sans font-semibold text-zinc-300 tracking-[0.25em] uppercase">
                Q3 Private Enrollment Open
              </span>
            </motion.div>

            {/* Headline with serif italic accents */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.1]"
            >
              Master the Algorithm.<br />
              <span className="text-blue-400 italic font-normal">
                Claim Your Edge.
              </span>
            </motion.h1>

            {/* Description with fine line height */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-base text-zinc-400 max-w-2xl font-sans leading-relaxed tracking-wide"
            >
              Stop guessing market direction. We train you in elite institutional liquidity mapping, precision order-block delivery, and institutional risk architectures. Trade side-by-side with funded veterans.
            </motion.p>

            {/* CTAs: Sharp Corners, Editorial Contrast */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mt-2"
            >
              <button
                onClick={onOpenApply}
                className="px-8 py-4 rounded-none bg-blue-500 hover:bg-blue-400 text-white font-sans uppercase tracking-widest font-bold text-xs transition-all duration-300 active:translate-y-px cursor-pointer border border-blue-400"
              >
                Apply for Mentorship
              </button>

              <button
                onClick={onOpenReplay}
                className="px-6 py-4 rounded-none bg-transparent hover:bg-white/5 border border-white/20 text-white font-sans uppercase tracking-widest font-semibold text-xs transition-all flex items-center gap-2 group cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white text-white group-hover:scale-110 transition-transform" />
                Watch Market Replay
              </button>
            </motion.div>

            {/* Trust Badges - Sharp Dividers */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-8 mt-4 border-t border-white/10"
            >
              {[
                { value: '$45M+', label: 'Student Funding', icon: ShieldCheck },
                { value: '94.2%', label: 'Pass Rate', icon: Zap },
                { value: '450+', label: 'Elite Mentees', icon: Users }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-2 border-r last:border-r-0 border-white/10 pr-2">
                  <div className="flex items-center gap-1.5 text-blue-400 font-mono text-sm font-semibold">
                    <span>{stat.value}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold font-sans">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Hero Right: Sharp Editorial Grid Box */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[380px] p-6 rounded-none bg-[#121212] border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600" />

              {/* Box Content */}
              <div className="relative z-10 flex flex-col gap-4">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-none bg-blue-500 animate-ping" />
                    <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">ALGO RADAR ACTIVE</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">SESSION: LONDON</span>
                </div>

                {/* Market Entry Signal Box */}
                <div className="p-4 rounded-none bg-white/[0.02] border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[9px] uppercase font-mono text-zinc-500 tracking-wider">PROPRIETARY SETUP</span>
                      <h4 className="text-sm font-serif font-bold text-white mt-0.5">EURUSD Buy Trigger</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-none bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-[10px] font-bold">
                      +1:5.2 RR
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    Price tapped the daily liquidity void and mitigated the 15M institutional order-block with zero drawdown.
                  </p>
                </div>

                {/* Simulated Chart preview */}
                <div className="h-28 w-full bg-black/40 rounded-none relative overflow-hidden p-2 flex items-end border border-white/5">
                  {/* Glowing liquid back */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-blue-500/10 blur-xl pointer-events-none" />
                  
                  {/* Mock Trading candles */}
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50">
                    {/* Grid lines */}
                    <line x1="0" y1="12" x2="100" y2="12" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    <line x1="0" y1="37" x2="100" y2="37" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    
                    {/* Candles */}
                    <g stroke="#f43f5e" strokeWidth="0.8">
                      {/* Red Bearish candle */}
                      <line x1="10" y1="10" x2="10" y2="30" />
                      <rect x="7" y="15" width="6" height="10" fill="#f43f5e" stroke="none" />

                      <line x1="25" y1="20" x2="25" y2="40" />
                      <rect x="22" y="24" width="6" height="12" fill="#f43f5e" stroke="none" />
                    </g>
                    
                    <g stroke="#3b82f6" strokeWidth="0.8">
                      {/* Blue Bullish candles */}
                      <line x1="40" y1="15" x2="40" y2="38" />
                      <rect x="37" y="22" width="6" height="10" fill="#3b82f6" stroke="none" />

                      {/* Tap Liquidity block */}
                      <rect x="34" y="32" width="24" height="10" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.3)" strokeWidth="0.5" strokeDasharray="2" />

                      <line x1="55" y1="10" x2="55" y2="35" />
                      <rect x="52" y="12" width="6" height="20" fill="#3b82f6" stroke="none" />

                      <line x1="70" y1="5" x2="70" y2="25" />
                      <rect x="67" y="8" width="6" height="10" fill="#3b82f6" stroke="none" />

                      <line x1="85" y1="2" x2="85" y2="15" />
                      <rect x="82" y="3" width="6" height="7" fill="#3b82f6" stroke="none" />
                    </g>

                    {/* Smooth path projection line */}
                    <path d="M 7 18 L 22 28 M 22 28 L 37 32 M 37 32 L 52 20 L 67 12 L 82 5" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3" />
                  </svg>

                  <div className="absolute top-2 left-2 bg-blue-500/20 border border-blue-500/30 text-[9px] text-blue-400 px-1.5 py-0.5 rounded-none font-mono tracking-wider">
                    ORDER BLOCK MITIGATED
                  </div>
                </div>

                {/* Footer specs */}
                <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-1">
                  <span>WIN RATE: 74%</span>
                  <span>AVG RR: 1:4.8</span>
                </div>

                <div className="border-t border-white/10 pt-3 mt-1 flex items-center justify-between">
                  <div className="flex -space-x-1.5">
                    <img className="w-6 h-6 rounded-none border border-zinc-950" src="https://picsum.photos/seed/alex/100/100" alt="Student" referrerPolicy="no-referrer" />
                    <img className="w-6 h-6 rounded-none border border-zinc-950" src="https://picsum.photos/seed/sara/100/100" alt="Student" referrerPolicy="no-referrer" />
                    <img className="w-6 h-6 rounded-none border border-zinc-950" src="https://picsum.photos/seed/mark/100/100" alt="Student" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-[10px] text-zinc-400">
                    +48 joiners this week
                  </span>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
