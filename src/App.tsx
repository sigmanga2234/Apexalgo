import React from 'react';
import GlowBackground from './components/GlowBackground';
import Navbar from './components/Navbar';
import TickerTape from './components/TickerTape';
import Hero from './components/Hero';
import Curriculum from './components/Curriculum';
import Testimonials from './components/Testimonials';
import RiskCalculator from './components/RiskCalculator';
import Pricing from './components/Pricing';
import ReplaySimulator from './components/ReplaySimulator';
import ApplyModal from './components/ApplyModal';
import { Shield, Lock, Globe, DollarSign } from 'lucide-react';

export default function App() {
  const [isApplyOpen, setIsApplyOpen] = React.useState(false);
  const [isReplayOpen, setIsReplayOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen text-white font-sans antialiased selection:bg-blue-500/30 selection:text-blue-300">
      {/* Dynamic liquid glowing backdrop */}
      <GlowBackground />

      {/* Floating glassmorphic header navigation */}
      <Navbar onOpenApply={() => setIsApplyOpen(true)} />

      {/* Main Container */}
      <main className="relative z-10">
        
        {/* Sleek asset price ticker right under navbar space */}
        <div className="pt-[76px]">
          <TickerTape />
        </div>

        {/* Hero Presentation */}
        <Hero 
          onOpenApply={() => setIsApplyOpen(true)} 
          onOpenReplay={() => setIsReplayOpen(true)} 
        />

        {/* Dynamic Risk & Equity simulator */}
        <RiskCalculator />

        {/* Interactive Curriculum learning roadmap */}
        <Curriculum />

        {/* Filterable student Wall of Love */}
        <Testimonials />

        {/* Pricing Tiers & Application Entry */}
        <Pricing onOpenApply={() => setIsApplyOpen(true)} />

      </main>

      {/* Sleek, Realistic Financial Template Footer */}
      <footer className="relative z-10 bg-zinc-950/80 border-t border-white/10 backdrop-blur-md pt-16 pb-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            
            {/* Footer Left */}
            <div className="md:col-span-5 flex flex-col gap-4 text-left">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg tracking-wider text-white">
                  APEX<span className="text-blue-400 italic ml-1">ALGO</span>
                </span>
              </div>
              <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
                A premium, research-driven trading academy delivering institutional order flow schematics and structural capital guides. We train disciplined market technicians.
              </p>
              
              <div className="flex items-center gap-4 text-zinc-600 text-[10px] font-mono mt-2">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-500/70" />
                  <span>SECURED CHANNELS</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-blue-500/70" />
                  <span>AES-256</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-500/70" />
                  <span>GLOBAL INFRA</span>
                </div>
              </div>
            </div>

            {/* Footer Links Right */}
            <div className="md:col-span-7 grid grid-cols-3 gap-6 text-left">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-4 font-bold">TERMINAL MODULES</span>
                <ul className="flex flex-col gap-2 text-xs text-zinc-500">
                  <li><a href="#hero" className="hover:text-blue-400 transition-colors">Overview</a></li>
                  <li><a href="#simulator" className="hover:text-blue-400 transition-colors">Risk Terminal</a></li>
                  <li><a href="#curriculum" className="hover:text-blue-400 transition-colors">Syllabus Engine</a></li>
                </ul>
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-4 font-bold">VERIFIABLE STATS</span>
                <ul className="flex flex-col gap-2 text-xs text-zinc-500">
                  <li><a href="#testimonials" className="hover:text-blue-400 transition-colors">Wall of Love</a></li>
                  <li><span className="text-zinc-600">Audit IDs</span></li>
                  <li><span className="text-zinc-600">Leaderboard</span></li>
                </ul>
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-4 font-bold">LEGAL COMPLIANCE</span>
                <ul className="flex flex-col gap-2 text-xs text-zinc-500">
                  <li><span className="hover:text-blue-400 transition-colors cursor-pointer">Risk Disclosure</span></li>
                  <li><span className="hover:text-blue-400 transition-colors cursor-pointer">Terms of Allocation</span></li>
                  <li><span className="hover:text-blue-400 transition-colors cursor-pointer">Privacy Safeguards</span></li>
                </ul>
              </div>
            </div>

          </div>

          {/* Legal Risk Disclosure Banner (Essential for high-quality trading sites) */}
          <div className="border-t border-white/10 pt-8 mt-8 text-left">
            <span className="text-[10px] font-mono font-bold text-zinc-400 block mb-2 uppercase tracking-widest">
              CFTC RULE 4.41 & MIFID DISCLOSURE WARNING:
            </span>
            <p className="text-[10px] text-zinc-600 leading-relaxed font-sans">
              HYPOTHETICAL OR SIMULATED PERFORMANCE RESULTS HAVE CERTAIN LIMITATIONS. UNLIKE AN ACTUAL PERFORMANCE RECORD, SIMULATED RESULTS DO NOT REPRESENT ACTUAL TRADING. ALSO, SINCE THE TRADES HAVE NOT BEEN EXECUTED, THE RESULTS MAY HAVE UNDER-OR-OVER COMPENSATED FOR THE IMPACT, IF ANY, OF CERTAIN MARKET FACTORS, SUCH AS LACK OF LIQUIDITY. SIMULATED TRADING PROGRAMS IN GENERAL ARE ALSO SUBJECT TO THE FACT THAT THEY ARE DESIGNED WITH THE BENEFIT OF HINDSIGHT. NO REPRESENTATION IS BEING MADE THAT ANY ACCOUNT WILL OR IS LIKELY TO ACHIEVE PROFIT OR LOSSES SIMILAR TO THOSE SHOWN. ALL TESTIMONIALS AND CASE STUDIES ARE FOR INFORMATION PURPOSES ONLY AND DO NOT REPRESENT FINANCIAL ADVICE.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10 text-[10px] text-zinc-600 font-mono">
              <span>© 2026 APEXALGO MENTORSHIP INC. ALL RIGHTS RESERVED.</span>
              <span>CRAFTED FOR INSTITUTIONAL DISCIPLINE</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Modals & Slide-out Drawers */}
      <ApplyModal 
        isOpen={isApplyOpen} 
        onClose={() => setIsApplyOpen(false)} 
      />
      
      <ReplaySimulator 
        isOpen={isReplayOpen} 
        onClose={() => setIsReplayOpen(false)} 
      />
    </div>
  );
}
