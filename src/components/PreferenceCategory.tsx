import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PreferenceSlider } from './PreferenceSlider';
import { PreferenceCategory as Category, PreferenceValue, Preferences } from '@/data/preferences';
import { motion, AnimatePresence } from 'framer-motion';

interface PreferenceCategoryProps {
  category: Category;
  preferences: Preferences;
  onUpdate: (key: string, value: PreferenceValue) => void;
}

export const PreferenceCategory = ({ category, preferences, onUpdate }: PreferenceCategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isAllHardLimit = category.items.length > 0 && category.items.every((item) => preferences[item.key] === -2);

  return (
    <div className="mb-4 select-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center relative p-4 bg-[#141417] hover:bg-[#1a1a20] rounded-2xl border border-white/5 transition-all duration-200 group shadow-md"
      >
        <h3 className="font-display text-lg text-gray-300 font-medium tracking-wide text-center transition-colors group-hover:text-gray-400">
          {category.name}
        </h3>
        <div className="absolute right-4">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 py-6 bg-card rounded-2xl mt-2 border border-white/10 shadow-2xl flex flex-col gap-2">
              
              <button
                onClick={() => {
                  const newValue = isAllHardLimit ? 0 : -2;
                  category.items.forEach((item) => onUpdate(item.key, newValue));
                }}
                className={`mb-6 w-full py-2 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-colors shadow-sm ${
                  isAllHardLimit 
                    ? "bg-transparent text-muted-foreground border-white/10 hover:bg-white/5" 
                    : "bg-[#1a1a20] text-[hsl(0,75%,55%)] border-[hsl(0,75%,55%)]/30 hover:bg-[hsl(0,75%,55%)]/10"
                }`}
              >
                {isAllHardLimit ? "Reset Category Limits" : "Set All To Hard Limit"}
              </button>

              <div className={`flex flex-col gap-2 transition-all duration-300 ${isAllHardLimit ? "opacity-40 grayscale pointer-events-none" : "opacity-100"}`}>
                {category.items.map((item) => (
                  <PreferenceSlider
                    key={item.key}
                    label={item.label}
                    value={preferences[item.key] ?? 0}
                    onChange={(value) => onUpdate(item.key, value as PreferenceValue)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
