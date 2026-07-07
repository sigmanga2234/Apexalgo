import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Award, DollarSign, Calendar, MessageSquare } from 'lucide-react';

interface NavbarProps {
  onOpenApply: () => void;
}

export default function Navbar({ onOpenApply }: NavbarProps) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-neutral-950/80 backdrop-blur-md border-b border-white/10' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo with Editorial Typography */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="relative w-9 h-9 rounded-none border border-white/20 flex items-center justify-center bg-white/[0.02] transition-colors group-hover:border-blue-400/50">
            <TrendingUp className="w-4 h-4 text-blue-400 transition-colors" />
          </div>
          <span className="font-serif text-xl tracking-wider text-white">
            APEX<span className="text-blue-400 italic ml-1">ALGO</span>
          </span>
        </div>

        {/* Links with Editorial Aesthetic */}
        <nav className="hidden md:flex items-center gap-1 px-2 py-1 border border-white/10 bg-black/40 backdrop-blur-md rounded-none">
          {[
            { id: 'hero', name: 'Overview', icon: TrendingUp },
            { id: 'curriculum', name: 'Curriculum', icon: Award },
            { id: 'testimonials', name: 'Wall of Love', icon: MessageSquare },
            { id: 'simulator', name: 'Risk Terminal', icon: DollarSign },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-widest font-sans font-medium text-zinc-400 hover:text-white transition-all"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Action Button: Elegant Sharp Double-Borders */}
        <div>
          <button
            onClick={onOpenApply}
            className="relative px-5 py-2 text-[11px] font-sans uppercase tracking-widest font-semibold text-white border border-white/30 bg-transparent hover:bg-white hover:text-black transition-all duration-300 active:scale-95 cursor-pointer"
          >
            Apply Mentorship
          </button>
        </div>
      </div>
    </header>
  );
}
