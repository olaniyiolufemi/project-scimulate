
import { AssessmentData } from "@/components/assessment/AssessmentQuiz";

// Assessment data for Acid-Base Titration
export const acidBaseTitrationAssessment: AssessmentData = {
  id: "acid-base-assessment",
  title: "Acid-Base Titration Assessment",
  description: "Test your knowledge about acid-base titration concepts and procedures.",
  passingScore: 70,
  questions: [
    {
      id: "acid-base-q1",
      text: "What is the primary purpose of an acid-base titration?",
      options: [
        {
          id: "acid-base-q1-a",
          text: "To measure the pH of a solution",
          isCorrect: false
        },
        {
          id: "acid-base-q1-b",
          text: "To determine the concentration of an unknown acid or base solution",
          isCorrect: true
        },
        {
          id: "acid-base-q1-c",
          text: "To create a neutral solution",
          isCorrect: false
        },
        {
          id: "acid-base-q1-d",
          text: "To change the color of indicators",
          isCorrect: false
        }
      ],
      explanation: "Acid-base titration is primarily used to determine the concentration of an unknown acid or base solution by using a standard solution of known concentration."
    },
    {
      id: "acid-base-q2",
      text: "What happens at the equivalence point in an acid-base titration?",
      options: [
        {
          id: "acid-base-q2-a",
          text: "The solution becomes completely acidic",
          isCorrect: false
        },
        {
          id: "acid-base-q2-b",
          text: "The solution becomes completely basic",
          isCorrect: false
        },
        {
          id: "acid-base-q2-c",
          text: "The moles of acid equal the moles of base",
          isCorrect: true
        },
        {
          id: "acid-base-q2-d",
          text: "The indicator stops changing color",
          isCorrect: false
        }
      ],
      explanation: "At the equivalence point, the moles of acid exactly equal the moles of base, meaning the acid has been completely neutralized by the base (or vice versa)."
    },
    {
      id: "acid-base-q3",
      text: "Which indicator would be most appropriate for a strong acid-strong base titration?",
      options: [
        {
          id: "acid-base-q3-a",
          text: "Methyl orange (pH range 3.1-4.4)",
          isCorrect: false
        },
        {
          id: "acid-base-q3-b",
          text: "Phenolphthalein (pH range 8.3-10.0)",
          isCorrect: false
        },
        {
          id: "acid-base-q3-c",
          text: "Phenol red (pH range 6.8-8.4)",
          isCorrect: false
        },
        {
          id: "acid-base-q3-d",
          text: "Bromothymol blue (pH range 6.0-7.6)",
          isCorrect: true
        }
      ],
      explanation: "For a strong acid-strong base titration, the equivalence point occurs at pH 7. Bromothymol blue with a pH range of 6.0-7.6 would be most appropriate to observe the color change near the equivalence point."
    },
    {
      id: "acid-base-q4",
      text: "What is the pH at the equivalence point of a strong acid-strong base titration?",
      options: [
        {
          id: "acid-base-q4-a",
          text: "pH = 5",
          isCorrect: false
        },
        {
          id: "acid-base-q4-b",
          text: "pH = 7",
          isCorrect: true
        },
        {
          id: "acid-base-q4-c",
          text: "pH = 9",
          isCorrect: false
        },
        {
          id: "acid-base-q4-d",
          text: "pH = 3",
          isCorrect: false
        }
      ],
      explanation: "At the equivalence point of a strong acid-strong base titration, the salt formed is neutral, resulting in a pH of 7."
    },
    {
      id: "acid-base-q5",
      text: "When performing an acid-base titration, why is it important to add the titrant slowly near the expected equivalence point?",
      options: [
        {
          id: "acid-base-q5-a",
          text: "To save titrant solution",
          isCorrect: false
        },
        {
          id: "acid-base-q5-b",
          text: "To prevent exceeding the burette capacity",
          isCorrect: false
        },
        {
          id: "acid-base-q5-c",
          text: "To accurately determine the precise equivalence point",
          isCorrect: true
        },
        {
          id: "acid-base-q5-d",
          text: "To allow time for the indicator to settle",
          isCorrect: false
        }
      ],
      explanation: "Near the equivalence point, adding the titrant slowly allows for more precise measurement and prevents overshooting the endpoint, which would reduce accuracy."
    }
  ]
};

