import React from 'react';
import { motion } from 'motion/react';
import { Play, ShieldAlert, CheckCircle2, TrendingUp, Info, HelpCircle } from 'lucide-react';

interface SimulationPoint {
  tradeNum: number;
  equity: number;
  isWin: boolean;
}

export default function RiskCalculator() {
  const [balance, setBalance] = React.useState<number>(100000);
  const [riskPct, setRiskPct] = React.useState<number>(1);
  const [winRate, setWinRate] = React.useState<number>(55);
  const [riskReward, setRiskReward] = React.useState<number>(3);
  const [tradeCount, setTradeCount] = React.useState<number>(40);
  
  const [simData, setSimData] = React.useState<SimulationPoint[]>([]);
  const [finalEquity, setFinalEquity] = React.useState<number>(100000);
  const [maxDrawdown, setMaxDrawdown] = React.useState<number>(0);
  const [isSimulating, setIsSimulating] = React.useState<boolean>(false);
  const [hasSimulated, setHasSimulated] = React.useState<boolean>(false);

  // Run simulation
  const runSimulation = () => {
    setIsSimulating(true);
    setHasSimulated(true);

    let currentEquity = balance;
    let peakEquity = balance;
    let maxDraw = 0;
    const data: SimulationPoint[] = [{ tradeNum: 0, equity: balance, isWin: false }];
    const riskAmount = (balance * riskPct) / 100;

    for (let i = 1; i <= tradeCount; i++) {
      const isWin = Math.random() * 100 < winRate;
      const change = isWin ? riskAmount * riskReward : -riskAmount;
      currentEquity += change;
      
      if (currentEquity > peakEquity) {
        peakEquity = currentEquity;
      }
      
      const draw = ((peakEquity - currentEquity) / peakEquity) * 100;
      if (draw > maxDraw) {
        maxDraw = draw;
      }

      data.push({
        tradeNum: i,
        equity: Math.max(0, parseFloat(currentEquity.toFixed(2))),
        isWin
      });
    }

    // Animate the loading of simulation points sequentially
    let step = 0;
    const interval = setInterval(() => {
      if (step <= data.length) {
        setSimData(data.slice(0, step));
        setFinalEquity(data[Math.min(step, data.length - 1)].equity);
        step += 2; // load 2 trades per frame for rapid clean animation
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 30);
  };

  React.useEffect(() => {
    runSimulation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Compute SVG parameters
  const getSvgPath = () => {
    if (simData.length === 0) return '';
    const width = 500;
    const height = 200;
    const padding = 15;

    const minEquity = Math.min(...simData.map(d => d.equity), balance * 0.8);
    const maxEquity = Math.max(...simData.map(d => d.equity), balance * 1.2);
    
    const equityRange = maxEquity - minEquity || 1;

    return simData.map((d, index) => {
      const x = padding + (index / (tradeCount)) * (width - padding * 2);
      const y = height - padding - ((d.equity - minEquity) / equityRange) * (height - padding * 2);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  // Check if student passed Prop Firm evaluation rules (10% profit target, 8% max drawdown limit)
  const profitTarget = balance * 1.10;
  const isTargetMet = finalEquity >= profitTarget;
  const isDrawdownSafe = maxDrawdown <= 8;
  const isFunded = isTargetMet && isDrawdownSafe;

  return (
    <section id="simulator" className="py-20 relative overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute top-[40%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase font-sans text-blue-400 tracking-[0.2em] font-bold">
            Interactive Terminal
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-white mt-3 tracking-tight">
            Algorithmic Risk Terminal
          </h2>
          <p className="text-sm text-zinc-400 font-sans mt-3 leading-relaxed">
            See the math behind the mentorship. Adjust the variables below to simulate how high-probability risk architecture scales capital over {tradeCount} institutional trades.
          </p>
        </div>

        {/* Liquid Glass Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Panel (Left 5 Columns) */}
          <div className="lg:col-span-5 p-6 rounded-none bg-[#121212] border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
                <Info className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">SIMULATION TERMINAL SPECS</span>
              </div>

              {/* Slider Inputs */}
              <div className="flex flex-col gap-5">
                
                {/* Initial Balance */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-zinc-300">Initial Account Size</span>
                    <span className="font-mono text-blue-400 font-bold">${balance.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10000" 
                    max="200000" 
                    step="10000"
                    value={balance}
                    onChange={(e) => setBalance(Number(e.target.value))}
                    disabled={isSimulating}
                    className="w-full h-1 bg-zinc-800 rounded-none appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                    <span>$10,000</span>
                    <span>$200,000</span>
                  </div>
                </div>

                {/* Risk Per Trade */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-zinc-300">Risk Per Setup</span>
                    <span className="font-mono text-blue-400 font-bold">{riskPct}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="3.0" 
                    step="0.5"
                    value={riskPct}
                    onChange={(e) => setRiskPct(Number(e.target.value))}
                    disabled={isSimulating}
                    className="w-full h-1 bg-zinc-800 rounded-none appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                    <span>0.5% (Conservative)</span>
                    <span>3.0% (Aggressive)</span>
                  </div>
                </div>

                {/* Win Rate */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-zinc-300">Win Rate</span>
                    <span className="font-mono text-blue-400 font-bold">{winRate}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="35" 
                    max="80" 
                    step="5"
                    value={winRate}
                    onChange={(e) => setWinRate(Number(e.target.value))}
                    disabled={isSimulating}
                    className="w-full h-1 bg-zinc-800 rounded-none appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                    <span>35% (High RR setup)</span>
                    <span>80% (Scalping)</span>
                  </div>
                </div>

                {/* Risk to Reward */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-zinc-300">Risk-to-Reward Ratio</span>
                    <span className="font-mono text-blue-400 font-bold">1:{riskReward}</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="6" 
                    step="1"
                    value={riskReward}
                    onChange={(e) => setRiskReward(Number(e.target.value))}
                    disabled={isSimulating}
                    className="w-full h-1 bg-zinc-800 rounded-none appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                    <span>1:2 Minimum</span>
                    <span>1:6 Elite Limit</span>
                  </div>
                </div>

                {/* Trades Count */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-zinc-300">Simulated Trades</span>
                    <span className="font-mono text-blue-400 font-bold">{tradeCount}</span>
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="100" 
                    step="10"
                    value={tradeCount}
                    onChange={(e) => {
                      setTradeCount(Number(e.target.value));
                      setSimData([]);
                    }}
                    disabled={isSimulating}
                    className="w-full h-1 bg-zinc-800 rounded-none appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                    <span>20 trades</span>
                    <span>100 trades</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Simulate CTA */}
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="mt-8 w-full py-3 rounded-none bg-blue-500 hover:bg-blue-400 text-white font-sans uppercase tracking-widest font-bold text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              {isSimulating ? 'Processing Vectors...' : 'Compute Algo Run'}
            </button>
          </div>

          {/* Equity Chart Screen (Right 7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 rounded-none bg-[#121212] border border-white/10 backdrop-blur-xl shadow-2xl relative">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600" />
            
            {/* Top Stat Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 relative z-10">
              <div className="p-3.5 rounded-none bg-black/40 border border-white/5">
                <span className="text-[10px] text-zinc-500 font-mono uppercase">FINAL BALANCE</span>
                <p className={`text-base font-mono font-bold mt-1 ${finalEquity >= balance ? 'text-blue-400' : 'text-rose-400'}`}>
                  ${finalEquity.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="p-3.5 rounded-none bg-black/40 border border-white/5">
                <span className="text-[10px] text-zinc-500 font-mono uppercase">PROFIT / LOSS</span>
                <p className={`text-base font-mono font-bold mt-1 ${finalEquity >= balance ? 'text-blue-400' : 'text-rose-400'}`}>
                  {finalEquity >= balance ? '+' : ''}{(((finalEquity - balance) / balance) * 100).toFixed(1)}%
                </p>
              </div>

              <div className="p-3.5 rounded-none bg-black/40 border border-white/5">
                <span className="text-[10px] text-zinc-500 font-mono uppercase">MAX DRAWDOWN</span>
                <p className={`text-base font-mono font-bold mt-1 ${maxDrawdown <= 8 ? 'text-blue-400' : 'text-amber-500'}`}>
                  {maxDrawdown.toFixed(2)}%
                </p>
              </div>

              <div className="p-3.5 rounded-none bg-black/40 border border-white/5">
                <span className="text-[10px] text-zinc-500 font-mono uppercase">WIN COUNT</span>
                <p className="text-base font-mono font-bold text-white mt-1">
                  {simData.filter(d => d.isWin).length} <span className="text-xs text-zinc-500 font-normal">/ {simData.length ? simData.length - 1 : 0}</span>
                </p>
              </div>
            </div>

            {/* Simulated Chart Plot Area */}
            <div className="relative w-full h-[220px] bg-black/40 rounded-none border border-white/10 p-2 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
              
              {simData.length > 0 ? (
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
                  <defs>
                    <linearGradient id="glow-grad-blue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Draw grid benchmarks */}
                  <line x1="15" y1="100" x2="485" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
                  
                  {/* Equity Line Path */}
                  <path 
                    d={getSvgPath()} 
                    fill="none" 
                    stroke={finalEquity >= balance ? '#3b82f6' : '#f43f5e'} 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transition-all duration-500"
                  />

                  {/* Draw fill under curve if profitable */}
                  {finalEquity >= balance && (
                    <path
                       d={`${getSvgPath()} L 485 185 L 15 185 Z`}
                      fill="url(#glow-grad-blue)"
                      stroke="none"
                      className="transition-all duration-500"
                    />
                  )}
                </svg>
              ) : (
                <span className="text-zinc-600 text-xs font-mono">Awaiting computation trigger...</span>
              )}

              {/* Status Watermark */}
              {hasSimulated && !isSimulating && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-zinc-950 border border-white/10">
                  {isFunded ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-[9px] font-mono font-bold text-blue-400 uppercase tracking-widest">PROP EVALUATION PASSED</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                      <span className="text-[9px] font-mono font-bold text-rose-400 uppercase tracking-widest">
                        {!isDrawdownSafe ? 'DRAWDOWN BREACHED' : 'TARGET NOT REACHED'}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Bottom educational prompt */}
            <div className="mt-6 pt-6 border-t border-white/10 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-[11px] text-zinc-500 leading-normal max-w-md">
                <strong>Prop Rules:</strong> Real prop evaluations (FTMO, FundedNext) require a +10% target with a strict max 8% drawdown limit. A 55% win-rate with tight 1:3 RR easily passes. Mentees receive verified risk guides.
              </p>
              <div className="flex gap-2 shrink-0">
                <span className="px-2.5 py-1 rounded-none bg-white/5 border border-white/10 text-[10px] text-zinc-400 font-mono">
                  RISK: {riskPct}%
                </span>
                <span className="px-2.5 py-1 rounded-none bg-white/5 border border-white/10 text-[10px] text-zinc-400 font-mono">
                  PAYOUT: 1:{riskReward}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
