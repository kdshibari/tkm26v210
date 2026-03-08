export const pronounsList = [
  "He/Him", "She/Her", "They/Them", "Ze/Zir", "Any", "Ask Me"
];
export const genderList = [
  "Woman", "Man", "Nonbinary", "Genderfluid", "Agender", "Bigender", "Questioning", "Ask Me"
];
export const orientationList = [
  "Heterosexual", "Homosexual", "Bisexual", "Pansexual", "Asexual", "Demisexual", "Queer", "Ask Me"
];
export const relationshipList = [
  "Monogamous", "Polyamorous", "Open", "Ethical Nonmonogamy", "Relationship Anarchy", "Ask Me"
];

export interface IdentityState {
  pronouns: string;
  gender: string;
  orientation: string;
  relationship: string;
}

export const defaultIdentity: IdentityState = {
  pronouns: "",
  gender: "",
  orientation: "",
  relationship: ""
};
