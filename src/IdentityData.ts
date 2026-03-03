export const pronounsList = [
  "He/Him", "She/Her", "They/Them", "Ze/Zir", "Any", "Ask Me", "Prefer not to say"
];
export const genderList = [
  "Woman", "Man", "Nonbinary", "Genderfluid", "Agender", "Bigender", "Questioning", "Prefer not to say"
];
export const orientationList = [
  "Heterosexual", "Homosexual", "Bisexual", "Pansexual", "Asexual", "Demisexual", "Queer", "Prefer not to say"
];
export const relationshipList = [
  "Monogamous", "Polyamorous", "Open", "Ethical Nonmonogamy", "Relationship Anarchy", "Prefer not to say"
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
