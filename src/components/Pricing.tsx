import React from 'react';
import { motion } from 'motion/react';
import { Check, ShieldCheck, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';

interface PricingProps {
  onOpenApply: () => void;
}

export default function Pricing({ onOpenApply }: PricingProps) {
  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      {/* Background Liquid soft violet light */}
      <div className="absolute top-[30%] left-[30%] w-[45vw] h-[45vw] rounded-full bg-blue-600/5 blur-[130px] pointer-events-none animate-liquid-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase font-sans text-blue-400 tracking-[0.2em] font-bold">
            Private Access Pass
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-white mt-3 tracking-tight">
            Claim Your Seat Inside
          </h2>
          <p className="text-sm text-zinc-400 font-sans mt-3 leading-relaxed">
            We operate in small cohorts to ensure direct veteran oversight. Review details below, submit your application vector, and secure your trading seat.
          </p>
        </div>

        {/* Pricing Card Section (Centered Sleek Masterpiece Card) */}
        <div className="max-w-2xl mx-auto relative z-10">
          
          {/* Main Glass Card */}
          <div className="relative p-8 sm:p-10 rounded-none bg-[#121212] border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 blur-3xl pointer-events-none" />

            {/* Header detail */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" /> ONLY 6 SEATS REMAINING
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mt-3">
                  Apex Private Mentorship
                </h3>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-zinc-500 font-mono line-through block">$1,499 USD</span>
                <span className="text-3xl font-serif font-light text-white">$499</span>
                <span className="text-xs text-zinc-400 font-medium block mt-0.5">Lifetime Access / One-time</span>
              </div>
            </div>

            {/* Program highlights list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                'Full 8-Week Algorithmic Roadmap',
                'Lifetime Access to Live Trading Room',
                'Personal Weekly Playbook Reviews',
                'FTMO & Prop Evaluation Blueprint',
                'Proprietary Risk Terminal Templates',
                'Private Discord Accountability Lounge',
                'Direct 1-on-1 Telegram Support Line',
                'Lifetime Technical Roadmap Updates'
              ].map((feature, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="p-0.5 rounded-none bg-blue-500/10 border border-blue-500/20 text-blue-400 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-zinc-300 font-sans leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            {/* Bottom Alert notes */}
            <div className="p-4 rounded-none bg-amber-500/5 border border-amber-500/10 flex gap-3 mb-8 text-left">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                <strong>Disclaimer Note:</strong> We hold a zero-tolerance policy for lazy gamblers. Our trading models require rigid operational discipline. If you expect a fast-rich cheat code, please do not apply.
              </p>
            </div>

            {/* Application CTAs */}
            <button
              onClick={onOpenApply}
              className="w-full py-4 rounded-none bg-blue-500 hover:bg-blue-400 text-white font-sans uppercase tracking-widest font-bold text-xs transition-all duration-300 active:translate-y-px cursor-pointer flex items-center justify-center gap-2 border border-blue-400"
            >
              <ShieldCheck className="w-5 h-5" />
              Submit Application Vector
            </button>

            {/* Money back guarantees */}
            <p className="text-center text-[10px] text-zinc-500 font-mono mt-5 uppercase tracking-widest leading-relaxed">
              Secured by FTMO Verified Guidelines • 100% Passing Assist Guarantee
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
