import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Clock, BookOpen, ChevronRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { CurriculumStep } from '../types';

const CURRICULUM_STEPS: CurriculumStep[] = [
  {
    id: 1,
    title: 'Algorithmic Foundations',
    duration: 'Weeks 1-2',
    difficulty: 'Beginner',
    description: 'Learn to decode session timings (Asia, London, NY) and determine authentic market trends using premium vs. discount institutional ranges.',
    highlights: [
      'Understanding Session Liquidity Profiles',
      'Determining True Institutional Ranges',
      'The Algorithm Delivery Engine (IPDA)',
      'Constructing a Professional Trading Plan'
    ]
  },
  {
    id: 2,
    title: 'Liquidity Mapping & Retail Traps',
    duration: 'Weeks 3-4',
    difficulty: 'Intermediate',
    description: 'Spot engineered retail liquidity. Track where institutional capital accumulates resting orders and stop-loss pools before sweeping the market.',
    highlights: [
      'Identifying Buy-side and Sell-side Liquidity',
      'Spotting Trendline & Double Top/Bottom Traps',
      'Uncovering the Session Liquidity Hunt',
      'Mapping High-Probability Order Flow'
    ]
  },
  {
    id: 3,
    title: 'Mitigation Blocks & Precision Entry',
    duration: 'Weeks 5-6',
    difficulty: 'Advanced',
    description: 'Master our proprietary mitigation models. Tap into high-confluence Fair Value Gaps (FVG) and mitigate Order Blocks with tight zero-drawdown invalidations.',
    highlights: [
      'Mitigating Bulllish & Bearish Order Blocks',
      'The Fair Value Gap (FVG) Confluence Model',
      'Optimal Trade Entry (OTE) Fib Retracements',
      'Displacement and Market Structure Shifts (MSS)'
    ]
  },
  {
    id: 4,
    title: 'The Live Accel & Prop Funded Blueprint',
    duration: 'Weeks 7-8+',
    difficulty: 'Mastery',
    description: 'Transition into our live trade rooms. Trade alongside verified prop veterans, deploy strict automated risk limits, and secure up to $200k in funded accounts.',
    highlights: [
      'Live Trading Rooms with Verifiable Mentors',
      'Prop Firm Evaluation Blueprint (FTMO / MFF)',
      'Custom Position Sizing & Drawdown Safeguards',
      'Elite Trading Psychology & Emotional Shield'
    ]
  }
];

export default function Curriculum() {
  const [activeStepId, setActiveStepId] = React.useState<number>(1);
  const activeStep = CURRICULUM_STEPS.find(s => s.id === activeStepId) || CURRICULUM_STEPS[0];

  return (
    <section id="curriculum" className="py-20 relative overflow-hidden">
      {/* Background Liquid soft green bubble */}
      <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase font-sans text-blue-400 tracking-[0.2em] font-bold">
            Interactive Learning Roadmap
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-white mt-3 tracking-tight">
            The Algorithmic Curriculum
          </h2>
          <p className="text-sm text-zinc-400 font-sans mt-3 leading-relaxed">
            An interactive roadmap structured to scale you from retail concepts to institutional precision in 8 weeks. Click each phase to reveal target highlights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Roadmap Steps (Left 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {CURRICULUM_STEPS.map((step) => {
              const isActive = step.id === activeStepId;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  className={`text-left p-5 rounded-none border transition-all duration-300 backdrop-blur-md flex items-center justify-between cursor-pointer group ${
                    isActive 
                      ? 'bg-blue-500/10 border-blue-500/30 border-l-2 border-l-blue-400' 
                      : 'bg-zinc-900/10 border-white/5 hover:border-white/15 hover:bg-zinc-900/30'
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    {/* Circle badge */}
                    <div className={`w-10 h-10 rounded-none flex items-center justify-center font-mono font-bold text-sm border transition-all ${
                      isActive 
                        ? 'bg-blue-500 text-white border-blue-400' 
                        : 'bg-zinc-950/40 text-zinc-400 border-white/10 group-hover:border-zinc-500'
                    }`}>
                      0{step.id}
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 block uppercase leading-none mb-1 tracking-wider">
                        {step.duration}
                      </span>
                      <h4 className="text-sm sm:text-base font-serif font-bold text-white group-hover:text-blue-300 transition-colors">
                        {step.title}
                      </h4>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform ${isActive ? 'rotate-90 text-blue-400' : 'group-hover:translate-x-1'}`} />
                </button>
              );
            })}
          </div>

          {/* Expanded Step Detail Box (Right 7 Columns) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-none bg-[#121212] border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden h-full min-h-[380px] flex flex-col justify-between"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600" />

                <div>
                  {/* Top detail chips */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">{activeStep.duration}</span>
                    </div>

                    <span className="px-3 py-1 rounded-none bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400">
                      {activeStep.difficulty}
                    </span>
                  </div>

                  {/* Title & description */}
                  <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                    {activeStep.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-3 leading-relaxed">
                    {activeStep.description}
                  </p>

                  {/* Highlights checklist */}
                  <div className="mt-6 flex flex-col gap-3">
                    <span className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider">Target Highlights</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                      {activeStep.highlights.map((highlight, index) => (
                        <div key={index} className="flex gap-2.5 items-start">
                          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-zinc-300 font-sans leading-relaxed">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom interactive progress hint */}
                <div className="border-t border-white/10 pt-6 mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    <span className="text-[11px] text-zinc-500 font-sans">
                      Interactive workbooks & video lessons included
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-none bg-blue-500" />
                    <div className="w-1.5 h-1.5 rounded-none bg-blue-500" />
                    <div className="w-1.5 h-1.5 rounded-none bg-blue-500" />
                    <div className="w-1.5 h-1.5 rounded-none bg-blue-500" />
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
