export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface GameEvent {
  text: string;
  type: 'death' | 'good' | 'bad' | 'neutral';
}

export const DEATH_MESSAGES: string[] = [
  "has died of unencrypted data exposure",
  "was lost to a ransomware attack while reviewing the SSP",
  "perished from acute SPRS score anxiety",
  "succumbed to a fatal case of scope creep",
  "was carried away by rogue auditors",
  "drowned in a sea of POA&M items",
  "expired from exhaustion after the 47th control review",
  "was fatally wounded by a penetration test finding",
  "died of dysentery... and also didn't encrypt their CUI",
  "was lost crossing the River of Legacy Systems",
  "perished when their MFA token battery died",
  "succumbed to policy documentation poisoning",
  "was struck down by an unexpected C3PAO visit",
  "died after realizing they scoped their entire network",
  "was consumed by the void of missing evidence artifacts",
  "perished explaining FCI vs CUI to leadership... again",
  "died of shock when they saw the consultant's invoice",
  "was lost in the NIST 800-171 cross-references",
  "expired waiting for the DIBCAC callback",
  "succumbed to a critical vulnerability in their argument",
];

export const RANDOM_EVENTS: GameEvent[] = [
  { text: "Your SIEM license expired. Alert fatigue claims a victim.", type: "death" },
  { text: "You found an abandoned System Security Plan template on the trail! Team morale increases.", type: "good" },
  { text: "A wild auditor appears! They just want to chat about controls. False alarm.", type: "neutral" },
  { text: "Your vulnerability scanner found 10,000 new findings overnight. Morale drops.", type: "bad" },
  { text: "Good news! Your SPRS score went up by 3 points!", type: "good" },
  { text: "A consultant wagon passes by and drops some free templates!", type: "good" },
  { text: "The intern accidentally emailed CUI to their personal Gmail.", type: "death" },
  { text: "You successfully convinced leadership to fund the project! Morale soars!", type: "good" },
  { text: "Your C3PAO assessment got rescheduled... for the 4th time.", type: "neutral" },
  { text: "Heavy rain has flooded your on-prem data center. Morale drops.", type: "bad" },
  { text: "You discovered shadow IT. Everywhere. So much shadow IT.", type: "bad" },
  { text: "A friendly MSP offers to manage your EDR. Seems legit.", type: "neutral" },
  { text: "Your POA&M milestones are all GREEN! Is this real life?", type: "good" },
  { text: "Supply chain attack! Your monitoring tool was compromised.", type: "death" },
  { text: "The DoD released new guidance. Everything you knew is wrong now.", type: "bad" },
  { text: "You found a working printer. It's a miracle!", type: "good" },
  { text: "Your SSP backup was actually current. Unbelievable!", type: "good" },
  { text: "A team member accidentally deleted the evidence folder.", type: "bad" },
  { text: "The firewall rules actually make sense! Someone documented them!", type: "good" },
  { text: "Ransomware gang sends a LinkedIn connection request to your CISO.", type: "neutral" },
];

