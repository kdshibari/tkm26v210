import { Preferences, PREFERENCE_CATEGORIES } from '@/data/preferences';

console.log("MATCH SCORE LOGIC: Ignore Double Neutral and Mutual Veto"); 

export interface CategoryScore {
  categoryId: string;
  categoryName: string;
  score: number;
  matchingItems: number;
  totalItems: number;
  perfect: string[];
  curious: string[];
  conflicts: string[];
}

export interface MatchResult {
  overallScore: number;
  categoryScores: CategoryScore[];
  perfectMatches: string[];
  curiousMatches: string[];
  conflicts: string[];
  totalItemsWithInterest: number;
}

const getPoints = (v: number): number => {
  return v + 2;
};

const isHardLimit = (v: number) => v === -2;
const isLimit = (v: number) => v < 0; 
const isInterest = (v: number) => v > 0; 

export const calculateMatchScore = (
  myPrefs: Preferences,
  partnerPrefs: Preferences
): MatchResult => {
  const categoryScores: CategoryScore[] = [];
  
  const allPerfect: string[] = [];
  const allCurious: string[] = [];
  const allConflicts: string[] = [];
  
  let totalPoints = 0;
  let totalPossiblePoints = 0;
  let totalItemsWithInterest = 0;

  PREFERENCE_CATEGORIES.forEach(category => {
    
    // If either person has completely hard-limited this category, it skips completely
    const allMeHard = category.items.every(item => myPrefs[item.key] === -2);
    const allPartnerHard = category.items.every(item => partnerPrefs[item.key] === -2);

    if (allMeHard || allPartnerHard) {
      return; 
    }

    let categoryPoints = 0;
    let categoryPossible = 0;
    let matchingItems = 0;
    let hasActiveInput = false; // Tracks if anyone selected Soft, Moderate, or Yes
    
    const catPerfect: string[] = [];
    const catCurious: string[] = [];
    const catConflicts: string[] = [];

    category.items.forEach(item => {
      const myValue = myPrefs[item.key] ?? 0;
      const partnerValue = partnerPrefs[item.key] ?? 0;

      // Check if either person has moved the slider to Soft (-1), Moderate (1), or Yes (2)
      if ([-1, 1, 2].includes(myValue) || [-1, 1, 2].includes(partnerValue)) {
        hasActiveInput = true;
      }

      if ((myValue === 0 && partnerValue === 0) || (myValue === -2 && partnerValue === -2)) {
        return;
      }

      const hasHardLimit = isHardLimit(myValue) || isHardLimit(partnerValue);

      if ((isLimit(myValue) && isInterest(partnerValue)) || 
          (isLimit(partnerValue) && isInterest(myValue))) {
        catConflicts.push(item.label);
        allConflicts.push(item.label);
      }

      if (hasHardLimit) {
        categoryPossible += 4; 
      } 
      else {
        const myPoints = getPoints(myValue);
        const partnerPoints = getPoints(partnerValue);
        
        const itemAvg = (myPoints + partnerPoints) / 2;
        
        categoryPoints += itemAvg;
        categoryPossible += 4; 

        if (isInterest(myValue) && isInterest(partnerValue)) {
           matchingItems++;
           totalItemsWithInterest++;
        }

        if (myValue === 2 && partnerValue === 2) {
          catPerfect.push(item.label);
          allPerfect.push(item.label);
        } else if (isInterest(myValue) && isInterest(partnerValue)) {
          catCurious.push(item.label);
          allCurious.push(item.label);
        }
      }
    });

    // Only push to the breakdown UI array if there was active input
    if (hasActiveInput) {
      const score = categoryPossible > 0 ? (categoryPoints / categoryPossible) * 100 : 0;
      
      categoryScores.push({
        categoryId: category.id,
        categoryName: category.name,
        score: Math.round(score),
        matchingItems,
        totalItems: category.items.length,
        perfect: catPerfect,
        curious: catCurious,
        conflicts: catConflicts,
      });
    }

    // Still add the math correctly to the overall score regardless of UI visibility
    totalPoints += categoryPoints;
    totalPossiblePoints += categoryPossible;
  });

  const overallScore = totalPossiblePoints > 0 
    ? Math.round((totalPoints / totalPossiblePoints) * 100)
    : 0;

  return {
    overallScore,
    categoryScores,
    perfectMatches: allPerfect,
    curiousMatches: allCurious,
    conflicts: allConflicts,
    totalItemsWithInterest,
  };
};

export const getScoreLabel = (score: number): string => {
  if (score >= 90) return "Amazing!";
  if (score >= 75) return "Great Compatibility";
  if (score >= 60) return "Good Connection";
  if (score >= 45) return "Good Start";
  return "Needs Discussion";
};

export const getScoreColor = (score: number): string => {
  if (score >= 90) return "hsl(280, 70%, 50%)"; 
  if (score >= 75) return "hsl(160, 70%, 45%)"; 
  if (score >= 60) return "hsl(85, 70%, 45%)";  
  if (score >= 45) return "hsl(45, 100%, 55%)"; 
  return "hsl(0, 75%, 55%)"; 
};

export const hasAnyPreferencesSet = (prefs: Preferences): boolean => {
  return Object.values(prefs).some(v => v !== 0 && v !== undefined);
};
