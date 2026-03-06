import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Heart, Mail, ExternalLink, Copy } from 'lucide-react';
import { Header } from '@/components/Header';
import { InfoSection } from '@/components/InfoSection';
import { PreferenceCategory } from '@/components/PreferenceCategory';
import { MatchScoreDisplay } from '@/components/MatchScoreDisplay';
import { ShareButtons } from '@/components/ShareButtons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePreferences } from '@/hooks/usePreferences';
import { useToast } from '@/hooks/use-toast';
import { PREFERENCE_CATEGORIES } from '@/data/preferences';
import { calculateMatchScore, hasAnyPreferencesSet } from '@/utils/matchScore';
import { DisclaimerSection } from '@/components/DisclaimerSection';
import { IdentityState, defaultIdentity } from '../IdentityData';
import { IdentityModal } from '../IdentityModal';

const Index = () => {
  const {
    myPreferences,
    partnerPreferences,
    myName,
    partnerName,
    myRole,
    partnerRole,
    setMyName,
    setPartnerName,
    setMyRole,
    setPartnerRole,
    updateMyPreference,
    updatePartnerPreference,
    resetAll,
    getShareableUrl,
    isLoading 
  } = usePreferences();

  const [activeTab, setActiveTab] = useState('me');
  const { toast } = useToast();

  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false);
  const [meIdentity, setMeIdentity] = useState<IdentityState>(defaultIdentity);
  const [partnerIdentity, setPartnerIdentity] = useState<IdentityState>(defaultIdentity);

  const matchResult = useMemo(() => {
    return calculateMatchScore(myPreferences, partnerPreferences);
  }, [myPreferences, partnerPreferences]);

  const bothHavePreferences = hasAnyPreferencesSet(myPreferences) && hasAnyPreferencesSet(partnerPreferences);
  const visibleCategories = PREFERENCE_CATEGORIES;

  const handleCopyProfile = async () => {
    let titleText = 'My Kinky Map';
    if (myName && partnerName) {
      titleText = `${myName} & ${partnerName}'s Kinky Map`;
    } else if (myName) {
      titleText = `${myName}'s Kinky Map`;
    }
    
    let text = `😈 ${titleText} 😈\n\n`;

    const formatIdentity = (name: string, id: IdentityState, defaultTitle: string) => {
      if (!id.gender && !id.pronouns && !id.orientation && !id.relationship) return "";
      
      const title = name ? `${name.toUpperCase()}'S IDENTITY` : defaultTitle;
      let section = `❖ ── ${title} ── ❖\n`;
      if (id.pronouns) section += `Pronouns: ${id.pronouns}\n`;
      if (id.gender) section += `Gender: ${id.gender}\n`;
      if (id.orientation) section += `Orientation: ${id.orientation}\n`;
      if (id.relationship) section += `Dating: ${id.relationship}\n`;
      return section + `\n`;
    };

    text += formatIdentity(myName, meIdentity, 'MY IDENTITY');
    text += formatIdentity(partnerName, partnerIdentity, 'PARTNER IDENTITY');

    text += "❖ ── KINK PREFERENCES ── ❖\n\n";

    PREFERENCE_CATEGORIES.forEach(category => {
      const allHard = category.items.every(item => myPreferences[item.key] === -2);
      if (allHard) return; 

      let catText = `✦ ${category.name.toUpperCase()} ✦\n`;
      let hasItems = false;

      category.items.forEach(item => {
        const val = myPreferences[item.key];
        if (val !== undefined && val !== 0) { 
          let label = "";
          if (val === -2) label = "🔴";
          if (val === -1) label = "🟠";
          if (val === 1) label = "🟡";
          if (val === 2) label = "🟢";

          catText += `  ↳ ${label} ${item.label}\n`;
          hasItems = true;
        }
      });

      if (hasItems) {
        text += catText + '\n';
      }
    });

    try {
      const getFooter = (url: string) => text + `──────────────────────\nCompare maps with me here:\n${url}`;

      if (navigator.clipboard && (window as any).ClipboardItem) {
        const textBlobPromise = getShareableUrl().then(url => 
          new Blob([getFooter(url)], { type: 'text/plain' })
        );
        
        await navigator.clipboard.write([
          new (window as any).ClipboardItem({
            'text/plain': textBlobPromise
          })
        ]);
        
        toast({
          title: "Profile Copied!",
          description: "Your map text is ready to share.",
        });
        return;
      }

      const url = await getShareableUrl();
      const finalText = getFooter(url);

      const copyToClipboardFallback = (copyText: string) => {
        const textArea = document.createElement("textarea");
        textArea.value = copyText;
        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {}
        textArea.remove();
      };

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(finalText);
        } catch (err) {
          copyToClipboardFallback(finalText);
        }
      } else {
        copyToClipboardFallback(finalText);
      }

      toast({
        title: "Profile Copied!",
        description: "Your map text is ready to share.",
      });
    } catch (err) {
      console.error("Failed to copy text", err);
      toast({
        title: "Copy Failed",
        description: "Please try again or manually copy the text.",
        variant: "destructive",
      });
    }
  };
