
import { pronounsList, genderList, orientationList, relationshipList, IdentityState } from './IdentityData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  meIdentity: IdentityState;
  setMeIdentity: (data: IdentityState) => void;
  partnerIdentity: IdentityState;
  setPartnerIdentity: (data: IdentityState) => void;
}

export const IdentityModal = ({ isOpen, onClose, meIdentity, setMeIdentity, partnerIdentity, setPartnerIdentity }: Props) => {
  if (!isOpen) return null;

  const renderSelect = (label: string, value: string, list: string[], onChange: (val: string) => void) => (
    <div className="mb-4">
      <label className="block text-xs mb-1 text-[#6BA3BE]">{label}</label>
      <select 
        className="w-full p-3 rounded bg-[#274D60] text-white border border-[#0A7075] focus:border-[#0C969C] outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select...</option>
        {list.map(item => <option key={item} value={item}>{item}</option>)}
      </select>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#36454F]/95 p-4 overflow-y-auto">
      <div className="bg-[#032F30] border border-[#0A7075] w-full max-w-4xl rounded-xl p-6 shadow-2xl my-8">
        <h2 className="text-2xl font-bold text-[#6BA3BE] mb-6 text-center">How Do We Identify?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#274D60]/30 p-4 rounded-lg border border-[#0A7075]">
            <h3 className="text-lg font-bold text-white mb-4">Me</h3>
            {renderSelect("Pronouns", meIdentity.pronouns, pronounsList, (val) => setMeIdentity({ ...meIdentity, pronouns: val }))}
            {renderSelect("Gender", meIdentity.gender, genderList, (val) => setMeIdentity({ ...meIdentity, gender: val }))}
            {renderSelect("Sexual Orientation", meIdentity.orientation, orientationList, (val) => setMeIdentity({ ...meIdentity, orientation: val }))}
            {renderSelect("Dating Preferences", meIdentity.relationship, relationshipList, (val) => setMeIdentity({ ...meIdentity, relationship: val }))}
          </div>

          <div className="bg-[#274D60]/30 p-4 rounded-lg border border-[#0A7075]">
            <h3 className="text-lg font-bold text-white mb-4">Partner</h3>
            {renderSelect("Pronouns", partnerIdentity.pronouns, pronounsList, (val) => setPartnerIdentity({ ...partnerIdentity, pronouns: val }))}
            {renderSelect("Gender", partnerIdentity.gender, genderList, (val) => setPartnerIdentity({ ...partnerIdentity, gender: val }))}
            {renderSelect("Sexual Orientation", partnerIdentity.orientation, orientationList, (val) => setPartnerIdentity({ ...partnerIdentity, orientation: val }))}
            {renderSelect("Dating Preferences", partnerIdentity.relationship, relationshipList, (val) => setPartnerIdentity({ ...partnerIdentity, relationship: val }))}
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-8 p-4 bg-[#0C969C] hover:bg-[#0A7075] text-white rounded-lg font-bold transition-colors"
        >
          Save Identity Profile
        </button>
      </div>
    </div>
  );
};
