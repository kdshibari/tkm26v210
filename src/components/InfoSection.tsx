import { useState } from 'react';
import { ChevronDown, ChevronUp, Info, Shield, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const InfoSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-primary/10 hover:bg-primary/20 rounded-xl border border-primary/30 transition-all shadow-md"
      >
        <span className="flex items-center gap-2 font-display text-foreground tracking-wide">
          <Info className="w-5 h-5 text-primary shrink-0" />
          How to Use
        </span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 bg-card/50 rounded-xl mt-2 border border-white/5 shadow-2xl backdrop-blur-xl space-y-4">
              <div>
                <p className="text-sm text-foreground mb-3">Use the sliders to indicate your preferences:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full shrink-0 bg-[hsl(0,80%,60%)] shadow-[0_0_8px_hsl(0,80%,60%)]" /><span><strong>Hard</strong> - Hard Limit</span></div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full shrink-0 bg-[hsl(28,100%,60%)] shadow-[0_0_8px_hsl(28,100%,60%)]" /><span><strong>Soft</strong> - Soft Limit</span></div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full shrink-0 bg-[hsl(45,100%,60%)] shadow-[0_0_8px_hsl(45,100%,60%)]" /><span><strong>Moderate</strong> - Open to trying</span></div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full shrink-0 bg-[hsl(160,80%,50%)] shadow-[0_0_8px_hsl(160,80%,50%)]" /><span><strong>Yes!</strong> - Love it!</span></div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-4">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 shrink-0 text-green-500 mt-0.5 drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">Communication</p>
                    <p className="text-xs text-muted-foreground">Use safe words to maintain consent, below is an example of a common safeword system:</p>
                    <p className="text-xs text-muted-foreground mt-2">🟢 Continue | 🟡 Slow Down | 🔴 STOP</p>
                    <ul className="text-xs text-muted-foreground list-disc ml-4 mt-2 space-y-1">
                      <li>Discuss your safewords beforehand.</li>
                      <li>Ensure both partners understand the meaning of each word.</li>
                      <li>Respect the safewords immediately when used, and check in with your partner afterward.</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Heart className="w-4 h-4 shrink-0 text-pink-500 mt-0.5 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">Aftercare</p>
                    <ul className="text-xs text-muted-foreground list-disc ml-4 mt-1 space-y-1">
                      <li>Plan aftercare with your partner beforehand.</li>
                      <li>Have water, snacks, or blankets ready.</li>
                      <li>Discuss feelings and provide physical comfort.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
