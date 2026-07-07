import React from 'react';

export default function GlowBackground() {
  return (
    <div className="fixed inset-0 -z-50 bg-[#0F0F0F] overflow-hidden">
      {/* Liquid background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-600/10 blur-[130px] animate-liquid-1" />
      <div className="absolute bottom-[10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-indigo-950/20 blur-[140px] animate-liquid-2" />
      <div className="absolute top-[40%] left-[25%] w-[35vw] h-[35vw] rounded-full bg-blue-500/8 blur-[110px] animate-liquid-3" />
      <div className="absolute bottom-[5%] left-[5%] w-[30vw] h-[30vw] rounded-full bg-violet-950/15 blur-[100px] animate-liquid-1" />

      {/* Subtle Grid overlay for trading vibes */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem]" 
        style={{ maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)' }}
      />

      {/* Vertical Editorial Label */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 origin-right rotate-90 text-[120px] font-sans font-black text-white/[0.02] tracking-widest select-none pointer-events-none uppercase">
        LIQUIDITY
      </div>
    </div>
  );
}