// Assessment data for Flame Test
export const flameTestAssessment: AssessmentData = {
  id: "flame-test-assessment",
  title: "Flame Test Assessment",
  description: "Test your understanding of the flame test and its applications.",
  passingScore: 70,
  questions: [
    {
      id: "flame-test-q1",
      text: "What is the principle behind the flame test?",
      options: [
        {
          id: "flame-test-q1-a",
          text: "Metal ions undergo combustion reactions when heated",
          isCorrect: false
        },
        {
          id: "flame-test-q1-b",
          text: "Metal ions emit characteristic colored light when their electrons return to ground state after excitation",
          isCorrect: true
        },
        {
          id: "flame-test-q1-c",
          text: "Metal compounds change oxidation states in flames",
          isCorrect: false
        },
        {
          id: "flame-test-q1-d",
          text: "Flame colorants are released from the decomposition of metal compounds",
          isCorrect: false
        }
      ],
      explanation: "The flame test works because when metal ions are heated in a flame, their electrons become excited and jump to higher energy levels. When these electrons return to their ground state, they emit energy in the form of light of specific wavelengths, resulting in characteristic flame colors."
    },
    {
      id: "flame-test-q2",
      text: "Which metal ion produces a brick red flame in a flame test?",
      options: [
        {
          id: "flame-test-q2-a",
          text: "Sodium (Na+)",
          isCorrect: false
        },
        {
          id: "flame-test-q2-b",
          text: "Potassium (K+)",
          isCorrect: false
        },
        {
          id: "flame-test-q2-c",
          text: "Calcium (Ca2+)",
          isCorrect: true
        },
        {
          id: "flame-test-q2-d",
          text: "Copper (Cu2+)",
          isCorrect: false
        }
      ],
      explanation: "Calcium (Ca2+) ions produce a brick red or orange-red flame color in a flame test."
    },
    {
      id: "flame-test-q3",
      text: "Why is sodium contamination a common problem in flame tests?",
      options: [
        {
          id: "flame-test-q3-a",
          text: "Sodium compounds are toxic and dangerous to use",
          isCorrect: false
        },
        {
          id: "flame-test-q3-b",
          text: "Sodium is present in many compounds and produces an intense yellow flame that can mask other colors",
          isCorrect: true
        },
        {
          id: "flame-test-q3-c",
          text: "Sodium reacts explosively with water in the air",
          isCorrect: false
        },
        {
          id: "flame-test-q3-d",
          text: "Sodium compounds are expensive and wasteful",
          isCorrect: false
        }
      ],
      explanation: "Sodium is ubiquitous and even trace amounts can produce an intense yellow flame. This can mask the colors produced by other metal ions, making identification difficult."
    },
    {
      id: "flame-test-q4",
      text: "What device is used in modern laboratories to identify elements based on the same principle as flame tests but with greater precision?",
      options: [
        {
          id: "flame-test-q4-a",
          text: "Mass spectrometer",
          isCorrect: false
        },
        {
          id: "flame-test-q4-b",
          text: "Atomic absorption spectrometer",
          isCorrect: false
        },
        {
          id: "flame-test-q4-c",
          text: "Flame photometer",
          isCorrect: true
        },
        {
          id: "flame-test-q4-d",
          text: "Infrared spectrometer",
          isCorrect: false
        }
      ],
      explanation: "Flame photometers work on the same principle as flame tests but provide quantitative measurements of the light emitted by specific elements, allowing for more precise identification and concentration measurements."
    },
    {
      id: "flame-test-q5",
      text: "Which of the following would NOT be detected effectively using a flame test?",
      options: [
        {
          id: "flame-test-q5-a",
          text: "Barium in fireworks",
          isCorrect: false
        },
        {
          id: "flame-test-q5-b",
          text: "Mercury in a contaminated sample",
          isCorrect: true
        },
        {
          id: "flame-test-q5-c",
          text: "Lithium in a mineral sample",
          isCorrect: false
        },
        {
          id: "flame-test-q5-d",
          text: "Strontium in a solution",
          isCorrect: false
        }
      ],
      explanation: "Mercury does not produce a distinctive flame color and is not typically identified using flame tests. Additionally, mercury compounds can decompose to release toxic mercury vapor when heated."
    }
  ]
};

