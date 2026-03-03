export interface PreferenceItem {
  key: string;
  label: string;
}

export interface PreferenceCategory {
  id: string;
  name: string;
  items: PreferenceItem[];
}

// FRESH SCALE: -2 to +2
export const PREFERENCE_LEVELS = [
  { value: -2, label: "Hard Limit", color: "hsl(0, 75%, 55%)" },    // Red
  { value: -1, label: "Soft Limit", color: "hsl(28, 100%, 65%)" },  // Orange
  { value: 0, label: "Neutral", color: "hsl(0, 0%, 50%)" },         // Grey
  { value: 1, label: "Curious", color: "hsl(140, 60%, 65%)" },      // Light Green
  { value: 2, label: "Yes", color: "hsl(160, 70%, 45%)" },          // Green
] as const;

// Ensure type allows negative numbers
export type PreferenceValue = -2 | -1 | 0 | 1 | 2;

export interface Preferences {
  [key: string]: PreferenceValue;
}

// ... (Your existing PREFERENCE_CATEGORIES array goes here. 
// I am omitting the long list to save space, but DO NOT DELETE IT from your file.)
export const PREFERENCE_CATEGORIES: PreferenceCategory[] = [
  {
    id: "oral-vaginal-anal",
    name: "Oral Vaginal Anal",
    items: [
      { key: "kissing", label: "Kissing" },
      { key: "masturbation", label: "Masturbation" },
      { key: "oral-received", label: "Oral (Received)" },
      { key: "oral-no-ejaculation", label: "Oral (No ejaculation)" },
      { key: "oral-with-ejaculation", label: "Oral (With ejaculation)" },
      { key: "deepthroating", label: "Deepthroating" },
      { key: "face-fucking", label: "Face Fucking" },
      { key: "vaginal-condom", label: "Vaginal (Condom)" },
      { key: "vaginal-no-condom", label: "Vaginal (No Condom)" },
      { key: "anal-condom", label: "Anal (Condom)" },
      { key: "anal-no-condom", label: "Anal (No Condom)" },
      { key: "rimming-receiving", label: "Rimming (Receiving)" },
      { key: "rimming-giving", label: "Rimming (Giving)" },
      { key: "vaginal-fingering", label: "Vaginal Fingering" },
      { key: "anal-fingering", label: "Anal Fingering" },
      { key: "vaginal-fisting", label: "Vaginal Fisting" },
      { key: "anal-fisting", label: "Anal Fisting" },
    ],
  },
  {
    id: "positions",
    name: "Positions",
    items: [
      { key: "missionary", label: "Missionary" },
      { key: "doggy", label: "Doggy" },
      { key: "cowgirl", label: "Cowgirl" },
      { key: "reverse-cowgirl", label: "Reversed Cowgirl" },
      { key: "spooning", label: "Spooning" },
      { key: "69", label: "69" },
      { key: "amazon-position", label: "Amazon Position" },
      { key: "face-sitting", label: "Face Sitting" },
      { key: "prone-bone", label: "Prone Bone" },
      { key: "kamasutra-position", label: "Kamasutra Position" },
      { key: "tantric-position", label: "Tantric Positions" },
    ],
  },
  {
    id: "toys",
    name: "Toys",
    items: [
      { key: "dildo", label: "Dildo" },
      { key: "vibrator", label: "Vibrator" },
      { key: "remote-vibrator", label: "Remote Vibrator" },
      { key: "anal-plug", label: "Anal Plug" },
      { key: "strap-on", label: "Strap on" },
      { key: "anal-hook", label: "Anal Hook" },
      { key: "ben-wa-balls", label: "Ben Wa Balls" },
      { key: "inflatables", label: "Inflatables" },
      { key: "fuck-machine", label: "Fuck Machine" },
      { key: "milking-machine", label: "Milking Machine" },
      { key: "cock-ring", label: "Cock Ring" },
    ],
  },
  {
    id: "orgasm-control",
    name: "Orgasm Control",
    items: [
      { key: "edging", label: "Edging" },
      { key: "chastity", label: "Chastity" },
      { key: "orgasm-denial", label: "Orgasm Denial" },
      { key: "forced-orgasm", label: "Forced Orgasm" },
      { key: "prostate-milking", label: "Prostate Milking" },
      { key: "post-orgasm-torture", label: "Post Orgasm Torture" },
      { key: "vagina-pump", label: "Vagina Pump" },
      { key: "cock-pump", label: "Cock Pump" },
    ],
  },
  {
    id: "worship",
    name: "Worship",
    items: [
      { key: "body-worship", label: "Body" },
      { key: "feet-worship", label: "Feet" },
      { key: "hands-worship", label: "Hands" },
      { key: "genitals-worship", label: "Genitals" },
      { key: "armpits-worship", label: "Armpits" },
      { key: "boots-worship", label: "Boots" },
      { key: "high-heels-worship", label: "High Heels" },
      { key: "cock-warming", label: "Cock Warming" },
    ],
  },
  {
    id: "role-playing",
    name: "Role Playing",
    items: [
      { key: "age-play", label: "Age Play" },
      { key: "master-slave", label: "Master/slave" },
      { key: "caregiver-little", label: "Caregiver/little" },
      { key: "doctor-patient", label: "Doctor/Patient" },
      { key: "carer-adult-baby", label: "Carer/Adult Baby" },
      { key: "pet-play", label: "Pet Play" },
      { key: "cnc", label: "CNC" },
      { key: "kidnapping", label: "Kidnapping" },
      { key: "protocol", label: "Protocol" },
      { key: "public-play", label: "Public Play" },
      { key: "submission-to-others", label: "Submission to Others" },
    ],
  },
  {
    id: "psychological",
    name: "Psychological",
    items: [
      { key: "domination", label: "Domination" },
      { key: "humiliation", label: "Humiliation" },
      { key: "degradation", label: "Degradation" },
      { key: "hypnosis", label: "Hypnosis" },
      { key: "confusion", label: "Confusion" },
      { key: "fear-play", label: "Fear Play" },
      { key: "spitting", label: "Spitting" },
      { key: "forced-clothing", label: "Forced Clothing" },
      { key: "forced-haircut", label: "Forced Haircut" },
      { key: "genital-shaving", label: "Genital Shaving" },
      { key: "sissification", label: "Sissification" },
      { key: "aggressive-language", label: "Aggressive Language" },
      { key: "isolation", label: "Isolation" },
      { key: "forced-body-modification", label: "Forced Body Modification" },
    ],
  },
  {
    id: "nipples",
    name: "Nipples",
    items: [
      { key: "gentle-teasing", label: "Gentle Teasing" },
      { key: "biting", label: "Biting" },
      { key: "pinching", label: "Pinching" },
      { key: "torture", label: "Torture" },
      { key: "tweezer-clamps", label: "Tweezer Clamps" },
      { key: "japanese-clover", label: "Japanese Clover" },
      { key: "suction-cups", label: "Suction Cups" },
    ],
  },
  {
    id: "bondage",
    name: "Bondage",
    items: [
      { key: "handcuffs", label: "Handcuffs" },
      { key: "rope-bondage", label: "Rope Bondage" },
      { key: "leather-restraints", label: "Leather Restraints" },
      { key: "metal-restraints", label: "Metal Restraints" },
      { key: "long-term-bondage", label: "Long Term Bondage" },
      { key: "mummification", label: "Mummification" },
      { key: "sleepsack", label: "Sleepsack" },
      { key: "straightjacket", label: "Straightjacket" },
      { key: "predicament", label: "Predicament" },
      { key: "hair-tie", label: "Hair Tie" },
      { key: "hog-tie", label: "Hog Tie" },
      { key: "neck-tie", label: "Neck Tie" },
      { key: "spread-eagle", label: "Spread Eagle" },
      { key: "vacuum-bed", label: "Vacuum Bed" },
      { key: "mitts", label: "Mitts" },
      { key: "collar", label: "Collar" },
      { key: "suspension", label: "Suspension" },
    ],
  },
  {
    id: "gags",
    name: "Gags",
    items: [
      { key: "fabric-gag", label: "Fabric" },
      { key: "bite-gag", label: "Bite Gag" },
      { key: "ball-gag", label: "Ball Gag" },
      { key: "sock-stockings", label: "Sock / Stockings" },
      { key: "pecker-gag", label: "Pecker Gag" },
      { key: "inflatable-gag", label: "Inflatable" },
      { key: "o-ring-gag", label: "O-Ring" },
      { key: "dental-gag", label: "Dental Gag" },
      { key: "tape-gag", label: "Tape" },
      { key: "muzzle-gag", label: "Muzzle" },
      { key: "nose-hook", label: "Nose Hook" },
    ],
  },
  {
    id: "impact",
    name: "Impact",
    items: [
      { key: "bare-hand-spanking", label: "Bare Hand Spanking" },
      { key: "paddle", label: "Paddle" },
      { key: "slapping", label: "Slapping" },
      { key: "flogging", label: "Flogging" },
      { key: "riding-crop", label: "Riding Crop" },
      { key: "caning", label: "Caning" },
      { key: "whips", label: "Whips" },
      { key: "bastinado", label: "Bastinado" },
      { key: "no-warm-up", label: "No Warm Up" },
      { key: "gut-punching", label: "Gut Punching" },
      { key: "trampling", label: "Trampling" },
    ],
  },
  {
    id: "marks",
    name: "Marks",
    items: [
      { key: "no-marks", label: "No Marks" },
      { key: "lasting-few-hours", label: "Lasting Few Hours" },
      { key: "lasting-1-2-days", label: "Lasting 1-2 Days" },
      { key: "lasting-1-2-weeks", label: "Lasting 1-2 Weeks" },
      { key: "permanent-marks", label: "Permanent Marks" },
    ],
  },
  {
    id: "sensation-play",
    name: "Sensation Play",
    items: [
      { key: "pinwheel", label: "Pinwheel" },
      { key: "wax", label: "Wax" },
      { key: "ice", label: "Ice" },
      { key: "fire-play", label: "Fire Play" },
      { key: "biting-sensation", label: "Biting" },
      { key: "clothes-pegs-clamps", label: "Clothes Pegs / Clamps" },
      { key: "tickling", label: "Tickling" },
      { key: "clawing", label: "Clawing" },
    ],
  },
  {
    id: "genital-torture",
    name: "Genital Torture",
    items: [
      { key: "testicles", label: "Testicles" },
      { key: "penis", label: "Penis" },
      { key: "pin-prick-parachute", label: "Pin Prick Parachute" },
      { key: "tiger-balm-genitals", label: "Tiger Balm on Genitals" },
      { key: "ball-stretching", label: "Ball Stretching" },
      { key: "ball-crunching", label: "Ball Crunching" },
      { key: "ball-slapping", label: "Ball Slapping" },
      { key: "genital-bondage", label: "Genital Bondage" },
      { key: "genital-spanking", label: "Genital Spanking" },
      { key: "genital-clamps", label: "Genital Clamps" },
    ],
  },
  {
    id: "sensory",
    name: "Sensory",
    items: [
      { key: "blindfold", label: "Blindfold" },
      { key: "hood", label: "Hood" },
      { key: "ear-plugs-muffler", label: "Ear Plugs / Muffler" },
    ],
  },
  {
    id: "electro",
    name: "Electro",
    items: [
      { key: "muscles", label: "Muscles" },
      { key: "vagina", label: "Vagina" },
      { key: "penis-electro", label: "Penis" },
      { key: "balls", label: "Balls" },
      { key: "anal-electro", label: "Anal" },
      { key: "violet-wand", label: "Violet Wand" },
      { key: "shock-collar", label: "Shock Collar" },
      { key: "taser", label: "Taser" },
    ],
  },
  {
    id: "medical-play",
    name: "Medical Play",
    items: [
      { key: "sounding", label: "Sounding" },
      { key: "needle-play", label: "Needle Play" },
      { key: "piercing", label: "Piercing" },
      { key: "rectal-examination", label: "Rectal Examination" },
      { key: "urological-examination", label: "Urological Examination" },
      { key: "enemas", label: "Enemas" },
      { key: "suppositories", label: "Suppositories" },
      { key: "prostate-massage", label: "Prostate Massage" },
      { key: "orthopaedic-cast", label: "Orthopaedic Cast" },
      { key: "speculum", label: "Speculum" },
      { key: "blood-play", label: "Blood Play" },
    ],
  },
  {
    id: "golden-shower",
    name: "Golden Shower",
    items: [
      { key: "on-body", label: "On Body" },
      { key: "on-face", label: "On Face" },
      { key: "on-clothes", label: "On Clothes" },
      { key: "drinking-owns", label: "Drinking Own's" },
      { key: "drinking-elses", label: "Drinking Else's" },
      { key: "funnel-gag", label: "Funnel Gag" },
      { key: "diapers", label: "Diapers" },
      { key: "toilet-control", label: "Toilet Control" },
      { key: "scat", label: "Scat" },
    ],
  },
  {
    id: "breath-play",
    name: "Breath Play",
    items: [
      { key: "hand-over-mouth", label: "Hand over Mouth" },
      { key: "re-breather", label: "Re-breather" },
      { key: "gas-mask", label: "Gas Mask" },
      { key: "swimming-cap", label: "Swimming Cap" },
      { key: "strangulation", label: "Strangulation" },
      { key: "hand-on-neck", label: "Hand on Neck" },
      { key: "forced-poppers", label: "Forced Poppers" },
    ],
  },
  {
    id: "grouping",
    name: "Grouping",
    items: [
      { key: "threesome", label: "Threesome" },
      { key: "orgy", label: "Orgy" },
      { key: "gangbang", label: "Gangbang" },
      { key: "swing", label: "Swing" },
      { key: "couple-play", label: "Couple Play" },
      { key: "group-role-play", label: "Group Role Play" },
    ],
  },
  {
    id: "materials",
    name: "Materials",
    items: [
      { key: "latex-rubber", label: "Latex / Rubber" },
      { key: "leather", label: "Leather" },
      { key: "pvc", label: "PVC" },
      { key: "nylon", label: "Nylon" },
      { key: "silk", label: "Silk" },
      { key: "lace", label: "Lace" },
    ],
  },
  {
    id: 'photography',
    name: 'Photography',
    items: [
      { key: 'photoBody', label: 'Body' },
      { key: 'photoFaceRecognizable', label: 'Face (Recognizable)' },
      { key: 'photoFaceUnrecognizable', label: 'Face (Unrecognizable)' },
      { key: 'photoGenitals', label: 'Genitals' },
      { key: 'photoNipples', label: 'Nipples' },
      { key: 'photoPublishableWithoutFace', label: 'Publishable Without Face' },
      { key: 'photoPublishableWithFaceUnrecognizable', label: 'Publishable With Face (Unrecognizable)' },
      { key: 'photoPublishableWithFaceRecognizable', label: 'Publishable With Face (Recognizable)' },
      { key: 'photoPublishableWithNipples', label: 'Publishable with Nipples' },
      { key: 'photoPublishableWithGenitals', label: 'Publishable with Genitals' },
      { key: 'photoSexualActs', label: 'Sexual Acts' },
      { key: 'photoPublishableSexualActs', label: 'Publishable Sexual Acts' }
    ],
  },
];
