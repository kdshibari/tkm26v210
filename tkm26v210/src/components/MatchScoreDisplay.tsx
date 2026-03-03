import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, AlertTriangle, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { MatchResult, getScoreLabel, getScoreColor } from '@/utils/matchScore';

interface MatchScoreDisplayProps {
  result: MatchResult;
  myName: string;
  partnerName: string;
}

export const MatchScoreDisplay = ({ result, myName, partnerName }: MatchScoreDisplayProps) => {
  const scoreColor = getScoreColor(result.overallScore);
  const circumference = 2 * Math.PI * 54; // radius = 54
  const strokeOffset = circumference - (result.overallScore / 100) * circumference;

  // State for collapsible categories
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-xl p-6 border border-border glow-burgundy shadow-lg"
    >
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl text-foreground mb-2 flex items-center justify-center gap-2">
          <Heart className="w-6 h-6 text-primary" />
          Match Score
          <Heart className="w-6 h-6 text-primary" />
        </h2>
        <p className="text-sm text-muted-foreground">
          {myName || 'You'} & {partnerName || 'Partner'}
        </p>
      </div>

      {/* --- CIRCULAR SCORE --- */}
      <div className="flex justify-center mb-4">
        <div className="relative w-36 h-36">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="54"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            {/* Score circle */}
            <motion.circle
              cx="72"
              cy="72"
              r="54"
              fill="none"
              stroke={scoreColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: strokeOffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          {/* Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="text-4xl font-display font-bold"
              style={{ color: scoreColor }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              {result.overallScore}%
            </motion.span>
          </div>
        </div>
      </div>

      <motion.p
        className="text-center font-display text-lg mb-8"
        style={{ color: scoreColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {getScoreLabel(result.overallScore)}
      </motion.p>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="text-center p-3 bg-secondary/30 rounded-lg border border-border/50">
          <Sparkles className="w-5 h-5 mx-auto mb-1 text-green-400" />
          <p className="text-lg font-bold text-foreground">{result.perfectMatches.length}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Perfect</p>
        </div>
        <div className="text-center p-3 bg-secondary/30 rounded-lg border border-border/50">
          <Star className="w-5 h-5 mx-auto mb-1 text-orange-400" />
          <p className="text-lg font-bold text-foreground">{result.curiousMatches.length}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Interest</p>
        </div>
        <div className="text-center p-3 bg-secondary/30 rounded-lg border border-border/50">
          <AlertTriangle className="w-5 h-5 mx-auto mb-1 text-red-400" />
          <p className="text-lg font-bold text-foreground">{result.conflicts.length}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Conflicts</p>
        </div>
      </div>

      {/* --- DETAILED BREAKDOWN (ACCORDION) --- */}
      {result.categoryScores.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-display text-sm text-muted-foreground mb-4 uppercase tracking-widest text-center">Category Breakdown</h4>
          
          {result.categoryScores
            .sort((a, b) => b.score - a.score)
            .map((cat) => (
              <div key={cat.categoryId} className="border border-border rounded-lg bg-card/50 overflow-hidden">
                <button
                  onClick={() => setExpandedCategory(expandedCategory === cat.categoryId ? null : cat.categoryId)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex-1 flex flex-col items-start">
                    <span className="text-sm font-medium text-foreground">{cat.categoryName}</span>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: getScoreColor(cat.score) }}
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.score}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end min-w-[3rem]">
                    <span className="text-sm font-bold" style={{ color: getScoreColor(cat.score) }}>
                      {cat.score}%
                    </span>
                  </div>
                  
                  {expandedCategory === cat.categoryId ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedCategory === cat.categoryId && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-secondary/10"
                    >
                      <div className="p-3 text-xs space-y-4 border-t border-border/30">
                        
                        {/* Section 1: Perfect Matches (Green) */}
                        {cat.perfect.length > 0 && (
                          <div>
                            <p className="text-green-400/80 mb-1.5 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> Perfect Matches
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {cat.perfect.map(item => (
                                <span key={item} className="px-2 py-1 bg-green-500/10 text-green-400 rounded-md border border-green-500/20">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Section 2: Conflicts (Red) */}
                        {cat.conflicts.length > 0 && (
                          <div>
                            <p className="text-red-400/80 mb-1.5 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Conflicts
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {cat.conflicts.map(item => (
                                <span key={item} className="px-2 py-1 bg-red-500/10 text-red-400 rounded-md border border-red-500/20">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Section 3: Mutual/Curious (Orange) */}
                        {cat.curious.length > 0 && (
                          <div>
                            <p className="text-orange-400/80 mb-1.5 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                              <Star className="w-3 h-3" /> Interesting
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {cat.curious.map(item => (
                                <span key={item} className="px-2 py-1 bg-orange-500/10 text-orange-400 rounded-md border border-orange-500/20">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Empty State */}
                        {cat.perfect.length === 0 && cat.conflicts.length === 0 && cat.curious.length === 0 && (
                          <p className="text-muted-foreground italic text-center py-2">
                            No strong matches or conflicts in this category.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
        </div>
      )}
    </motion.div>
  );
};