// Assessment data for Chemical Reactions
export const chemicalReactionsAssessment: AssessmentData = {
  id: "chemical-reactions-assessment",
  title: "Chemical Reactions Assessment",
  description: "Test your knowledge about different types of chemical reactions and balancing chemical equations.",
  passingScore: 70,
  questions: [
    {
      id: "chem-reactions-q1",
      text: "What type of reaction is represented by: Zn + 2 HCl → ZnCl₂ + H₂?",
      options: [
        {
          id: "chem-reactions-q1-a",
          text: "Double displacement reaction",
          isCorrect: false
        },
        {
          id: "chem-reactions-q1-b",
          text: "Synthesis reaction",
          isCorrect: false
        },
        {
          id: "chem-reactions-q1-c",
          text: "Single displacement reaction",
          isCorrect: true
        },
        {
          id: "chem-reactions-q1-d",
          text: "Decomposition reaction",
          isCorrect: false
        }
      ],
      explanation: "This is a single displacement reaction where zinc metal displaces hydrogen from hydrochloric acid. In single displacement reactions, one element replaces another element in a compound."
    },
    {
      id: "chem-reactions-q2",
      text: "In the balanced equation CH₄ + 2 O₂ → CO₂ + 2 H₂O, what is the coefficient of O₂?",
      options: [
        {
          id: "chem-reactions-q2-a",
          text: "1",
          isCorrect: false
        },
        {
          id: "chem-reactions-q2-b",
          text: "2",
          isCorrect: true
        },
        {
          id: "chem-reactions-q2-c",
          text: "3",
          isCorrect: false
        },
        {
          id: "chem-reactions-q2-d",
          text: "4",
          isCorrect: false
        }
      ],
      explanation: "The coefficient of O₂ is 2. This ensures that there are 4 oxygen atoms on both sides of the equation: 2 O₂ (4 oxygen atoms) on the left and CO₂ + 2 H₂O (4 oxygen atoms) on the right."
    },
    {
      id: "chem-reactions-q3",
      text: "What type of reaction is represented by: AgNO₃ + NaCl → AgCl + NaNO₃?",
      options: [
        {
          id: "chem-reactions-q3-a",
          text: "Synthesis reaction",
          isCorrect: false
        },
        {
          id: "chem-reactions-q3-b",
          text: "Single displacement reaction",
          isCorrect: false
        },
        {
          id: "chem-reactions-q3-c",
          text: "Double displacement reaction",
          isCorrect: true
        },
        {
          id: "chem-reactions-q3-d",
          text: "Combustion reaction",
          isCorrect: false
        }
      ],
      explanation: "This is a double displacement (or double replacement) reaction where the cations exchange anions. Silver nitrate and sodium chloride react to form silver chloride and sodium nitrate."
    },
    {
      id: "chem-reactions-q4",
      text: "Which of the following is NOT conserved in a balanced chemical equation?",
      options: [
        {
          id: "chem-reactions-q4-a",
          text: "Mass",
          isCorrect: false
        },
        {
          id: "chem-reactions-q4-b",
          text: "Atoms of each element",
          isCorrect: false
        },
        {
          id: "chem-reactions-q4-c",
          text: "Energy",
          isCorrect: true
        },
        {
          id: "chem-reactions-q4-d",
          text: "Charge",
          isCorrect: false
        }
      ],
      explanation: "Energy is not necessarily conserved in a balanced chemical equation. Reactions can be exothermic (release energy) or endothermic (absorb energy). The balanced equation only ensures that the number of atoms of each element and the total charge are the same on both sides."
    },
    {
      id: "chem-reactions-q5",
      text: "What is the primary characteristic of a combustion reaction?",
      options: [
        {
          id: "chem-reactions-q5-a",
          text: "It always produces water as a product",
          isCorrect: false
        },
        {
          id: "chem-reactions-q5-b",
          text: "It involves the rapid reaction of a substance with oxygen, producing heat and light",
          isCorrect: true
        },
        {
          id: "chem-reactions-q5-c",
          text: "It only occurs with hydrocarbon fuels",
          isCorrect: false
        },
        {
          id: "chem-reactions-q5-d",
          text: "It always results in the formation of a precipitate",
          isCorrect: false
        }
      ],
      explanation: "A combustion reaction is characterized by the rapid reaction of a substance with oxygen, typically producing heat and light. While many common combustion reactions involve hydrocarbons burning to produce carbon dioxide and water, not all combustion reactions follow this pattern."
    }
  ]
};

// Export a map of experiment IDs to their assessment data
export const assessmentDataMap: Record<string, AssessmentData> = {
  'acid-base': acidBaseTitrationAssessment,
  'flame-test': flameTestAssessment,
  'chemical-reactions': chemicalReactionsAssessment
};
