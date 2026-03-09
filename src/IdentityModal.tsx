import { pronounsList, genderList, orientationList, relationshipList, IdentityState } from './IdentityData';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  meIdentity: IdentityState;
  setMeIdentity: (data: IdentityState) => void;
  partnerIdentity: IdentityState;
  setPartnerIdentity: (data: IdentityState) => void;
  myName: string;
  partnerName: string;
}

export const IdentityModal = ({ isOpen, onClose, meIdentity, setMeIdentity, partnerIdentity, setPartnerIdentity, myName, partnerName }: Props) => {
  const renderSelect = (label: string, value: string, list: string[], onChange: (val: string) => void, focusClass: string) => (
    <div className="mb-4">
      <label className="block text-[10px] uppercase tracking-wider text-muted-foreground ml-1 mb-1.5">{label}</label>
      <select 
        className={`w-full p-3 rounded-xl bg-background/50 text-foreground border border-white/10 outline-none text-sm transition-all focus:border-transparent focus:ring-1 ${focusClass} cursor-pointer appearance-none`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" className="bg-[#141417] text-muted-foreground">Select...</option>
        {list.map(item => <option key={item} value={item} className="bg-[#141417] text-foreground">{item}</option>)}
      </select>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.3 
            }}
            className="bg-card/95 border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col relative"
          >
            
            <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-md px-6 py-5 border-b border-white/10 flex justify-between items-center rounded-t-3xl">
              <h2 className="text-xl sm:text-2xl font-display font-bold tracking-wide text-foreground">How Do We Identify?</h2>
              <button 
                onClick={onClose} 
                className="text-muted-foreground hover:text-foreground text-3xl leading-none px-2 transition-colors duration-300"
              >
                &times;
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background/40 p-5 rounded-2xl border border-primary/20 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                <h3 className="font-display text-lg font-bold tracking-wide text-primary/90 mb-5 text-center">
                  {myName || 'My Identity'}
                </h3>
                {renderSelect("Pronouns", meIdentity.pronouns, pronounsList, (val) => setMeIdentity({ ...meIdentity, pronouns: val }), "focus:ring-primary/50")}
                {renderSelect("Gender", meIdentity.gender, genderList, (val) => setMeIdentity({ ...meIdentity, gender: val }), "focus:ring-primary/50")}
                {renderSelect("Sexual Orientation", meIdentity.orientation, orientationList, (val) => setMeIdentity({ ...meIdentity, orientation: val }), "focus:ring-primary/50")}
                {renderSelect("Dating Preferences", meIdentity.relationship, relationshipList, (val) => setMeIdentity({ ...meIdentity, relationship: val }), "focus:ring-primary/50")}
              </div>

              <div className="bg-background/40 p-5 rounded-2xl border border-blue-500/20 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                <h3 className="font-display text-lg font-bold tracking-wide text-blue-400 mb-5 text-center">
                  {partnerName || 'Partner Identity'}
                </h3>
                {renderSelect("Pronouns", partnerIdentity.pronouns, pronounsList, (val) => setPartnerIdentity({ ...partnerIdentity, pronouns: val }), "focus:ring-blue-500/50")}
                {renderSelect("Gender", partnerIdentity.gender, genderList, (val) => setPartnerIdentity({ ...partnerIdentity, gender: val }), "focus:ring-blue-500/50")}
                {renderSelect("Sexual Orientation", partnerIdentity.orientation, orientationList, (val) => setPartnerIdentity({ ...partnerIdentity, orientation: val }), "focus:ring-blue-500/50")}
                {renderSelect("Dating Preferences", partnerIdentity.relationship, relationshipList, (val) => setPartnerIdentity({ ...partnerIdentity, relationship: val }), "focus:ring-blue-500/50")}
              </div>
            </div>

            <div className="sticky bottom-0 z-10 bg-card/95 backdrop-blur-md p-6 border-t border-white/10 rounded-b-3xl flex justify-center">
              <button 
                onClick={onClose}
                className="w-full sm:w-2/3 p-4 bg-[#1a1a20] hover:bg-white/10 text-foreground border border-white/20 rounded-xl font-bold tracking-wide transition-all duration-300 shadow-lg text-sm sm:text-base"
              >
                Save Identity Profile
              </button>
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