export const CMMC_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What does CUI stand for?",
    options: [
      "A) Controlled Unclassified Information",
      "B) Cybersecurity Unified Infrastructure",
      "C) Compliance Under Investigation",
      "D) Computers Under Inspection"
    ],
    answer: "A",
    explanation: "CUI = Controlled Unclassified Information. The whole reason we're on this trail!"
  },
  {
    id: 2,
    question: "How many practices/controls are in CMMC Level 2?",
    options: [
      "A) 17",
      "B) 110",
      "C) 172",
      "D) 42 (the answer to everything)"
    ],
    answer: "B",
    explanation: "110 practices from NIST SP 800-171. You'll know them by heart... or die trying."
  },
  {
    id: 3,
    question: "What is an SSP?",
    options: [
      "A) Super Secret Protocol",
      "B) System Security Plan",
      "C) SPRS Score Predictor",
      "D) Security Specialist Party"
    ],
    answer: "B",
    explanation: "System Security Plan - the document that will consume your next 6 months."
  },
  {
    id: 4,
    question: "What is the minimum SPRS score possible?",
    options: [
      "A) 0",
      "B) -203",
      "C) -100",
      "D) Your self-esteem after an audit"
    ],
    answer: "B",
    explanation: "-203 is the minimum. If you're there, may your documentation be thorough."
  },
  {
    id: 5,
    question: "What does FCI stand for?",
    options: [
      "A) Federal Contract Information",
      "B) Firewall Configuration Index",
      "C) First Compliance Incident",
      "D) Finally Certified, Incredible"
    ],
    answer: "A",
    explanation: "Federal Contract Information - the less scary cousin of CUI."
  },
  {
    id: 6,
    question: "What NIST publication does CMMC Level 2 align with?",
    options: [
      "A) NIST 800-53",
      "B) NIST 800-171",
      "C) NIST 800-HELP-ME",
      "D) NIST 800-WHY"
    ],
    answer: "B",
    explanation: "NIST SP 800-171. Your new bedtime reading material."
  },
  {
    id: 7,
    question: "What is a POA&M?",
    options: [
      "A) Plan of Action & Milestones",
      "B) Policy on Audits & Management",
      "C) Proof of Acceptable Monitoring",
      "D) Pain, Anguish & Misery"
    ],
    answer: "A",
    explanation: "Plan of Action & Milestones. (D is also technically correct in practice.)"
  },
  {
    id: 8,
    question: "Who performs CMMC Level 2 assessments?",
    options: [
      "A) The DoD directly",
      "B) C3PAO (Third-Party Assessment Org)",
      "C) Your IT guy who 'knows security'",
      "D) A ouija board"
    ],
    answer: "B",
    explanation: "C3PAO - the people who will make you question every life decision."
  },
  {
    id: 9,
    question: "What is 'scoping' in CMMC?",
    options: [
      "A) Looking through a telescope at servers",
      "B) Defining systems that process/store CUI",
      "C) Checking if anyone is watching",
      "D) Running away from auditors"
    ],
    answer: "B",
    explanation: "Proper scoping can save you from certifying your entire company."
  },
  {
    id: 10,
    question: "What is the purpose of FIPS 140-2 validated encryption?",
    options: [
      "A) To make data extra crispy",
      "B) Ensure crypto modules meet standards",
      "C) To confuse developers",
      "D) Justify expensive hardware purchases"
    ],
    answer: "B",
    explanation: "FIPS 140-2 validates your encryption isn't just 'password123' with extra steps."
  },
  {
    id: 11,
    question: "What is an enclave in CMMC context?",
    options: [
      "A) A secret government bunker",
      "B) Segmented network boundary with CUI",
      "C) Where compliance officers cry",
      "D) A fancy word for 'server room'"
    ],
    answer: "B",
    explanation: "An enclave is a properly segmented environment. (C is also valid.)"
  },
  {
    id: 12,
    question: "How often should security awareness training occur?",
    options: [
      "A) Never, ignorance is bliss",
      "B) Once per decade",
      "C) Annually at minimum",
      "D) Every phishing click (so, daily)"
    ],
    answer: "C",
    explanation: "Annual training minimum. D would mean continuous training for most orgs."
  },
  {
    id: 13,
    question: "What does MFA stand for?",
    options: [
      "A) Multi-Factor Authentication",
      "B) Mandatory Firewall Application",
      "C) Most Frustrating Approach",
      "D) My Favorite Acronym"
    ],
    answer: "A",
    explanation: "Multi-Factor Authentication - because passwords alone aren't enough."
  },
  {
    id: 14,
    question: "What is the CMMC Level 1 requirement for CUI?",
    options: [
      "A) Full NIST 800-171 compliance",
      "B) Level 1 is for FCI only, not CUI",
      "C) Just install antivirus",
      "D) Post a 'No Hackers' sign"
    ],
    answer: "B",
    explanation: "Level 1 is FCI only (17 practices). CUI requires Level 2 minimum!"
  },
  {
    id: 15,
    question: "What is a 'NOT MET' finding?",
    options: [
      "A) An auditor you haven't met",
      "B) Control that fails requirements",
      "C) A meeting that was cancelled",
      "D) The last thing you want to hear"
    ],
    answer: "B",
    explanation: "A NOT MET means you failed a control. B and D are both correct."
  },
  {
    id: 16,
    question: "What system holds your SPRS score?",
    options: [
      "A) The Cloud",
      "B) A blockchain somewhere",
      "C) Supplier Performance Risk System",
      "D) A filing cabinet in the Pentagon"
    ],
    answer: "C",
    explanation: "SPRS - Supplier Performance Risk System. Your score lives there."
  },
  {
    id: 17,
    question: "What is 'evidence' in a CMMC assessment?",
    options: [
      "A) Screenshots of you doing work",
      "B) Docs proving control implementation",
      "C) Witness testimonies",
      "D) All of the above, honestly"
    ],
    answer: "B",
    explanation: "Evidence = proof your controls work. Screenshots, policies, logs - all of it."
  },
  {
    id: 18,
    question: "How long must you retain security logs per 800-171?",
    options: [
      "A) 30 days",
      "B) 90 days minimum",
      "C) Until heat death of universe",
      "D) Logs? What logs?"
    ],
    answer: "B",
    explanation: "90 days minimum retention. Your SIEM storage costs just increased."
  },
  {
    id: 19,
    question: "What does 800-171A provide?",
    options: [
      "A) Assessment procedures for controls",
      "B) A way for auditors to feel important",
      "C) More acronyms",
      "D) Job security for consultants"
    ],
    answer: "A",
    explanation: "800-171A tells you HOW you'll be assessed. Know it. Fear it."
  },
  {
    id: 20,
    question: "What should you do if you discover a CUI breach?",
    options: [
      "A) Report to DoD within 72 hours",
      "B) Delete evidence and hope",
      "C) Blame the intern",
      "D) Update LinkedIn to 'Open to Work'"
    ],
    answer: "A",
    explanation: "Report to DoD within 72 hours via dibnet.dod.mil. (D is the mood though.)"
  },
];

export const DEFAULT_PARTY = [
  "CISO McSecurityface",
  "Compliance Carl",
  "Policy Patricia",
  "Audit Andy",
  "The Intern (unnamed)"
];
