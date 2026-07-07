import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TickerAsset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  decimals: number;
}

const INITIAL_ASSETS: TickerAsset[] = [
  { symbol: 'BTCUSD', name: 'Bitcoin', price: 92450.50, change: 1.45, decimals: 2 },
  { symbol: 'ETHUSD', name: 'Ethereum', price: 3412.20, change: -0.82, decimals: 2 },
  { symbol: 'XAUUSD', name: 'Gold Spot', price: 2342.85, change: 0.35, decimals: 2 },
  { symbol: 'EURUSD', name: 'Euro / US Dollar', price: 1.09245, change: 0.12, decimals: 5 },
  { symbol: 'GBPUSD', name: 'Pound / US Dollar', price: 1.27132, change: -0.05, decimals: 5 },
  { symbol: 'US30', name: 'Dow Jones 30', price: 41250.00, change: 0.88, decimals: 1 },
];

export default function TickerTape() {
  const [assets, setAssets] = React.useState<TickerAsset[]>(INITIAL_ASSETS);
  const [tickStates, setTickStates] = React.useState<Record<string, 'up' | 'down' | null>>({});

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prevAssets) => {
        const nextAssets = [...prevAssets];
        // Select 1 or 2 random assets to update
        const numUpdates = Math.floor(Math.random() * 2) + 1;
        const updatedKeys: Record<string, 'up' | 'down'> = {};

        for (let i = 0; i < numUpdates; i++) {
          const idx = Math.floor(Math.random() * nextAssets.length);
          const asset = nextAssets[idx];
          
          // Random walk price update
          const volatility = asset.symbol.includes('USD') && !asset.symbol.includes('XAU') ? 0.00015 : 0.002;
          const direction = Math.random() > 0.48 ? 1 : -1; // slight upward bias
          const percentChange = direction * volatility * Math.random();
          const priceDelta = asset.price * percentChange;
          
          const newPrice = asset.price + priceDelta;
          const newChange = asset.change + (direction * 0.03);

          nextAssets[idx] = {
            ...asset,
            price: newPrice,
            change: parseFloat(Math.min(Math.max(newChange, -8), 8).toFixed(2)),
          };

          updatedKeys[asset.symbol] = direction > 0 ? 'up' : 'down';
        }

        setTickStates((prev) => {
          const next = { ...prev };
          Object.keys(updatedKeys).forEach((sym) => {
            next[sym] = updatedKeys[sym];
          });
          return next;
        });

        // Clear flash highlight after 400ms
        setTimeout(() => {
          setTickStates((prev) => {
            const next = { ...prev };
            Object.keys(updatedKeys).forEach((sym) => {
              if (next[sym] === updatedKeys[sym]) {
                next[sym] = null;
              }
            });
            return next;
          });
        }, 400);

        return nextAssets;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-black/40 backdrop-blur-md border-b border-white/10 py-2.5 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8 md:justify-between overflow-x-auto no-scrollbar py-0.5">
          {assets.map((asset) => {
            const isUp = asset.change >= 0;
            const tick = tickStates[asset.symbol];
            
            let tickColorClass = 'text-zinc-400';
            if (tick === 'up') tickColorClass = 'text-blue-400 font-bold scale-105';
            if (tick === 'down') tickColorClass = 'text-red-400 font-bold scale-105';

            return (
              <div 
                key={asset.symbol} 
                className="flex items-center gap-2.5 shrink-0 transition-all duration-300 ease-out"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-sans font-bold text-white tracking-wider">
                      {asset.symbol}
                    </span>
                    <span className={`flex items-center text-[10px] font-medium ${isUp ? 'text-blue-400' : 'text-rose-400'}`}>
                      {isUp ? '+' : ''}{asset.change}%
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-sans leading-none">{asset.name}</span>
                </div>

                <div className={`font-mono text-xs transition-all duration-300 ${tickColorClass}`}>
                  {asset.price.toLocaleString(undefined, { 
                    minimumFractionDigits: asset.decimals, 
                    maximumFractionDigits: asset.decimals 
                  })}
                </div>

                <div className={`p-1 rounded-none border ${isUp ? 'border-blue-500/20 bg-blue-500/5 text-blue-400' : 'border-rose-500/20 bg-rose-500/5 text-rose-400'}`}>
                  {isUp ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