const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all data? This action cannot be undone.")) {
      resetAll();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground animate-pulse uppercase tracking-widest text-[10px] font-bold">
            Unfolding the Map...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 pb-12 max-w-7xl">
        <Header />

        <main className="space-y-6">
          <div className="max-w-3xl mx-auto">
             <InfoSection />
          </div>

          <motion.div
            className="bg-card/80 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-4 max-w-4xl mx-auto shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground ml-1">Your Name</label>
                <Input
                  value={myName}
                  onChange={(e) => setMyName(e.target.value)}
                  placeholder="Name"
                  className="bg-background/50 border-white/10 rounded-xl placeholder:text-white/20 focus-visible:ring-primary/30"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground ml-1">Your Role</label>
                <Input
                  value={myRole}
                  onChange={(e) => setMyRole(e.target.value)}
                  placeholder="e.g., Dom"
                  className="bg-background/50 border-white/10 rounded-xl placeholder:text-white/20 focus-visible:ring-primary/30"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground ml-1">Partner Name</label>
                <Input
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="Name"
                  className="bg-background/50 border-white/10 rounded-xl placeholder:text-white/20 focus-visible:ring-blue-500/30"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground ml-1">Partner Role</label>
                <Input
                  value={partnerRole}
                  onChange={(e) => setPartnerRole(e.target.value)}
                  placeholder="e.g., sub"
                  className="bg-background/50 border-white/10 rounded-xl placeholder:text-white/20 focus-visible:ring-blue-500/30"
                />
              </div>
            </div>
            
            <button
              onClick={() => setIsIdentityModalOpen(true)}
              className="w-full mt-4 p-3 bg-[#36454F] hover:bg-[#274D60] text-white rounded-lg font-bold transition-colors text-sm"
            >
              How Do We Identify?
            </button>
          </motion.div>

          <div className="hidden lg:grid grid-cols-2 gap-8 mt-10">
            <div className="space-y-4">
              <div className="bg-card/80 backdrop-blur-md p-4 rounded-2xl border border-primary/20 text-center shadow-lg">
                <h3 className="font-display text-xl font-bold tracking-wide text-primary/90">{myName || 'My Map'}</h3>
              </div>
              <div className="bg-card/80 backdrop-blur-md rounded-2xl p-5 border border-primary/20 shadow-xl">
                {visibleCategories.map((category) => (
                  <PreferenceCategory
                    key={category.id}
                    category={category}
                    preferences={myPreferences}
                    onUpdate={updateMyPreference}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card/80 backdrop-blur-md p-4 rounded-2xl border border-blue-500/20 text-center shadow-lg">
                <h3 className="font-display text-xl font-bold tracking-wide text-blue-400">{partnerName || 'Partner Map'}</h3>
              </div>
              <div className="bg-card/80 backdrop-blur-md rounded-2xl p-5 border border-blue-500/20 shadow-xl">
                {visibleCategories.map((category) => (
                  <PreferenceCategory
                    key={category.id}
                    category={category}
                    preferences={partnerPreferences}
                    onUpdate={updatePartnerPreference}
                  />
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className="lg:hidden mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-card/80 backdrop-blur-md rounded-2xl p-1 border border-white/10 shadow-lg">
                <TabsTrigger 
                  value="me" 
                  className="font-display rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary-foreground data-[state=active]:border-primary/30 border border-transparent transition-all"
                >
                  {myName || 'Me'}
                </TabsTrigger>
                <TabsTrigger 
                  value="partner" 
                  className="font-display rounded-xl data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-100 data-[state=active]:border-blue-500/30 border border-transparent transition-all"
                >
                  {partnerName || 'Partner'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="me" className="mt-6">
                <div className="bg-card/80 backdrop-blur-md rounded-2xl p-4 border border-primary/20 shadow-xl">
                  {visibleCategories.map((category) => (
                    <PreferenceCategory
                      key={category.id}
                      category={category}
                      preferences={myPreferences}
                      onUpdate={updateMyPreference}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="partner" className="mt-6">
                <div className="bg-card/80 backdrop-blur-md rounded-2xl p-4 border border-blue-500/20 shadow-xl">
                  {visibleCategories.map((category) => (
                    <PreferenceCategory
                      key={category.id}
                      category={category}
                      preferences={partnerPreferences}
                      onUpdate={updatePartnerPreference}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          <div className="max-w-2xl mx-auto w-full mt-12">
            <AnimatePresence>
              {bothHavePreferences && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <MatchScoreDisplay
                    result={matchResult}
                    myName={myName}
                    partnerName={partnerName}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {!bothHavePreferences && (hasAnyPreferencesSet(myPreferences) || hasAnyPreferencesSet(partnerPreferences)) && (
              <motion.div
                className="bg-card/50 border border-primary/20 rounded-2xl p-6 text-center mt-8 backdrop-blur-md shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Heart className="w-6 h-6 text-primary mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium text-foreground">
                  {hasAnyPreferencesSet(myPreferences) 
                    ? `Almost there, share with your partner to see your score.`
                    : `Set your preferences to see your Match Score.`}
                </p>
              </motion.div>
            )}

            <motion.div
              className="bg-card/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-5 mt-8 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-center space-y-1">
                <h3 className="font-display text-base font-semibold tracking-wide">Share Your Map</h3>
                <p className="text-[10px] text-muted-foreground">Links are stored anonymously.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <ShareButtons getShareableUrl={getShareableUrl} />
                <Button onClick={handleCopyProfile} variant="secondary" className="w-full sm:w-auto bg-[#1a1a20] hover:bg-[#9ca3af]/20 text-[#9ca3af] transition-colors rounded-xl border border-[#9ca3af]/30 h-10 text-sm px-6">
                  <Copy className="w-4 h-4 mr-2" /> 
                  Copy Profile to Text
                </Button>
              </div>
              
              <div className="pt-5 border-t border-white/5 flex justify-center">
                <Button onClick={handleReset} variant="secondary" size="sm" className="bg-[#1a1a20] hover:bg-[hsl(0,75%,55%)]/20 text-[hsl(0,75%,55%)] text-xs transition-colors rounded-xl border border-[hsl(0,75%,55%)]/30 px-6">
                  <RotateCcw className="w-3 h-3 mr-2" /> Reset All Data
                </Button>
              </div>
            </motion.div>
          </div>
        </main>

        <footer className="mt-16 space-y-12 max-w-2xl mx-auto">
          <div className="bg-card/80 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl">
            <h5 className="text-[14px] font-bold text-center uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Consent and Safety Principles
            </h5>
            <p className="text-xs text-center text-muted-foreground mb-6">
              When diving into BDSM, always keep these in mind:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-white/5">
                <span className="font-bold text-primary text-sm min-w-[50px]">SSC</span>
                <span className="text-xs text-muted-foreground italic border-l border-white/10 pl-3">Safe, Sane, and Consensual</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-white/5">
                <span className="font-bold text-primary text-sm min-w-[50px]">RACK</span>
                <span className="text-xs text-muted-foreground italic border-l border-white/10 pl-3">Risk Aware Consensual Kink</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-white/5">
                <span className="font-bold text-primary text-sm min-w-[50px]">PRICK</span>
                <span className="text-xs text-muted-foreground italic border-l border-white/10 pl-3">Personal Responsibility Informed Kink</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-white/5">
                <span className="font-bold text-primary text-sm min-w-[50px]">FRIES</span>
                <span className="text-xs text-muted-foreground italic border-l border-white/10 pl-3 leading-tight">Freely given, Reversible, Informed, Enthusiastic, Specific</span>
              </div>
            </div>

            <p className="text-xs italic mt-6 pt-4 border-t border-white/5 text-center text-primary/80 font-medium tracking-wide">
              Be safe, have fun, and respect boundaries.
            </p>
          </div>

          <div className="px-2">
            <DisclaimerSection />
          </div>

          <div className="text-center space-y-6 pb-6 mt-12">
            <div className="flex justify-center gap-3">
              <a href="mailto:thekinkymap@gmail.com" className="text-[11px] bg-card/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/10 flex items-center transition-all shadow-md">
                <Mail className="w-3 h-3 mr-2" /> Feedback
              </a>
              <a href="https://fetlife.com/TheKinkyMap" target="_blank" rel="noreferrer" className="text-[11px] bg-card/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/10 flex items-center transition-all shadow-md">
                <ExternalLink className="w-3 h-3 mr-2" /> FetLife
              </a>
            </div>

            <div className="opacity-50 space-y-2 mt-4">
              <p className="text-[11px] tracking-wide font-medium mb-2">
                Created with care and love for consensual and safe play.
              </p>                   
              <p className="text-[12px] uppercase tracking-widest font-semibold">
                Made in <span className="text-primary">Antarctica</span>
              </p>               
              <p className="text-[10px] uppercase tracking-widest font-semibold">
                © 2026 The <span className="text-primary">Kinky</span> Map,v2.1.0
              </p>
            </div>
          </div>
        </footer>
        
        <IdentityModal
          isOpen={isIdentityModalOpen}
          onClose={() => setIsIdentityModalOpen(false)}
          meIdentity={meIdentity}
          setMeIdentity={setMeIdentity}
          partnerIdentity={partnerIdentity}
          setPartnerIdentity={setPartnerIdentity}
          myName={myName}
          partnerName={partnerName}
        />
        
      </div>
    </div>
  );
};

export default Index;
