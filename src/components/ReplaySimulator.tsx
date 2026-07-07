import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, CheckCircle2, TrendingUp, ChevronRight, X, Sparkles } from 'lucide-react';

interface ReplaySimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Step {
  narrative: string;
  priceAction: { x: number; y: number; type: 'bearish' | 'bullish' | 'sweep' | 'target' }[];
  status: string;
  highlightZone?: { x: number; y: number; width: number; height: number; text: string; color: string };
}

const SETUPS: Record<string, { title: string; desc: string; steps: Step[] }> = {
  'Silver Bullet': {
    title: 'Silver Bullet Liquidity Sweep',
    desc: 'Watch the algorithm grab retail stop-losses before expanding 1:6 into the target liquidity pool.',
    steps: [
      {
        narrative: 'London session high is established. Retail traders are putting buy-stop orders above this level, expecting a breakout.',
        status: 'STAGE 1: RETAIL BREAKOUT TRAP',
        priceAction: [
          { x: 10, y: 50, type: 'bearish' },
          { x: 20, y: 40, type: 'bullish' },
          { x: 30, y: 30, type: 'bullish' },
          { x: 40, y: 35, type: 'bearish' },
          { x: 50, y: 25, type: 'bullish' }, // local high
        ],
        highlightZone: { x: 45, y: 20, width: 25, height: 10, text: 'RETAIL RESISTANCE', color: 'border-rose-500/30 bg-rose-500/5 text-rose-300' }
      },
      {
        narrative: 'Price sweeps ABOVE the retail resistance. Breakout buyers jump in, while short sellers are forced to buy back (stopped out). Liquidity is captured.',
        status: 'STAGE 2: LIQUIDITY SWEEP',
        priceAction: [
          { x: 10, y: 50, type: 'bearish' },
          { x: 20, y: 40, type: 'bullish' },
          { x: 30, y: 30, type: 'bullish' },
          { x: 40, y: 35, type: 'bearish' },
          { x: 50, y: 25, type: 'bullish' },
          { x: 60, y: 15, type: 'sweep' }, // sweep up!
        ],
        highlightZone: { x: 55, y: 10, width: 20, height: 10, text: 'LIQUIDITY SWEEP', color: 'border-amber-500/40 bg-amber-500/10 text-amber-300' }
      },
      {
        narrative: 'Immediate displacement downwards. The algorithm rapidly reverses price, breaking the local market structure. This leaves a Fair Value Gap (FVG).',
        status: 'STAGE 3: DISPLACEMENT & MARKET STRUCTURE SHIFT',
        priceAction: [
          { x: 10, y: 50, type: 'bearish' },
          { x: 20, y: 40, type: 'bullish' },
          { x: 30, y: 30, type: 'bullish' },
          { x: 40, y: 35, type: 'bearish' },
          { x: 50, y: 25, type: 'bullish' },
          { x: 60, y: 15, type: 'sweep' },
          { x: 70, y: 45, type: 'bearish' }, // sharp drop
          { x: 80, y: 55, type: 'bearish' }, // breaking structure
        ],
        highlightZone: { x: 65, y: 20, width: 18, height: 20, text: 'FAIR VALUE GAP', color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300' }
      },
      {
        narrative: 'Price pulls back lightly to mitigate the Fair Value Gap. This is our institutional short entry. SL goes above the sweep high.',
        status: 'STAGE 4: MITIGATION ENTRY',
        priceAction: [
          { x: 10, y: 50, type: 'bearish' },
          { x: 20, y: 40, type: 'bullish' },
          { x: 30, y: 30, type: 'bullish' },
          { x: 40, y: 35, type: 'bearish' },
          { x: 50, y: 25, type: 'bullish' },
          { x: 60, y: 15, type: 'sweep' },
          { x: 70, y: 45, type: 'bearish' },
          { x: 80, y: 55, type: 'bearish' },
          { x: 90, y: 35, type: 'bullish' }, // pull back to entry
        ],
        highlightZone: { x: 85, y: 30, width: 12, height: 12, text: 'ENTRY ZONE', color: 'border-emerald-400 bg-emerald-500/20 text-emerald-300 animate-pulse' }
      },
      {
        narrative: 'Target liquidity pool hit! Price completely cascades to clean out the sell-stops at London session lows. A flawless 1:6.4 risk-to-reward ratio trade.',
        status: 'STAGE 5: TAKE PROFIT DISPATCHED',
        priceAction: [
          { x: 10, y: 50, type: 'bearish' },
          { x: 20, y: 40, type: 'bullish' },
          { x: 30, y: 30, type: 'bullish' },
          { x: 40, y: 35, type: 'bearish' },
          { x: 50, y: 25, type: 'bullish' },
          { x: 60, y: 15, type: 'sweep' },
          { x: 70, y: 45, type: 'bearish' },
          { x: 80, y: 55, type: 'bearish' },
          { x: 90, y: 35, type: 'bullish' },
          { x: 100, y: 75, type: 'target' }, // expansion low
          { x: 110, y: 85, type: 'target' },
        ],
        highlightZone: { x: 95, y: 75, width: 22, height: 15, text: 'TP ARCHIEVED', color: 'border-emerald-500 bg-emerald-500/30 text-emerald-300' }
      }
    ]
  },
  'Order Block': {
    title: 'Institutional Order Block Mitigation',
    desc: 'Watch the banks accumulate heavy orders, creating an Order Block, then return for a flawless buy trigger.',
    steps: [
      {
        narrative: 'A heavy down candle is created as large institutions inject buy orders into the market, manipulating price lower to grab retail sell stops.',
        status: 'STAGE 1: ORDER BLOCK CREATION',
        priceAction: [
          { x: 10, y: 35, type: 'bullish' },
          { x: 20, y: 30, type: 'bullish' },
          { x: 30, y: 45, type: 'bearish' },
          { x: 40, y: 65, type: 'bearish' }, // key order block
        ],
        highlightZone: { x: 32, y: 45, width: 16, height: 22, text: 'BULLISH ORDER BLOCK', color: 'border-blue-500/40 bg-blue-500/10 text-blue-300' }
      },
      {
        narrative: 'The massive institutional injection causes immediate, aggressive upward expansion, leaving a clear "broken" market structure.',
        status: 'STAGE 2: BREAK OF STRUCTURE',
        priceAction: [
          { x: 10, y: 35, type: 'bullish' },
          { x: 20, y: 30, type: 'bullish' },
          { x: 30, y: 45, type: 'bearish' },
          { x: 40, y: 65, type: 'bearish' },
          { x: 50, y: 40, type: 'bullish' },
          { x: 60, y: 25, type: 'bullish' }, // breakout past high
        ],
        highlightZone: { x: 55, y: 20, width: 15, height: 10, text: 'BOS (BREAK OF STRUCTURE)', color: 'border-zinc-500/40 bg-zinc-500/10 text-zinc-300' }
      },
      {
        narrative: 'Price begins to correct back down to mitigate (re-test and fill) the unfilled orders left inside the original Order Block.',
        status: 'STAGE 3: RETRACE & MITIGATION',
        priceAction: [
          { x: 10, y: 35, type: 'bullish' },
          { x: 20, y: 30, type: 'bullish' },
          { x: 30, y: 45, type: 'bearish' },
          { x: 40, y: 65, type: 'bearish' },
          { x: 50, y: 40, type: 'bullish' },
          { x: 60, y: 25, type: 'bullish' },
          { x: 70, y: 40, type: 'bearish' },
          { x: 80, y: 55, type: 'bearish' }, // tap into order block!
        ],
        highlightZone: { x: 75, y: 52, width: 10, height: 10, text: 'TAP ENTRY', color: 'border-emerald-500 bg-emerald-500/20 text-emerald-300 animate-pulse' }
      },
      {
        narrative: 'Instant algorithmic rejection! The resting institutional orders trigger and fly upwards to target the external range highs.',
        status: 'STAGE 4: EXPLOSIVE TARGET COMPLETION',
        priceAction: [
          { x: 10, y: 35, type: 'bullish' },
          { x: 20, y: 30, type: 'bullish' },
          { x: 30, y: 45, type: 'bearish' },
          { x: 40, y: 65, type: 'bearish' },
          { x: 50, y: 40, type: 'bullish' },
          { x: 60, y: 25, type: 'bullish' },
          { x: 70, y: 40, type: 'bearish' },
          { x: 80, y: 55, type: 'bearish' },
          { x: 90, y: 20, type: 'bullish' },
          { x: 100, y: 10, type: 'target' }, // final expansion
        ],
        highlightZone: { x: 92, y: 5, width: 16, height: 15, text: 'TARGET SECURED', color: 'border-emerald-400 bg-emerald-500/20 text-emerald-300' }
      }
    ]
  }
};

export default function ReplaySimulator({ isOpen, onClose }: ReplaySimulatorProps) {
  const [activeTab, setActiveTab] = React.useState<keyof typeof SETUPS>('Silver Bullet');
  const [currentStepIdx, setCurrentStepIdx] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const selectedSetup = SETUPS[activeTab];
  const steps = selectedSetup.steps;
  const currentStep = steps[currentStepIdx];

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentStepIdx < steps.length - 1) {
          setCurrentStepIdx((p) => p + 1);
        } else {
          setIsPlaying(false);
        }
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const handleNext = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  const handlePlayToggle = () => {
    if (currentStepIdx === steps.length - 1) {
      setCurrentStepIdx(0);
    }
    setIsPlaying(!isPlaying);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Liquid glass backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-zinc-950/85 backdrop-blur-md cursor-pointer" 
      />

      {/* Main Glass Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 15 }}
        className="relative w-full max-w-4xl bg-[#121212] border border-white/10 backdrop-blur-2xl rounded-none overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600" />
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-2xl pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-none bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-base">Algo Market Replay Terminal</h3>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">Interactive live algorithmic order-book simulation</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-none bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer text-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Setup Selector Tabs */}
        <div className="flex bg-black/30 border-b border-white/10 p-2 gap-2 relative z-10">
          {Object.keys(SETUPS).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentStepIdx(0);
                setIsPlaying(false);
              }}
              className={`px-4 py-2 rounded-none text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30 font-bold'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
              }`}
            >
              {SETUPS[tab].title}
            </button>
          ))}
        </div>

        {/* Modal Grid Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 relative z-10">
          
          {/* Chart Canvas (Left) */}
          <div className="lg:col-span-8 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 bg-black/20">
            
            {/* Top specs */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-none bg-zinc-900 border border-white/10 text-[10px] font-mono text-zinc-400">
                ASSET: EURUSD (15M)
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500">STAGE PROGRESS:</span>
                <div className="flex gap-1">
                  {steps.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-1.5 w-6 rounded-none transition-all duration-300 ${
                        idx <= currentStepIdx ? 'bg-blue-400' : 'bg-zinc-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* SVG Interactive Chart Stage */}
            <div className="relative w-full h-[320px] bg-black/60 rounded-none border border-white/10 p-4 flex items-center justify-center overflow-hidden shadow-inner">
              
              {/* Dynamic status line top left inside chart */}
              <div className="absolute top-3 left-3 flex flex-col gap-0.5">
                <span className="text-[10px] font-mono text-zinc-500">ALGORITHMIC STATE</span>
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                  {currentStep.status}
                </span>
              </div>

              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:2rem_2rem]" />

              {/* Chart Graphics */}
              <svg className="w-full h-full overflow-visible relative z-10" viewBox="0 0 130 100">
                
                {/* Take Profit target line */}
                <line x1="0" y1="15" x2="130" y2="15" stroke="rgba(59,130,246,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
                <text x="1" y="13" fill="#3b82f6" fontSize="3" className="font-mono opacity-60">TARGET LIQUIDITY (TP)</text>

                {/* Sell stop liquidity line */}
                <line x1="0" y1="85" x2="130" y2="85" stroke="rgba(244,63,94,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
                <text x="1" y="89" fill="#f43f5e" fontSize="3" className="font-mono opacity-60">RETAIL STOP LOSSES (LIQUIDITY POOL)</text>

                {/* Draw highlight zones */}
                {currentStep.highlightZone && (
                  <g>
                    <rect 
                      x={currentStep.highlightZone.x} 
                      y={currentStep.highlightZone.y} 
                      width={currentStep.highlightZone.width} 
                      height={currentStep.highlightZone.height} 
                      fill="rgba(59,130,246,0.06)" 
                      stroke="rgba(59,130,246,0.3)" 
                      strokeWidth="0.5" 
                      className="transition-all duration-300"
                    />
                    <text 
                      x={currentStep.highlightZone.x + 1} 
                      y={currentStep.highlightZone.y - 1.5} 
                      fill="#60a5fa" 
                      fontSize="2.5" 
                      className="font-mono font-bold"
                    >
                      {currentStep.highlightZone.text}
                    </text>
                  </g>
                )}

                {/* Render Candles */}
                {currentStep.priceAction.map((point, idx) => {
                  const isBearish = point.type === 'bearish' || point.type === 'sweep';
                  const strokeColor = point.type === 'sweep' ? '#fbbf24' : isBearish ? '#f43f5e' : '#3b82f6';
                  const fillColor = point.type === 'sweep' ? '#fbbf24' : isBearish ? '#f43f5e' : '#3b82f6';
                  const candleWidth = 2.5;
                  const candleHeight = isBearish ? 12 : 14;

                  return (
                    <g key={idx}>
                      {/* Wick */}
                      <line 
                        x1={point.x} 
                        y1={point.y - 6} 
                        x2={point.x} 
                        y2={point.y + 12} 
                        stroke={strokeColor} 
                        strokeWidth="0.4" 
                      />
                      {/* Body */}
                      <rect 
                        x={point.x - candleWidth/2} 
                        y={point.y - candleHeight/2} 
                        width={candleWidth} 
                        height={candleHeight} 
                        fill={fillColor} 
                        stroke="none" 
                      />
                    </g>
                  );
                })}

                {/* Target trace line */}
                {currentStepIdx >= 3 && (
                  <path 
                    d="M 90 35 L 100 75 L 110 85" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="0.8" 
                    strokeDasharray="1.5" 
                  />
                )}
              </svg>

              {/* Live watermarks */}
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-zinc-600">
                PROPRIETARY ENGINE v4.2
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between gap-4 mt-4 bg-zinc-900/50 border border-white/10 rounded-none p-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayToggle}
                  className="p-2 rounded-none bg-blue-500 text-white hover:bg-blue-400 hover:scale-105 transition-all cursor-pointer flex items-center justify-center"
                >
                  <Play className="w-4 h-4 fill-white" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 rounded-none bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all cursor-pointer flex items-center justify-center"
                  title="Reset Simulation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Next/Prev Step */}
              <div className="flex items-center gap-2">
                <button
                  disabled={currentStepIdx === 0}
                  onClick={handlePrev}
                  className="px-3 py-1.5 rounded-none bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 border border-white/10 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  Previous
                </button>
                <button
                  disabled={currentStepIdx === steps.length - 1}
                  onClick={handleNext}
                  className="px-3 py-1.5 rounded-none bg-blue-500/10 hover:bg-blue-500/20 text-xs font-semibold text-blue-300 border border-blue-500/20 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  Next Stage
                </button>
              </div>
            </div>

          </div>

          {/* Narrative / Context (Right) */}
          <div className="lg:col-span-4 p-6 flex flex-col justify-between bg-zinc-900/30">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider">Algorithmic Breakdown</span>
              <h4 className="text-lg font-serif font-bold text-white leading-tight">
                {selectedSetup.title}
              </h4>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {selectedSetup.desc}
              </p>

              <div className="mt-4 p-4 rounded-none bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 blur-xl pointer-events-none" />
                <span className="text-[9px] font-mono text-blue-400 uppercase tracking-widest font-bold">NARRATIVE DETAIL</span>
                <p className="text-xs text-zinc-300 font-sans mt-2 leading-relaxed">
                  {currentStep.narrative}
                </p>
              </div>
            </div>

            {/* Bottom mentorship note */}
            <div className="pt-6 border-t border-white/10 mt-6">
              <div className="flex gap-2 items-center mb-3">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span className="text-[11px] font-semibold text-white uppercase tracking-wider font-sans">MENTORSHIP OUTCOME</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Our curriculum teaches you to spot these exact algorithmic tracks with 85%+ validation precision, allowing you to bypass retail drawdown entirely.
              </p>
            </div>

          </div>

        </div>

      </motion.div>
    </div>
  );
}
