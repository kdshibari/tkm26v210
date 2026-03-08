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
  const renderSelect = (label: string, value: string, list: string[], onChange: (val: string) => void) => (
    <div className="mb-3 sm:mb-4">
      <label className="block text-xs mb-1 text-[#6BA3BE] font-semibold">{label}</label>
      <select 
        className="w-full p-2.5 sm:p-3 rounded bg-[#274D60] text-white border border-[#0A7075] focus:border-[#0C969C] outline-none text-sm transition-colors"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select...</option>
        {list.map(item => <option key={item} value={item}>{item}</option>)}
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#36454F]/95 p-4"
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
            className="bg-[#032F30] border border-[#0A7075] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl flex flex-col relative"
          >
            
            <div className="sticky top-0 z-10 bg-[#032F30] px-4 sm:px-6 py-4 border-b border-[#0A7075] flex justify-between items-center rounded-t-xl">
              <h2 className="text-xl sm:text-2xl font-bold text-[#6BA3BE]">How Do We Identify?</h2>
              <button 
                onClick={onClose} 
                className="text-[#6BA3BE] hover:text-white text-3xl leading-none px-2 transition-colors duration-300"
              >
                &times;
              </button>
            </div>
            
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              <div className="bg-[#274D60]/30 p-4 rounded-lg border border-[#0A7075]">
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 border-b border-[#0A7075] pb-2">
                  {myName || 'Me'}
                </h3>
                {renderSelect("Pronouns", meIdentity.pronouns, pronounsList, (val) => setMeIdentity({ ...meIdentity, pronouns: val }))}
                {renderSelect("Gender", meIdentity.gender, genderList, (val) => setMeIdentity({ ...meIdentity, gender: val }))}
                {renderSelect("Sexual Orientation", meIdentity.orientation, orientationList, (val) => setMeIdentity({ ...meIdentity, orientation: val }))}
                {renderSelect("Dating Preferences", meIdentity.relationship, relationshipList, (val) => setMeIdentity({ ...meIdentity, relationship: val }))}
              </div>

              <div className="bg-[#274D60]/30 p-4 rounded-lg border border-[#0A7075]">
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 border-b border-[#0A7075] pb-2">
                  {partnerName || 'Partner'}
                </h3>
                {renderSelect("Pronouns", partnerIdentity.pronouns, pronounsList, (val) => setPartnerIdentity({ ...partnerIdentity, pronouns: val }))}
                {renderSelect("Gender", partnerIdentity.gender, genderList, (val) => setPartnerIdentity({ ...partnerIdentity, gender: val }))}
                {renderSelect("Sexual Orientation", partnerIdentity.orientation, orientationList, (val) => setPartnerIdentity({ ...partnerIdentity, orientation: val }))}
                {renderSelect("Dating Preferences", partnerIdentity.relationship, relationshipList, (val) => setPartnerIdentity({ ...partnerIdentity, relationship: val }))}
              </div>
            </div>

            <div className="sticky bottom-0 z-10 bg-[#032F30] p-4 sm:p-6 border-t border-[#0A7075] rounded-b-xl">
              <button 
                onClick={onClose}
                className="w-full p-3 sm:p-4 bg-[#0C969C] hover:bg-[#0A7075] text-white rounded-lg font-bold transition-colors duration-300 text-sm sm:text-base"
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
