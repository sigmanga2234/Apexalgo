import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Sparkles, AlertCircle, FileText, Send, Calendar, Check } from 'lucide-react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplyModal({ isOpen, onClose }: ApplyModalProps) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [experience, setExperience] = React.useState('Intermediate');
  const [capital, setCapital] = React.useState('$50k - $200k');
  const [barrier, setBarrier] = React.useState('');
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    
    // Simulate complex algorithmic processing/evaluations
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2500);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setBarrier('');
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Liquid glass background */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-zinc-950/85 backdrop-blur-md cursor-pointer" 
      />

      {/* Main Glass Modal Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 15 }}
        className="relative w-full max-w-lg bg-[#121212] border border-white/10 backdrop-blur-2xl rounded-none overflow-hidden shadow-2xl z-10"
      >
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600" />
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-none bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-base">Onboarding Application</h3>
              <p className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider">Submit your profile to verify program suitability</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-none bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer text-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Stages */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              /* Loading Screen (Liquid glow) */
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center gap-5"
              >
                <div className="relative w-16 h-16 rounded-none flex items-center justify-center bg-blue-500/10 border border-blue-500/20">
                  <div className="absolute inset-0 rounded-none border-4 border-blue-500/20 border-t-blue-400 animate-spin" />
                  <Sparkles className="w-6 h-6 text-blue-400 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-bold text-white uppercase tracking-widest">Evaluating Capital Risk Vector</h4>
                  <p className="text-xs text-zinc-500 font-mono mt-1">Cross referencing London sessions metrics & targets...</p>
                </div>
              </motion.div>

            ) : isSuccess ? (
              /* Success Screen */
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-4 flex flex-col gap-6 text-center"
              >
                <div className="w-16 h-16 rounded-none bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto shadow-xl">
                  <Check className="w-8 h-8 stroke-[3px]" />
                </div>

                <div>
                  <h4 className="text-lg font-serif font-bold text-white">Application Vector Approved</h4>
                  <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto leading-relaxed">
                    Your profile matches our risk allocation criteria. We have scheduled your 1-on-1 strategy onboarding callback:
                  </p>
                </div>

                {/* Scheduled details */}
                <div className="p-4 rounded-none bg-black/40 border border-white/5 text-left flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-zinc-500 font-mono block uppercase">ONBOARDING STRATEGY CALL</span>
                    <span className="text-xs font-bold text-white font-sans">Tomorrow • 2:00 PM London Time</span>
                    <p className="text-[10px] text-zinc-400 mt-1">Check your inbox ({email}) for direct Zoom room invite link.</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <a 
                    href="https://t.me/apex_algo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-none bg-blue-500 hover:bg-blue-400 text-white font-sans uppercase tracking-widest font-bold text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 fill-white" /> Join Discord Lounge Now
                  </a>
                  <button 
                    onClick={resetForm}
                    className="py-2.5 rounded-none bg-white/5 border border-white/10 text-xs font-semibold text-zinc-400 hover:text-white transition-all cursor-pointer"
                  >
                    Close Screen
                  </button>
                </div>
              </motion.div>

            ) : (
              /* Standard Application Form */
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4 text-left"
              >
                {/* Full name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-400">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Mercer"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-3 rounded-none bg-black/40 border border-white/10 text-white placeholder-zinc-600 focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/40 text-xs transition-all outline-none"
                  />
                </div>

                {/* Email address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-400">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3 rounded-none bg-black/40 border border-white/10 text-white placeholder-zinc-600 focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/40 text-xs transition-all outline-none"
                  />
                </div>

                {/* Exp Selector buttons */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-400">Current Trading Experience</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Beginner', 'Intermediate', 'Prop Veteran'].map((level) => {
                      const isActive = experience === level;
                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setExperience(level)}
                          className={`py-2 rounded-none text-[10px] font-bold tracking-wide transition-all border cursor-pointer ${
                            isActive 
                              ? 'bg-blue-500/15 border-blue-500/30 text-blue-300 font-bold' 
                              : 'bg-black/20 border-white/5 text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          {level}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Goal Selector buttons */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-400">Primary Capital Target</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Under $50k', '$50k - $200k', 'Personal Cash'].map((cap) => {
                      const isActive = capital === cap;
                      return (
                        <button
                          key={cap}
                          type="button"
                          onClick={() => setCapital(cap)}
                          className={`py-2 rounded-none text-[10px] font-bold tracking-wide transition-all border cursor-pointer ${
                            isActive 
                              ? 'bg-blue-500/15 border-blue-500/30 text-blue-300 font-bold' 
                              : 'bg-black/20 border-white/5 text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          {cap}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* psychological barriers */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-400">
                    What is your primary trading psychological barrier?
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="E.g., FOMO during New York session, revenge trading, or lack of structured risk management rules."
                    value={barrier}
                    onChange={(e) => setBarrier(e.target.value)}
                    className="px-4 py-3 rounded-none bg-black/40 border border-white/10 text-white placeholder-zinc-600 focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/40 text-xs transition-all outline-none resize-none"
                  />
                </div>

                {/* Trust info */}
                <div className="p-3.5 rounded-none bg-white/5 border border-white/5 flex gap-2.5 text-left items-start">
                  <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-zinc-400 leading-normal">
                    Approval rates are based on risk commitment. Mentees must commit to at least 4 hours of simulator training weekly.
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 mt-2 rounded-none bg-blue-500 hover:bg-blue-400 text-white font-sans uppercase tracking-widest font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-blue-400"
                >
                  <Send className="w-4 h-4 fill-white" /> Verify Suitability profile
                </button>

              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}
