import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DisclaimerSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mt-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-primary/5 hover:bg-primary/10 rounded-xl border border-primary/20 transition-all shadow-md"
      >
        <span className="flex items-center gap-2 font-display text-foreground tracking-wide text-sm opacity-80">
          <AlertTriangle className="w-4 h-4 text-primary shrink-0" />
          Disclaimer and Terms of Use
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 bg-card/50 rounded-xl mt-2 border border-white/5 shadow-2xl backdrop-blur-xl space-y-4 text-left">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">1. Educational Purpose Only:</strong> This application is provided strictly for communication and entertainment purposes. It does not constitute medical, psychological, or relationship advice.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">2. Assumption of Risk:</strong> Engaging in intimate dynamics involves inherent physical and psychological risks. You acknowledge these risks and agree that you are solely responsible for your own safety and wellbeing.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">3. Absolute User Responsibility:</strong> This tool does not guarantee or replace active consent. You are exclusively responsible for obtaining and maintaining enthusiastic consent at all times. You are also solely responsible for ensuring all activities comply with your local laws.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">4. Limitation of Liability:</strong> To the maximum extent permitted by law, the creator and developers of The Kinky Map shall not be held liable for any direct, indirect, incidental, or consequential damages arising from your use of this tool. This absolute release of liability includes all claims related to personal injury, emotional distress, or relationship disputes.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">5. Data Privacy and Sharing:</strong> You are entirely responsible for the distribution of your generated links. The creator accepts no liability for how your partners or others handle your shared information once you generate a link.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">6. Privacy Policy:</strong> This application uses standard web analytics to monitor general site traffic. When you create a shareable link, your selected preferences are stored anonymously in our database to generate that specific URL. We do not collect personal identifiers, track individual users, or sell your data.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
