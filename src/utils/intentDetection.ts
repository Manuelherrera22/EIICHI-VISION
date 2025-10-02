// src/utils/intentDetection.ts

interface UserBehavior {
  pagesVisited: string[];
  timeSpent: { [key: string]: number };
  searchTerms: string[];
  interactions: string[];
  formsCompleted: string[];
  aiChatQuestions: string[];
}

interface UserIntent {
  primary: 'invest' | 'migrate' | 'live';
  secondary: string[];
  confidence: number;
  triggers: string[];
}

export const detectUserIntent = (userBehavior: UserBehavior): UserIntent => {
  const triggers = {
    invest: [
      'ROI', 'investment', 'return', 'profit', 'portfolio',
      'rental income', 'property value', 'market analysis',
      'calculator', 'financial', 'budget', 'revenue'
    ],
    migrate: [
      'visa', 'migration', 'family', 'permanent', 'citizenship',
      'work permit', 'residence', 'relocation', 'move to japan',
      'immigration', 'settle', 'establish'
    ],
    live: [
      'temporary', 'work', 'study', 'short-term', 'rent',
      'accommodation', 'housing', 'daily life', 'current',
      'existing', 'already in japan'
    ]
  };

  const scores = {
    invest: calculateScore(userBehavior, triggers.invest),
    migrate: calculateScore(userBehavior, triggers.migrate),
    live: calculateScore(userBehavior, triggers.live)
  };

  const primaryIntent = Object.keys(scores).reduce((a, b) => 
    scores[a as keyof typeof scores] > scores[b as keyof typeof scores] ? a : b
  ) as keyof typeof scores;

  return {
    primary: primaryIntent as 'invest' | 'migrate' | 'live',
    secondary: Object.keys(scores).filter(key => key !== primaryIntent),
    confidence: scores[primaryIntent],
    triggers: triggers[primaryIntent]
  };
};

const calculateScore = (behavior: UserBehavior, triggers: string[]): number => {
  let score = 0;
  
  // Páginas visitadas
  behavior.pagesVisited.forEach(page => {
    triggers.forEach(trigger => {
      if (page.toLowerCase().includes(trigger.toLowerCase())) {
        score += 2;
      }
    });
  });
  
  // Términos de búsqueda
  behavior.searchTerms.forEach(term => {
    triggers.forEach(trigger => {
      if (term.toLowerCase().includes(trigger.toLowerCase())) {
        score += 3;
      }
    });
  });
  
  // Interacciones
  behavior.interactions.forEach(interaction => {
    triggers.forEach(trigger => {
      if (interaction.toLowerCase().includes(trigger.toLowerCase())) {
        score += 1;
      }
    });
  });
  
  // Preguntas en AI Chat
  behavior.aiChatQuestions.forEach(question => {
    triggers.forEach(trigger => {
      if (question.toLowerCase().includes(trigger.toLowerCase())) {
        score += 2;
      }
    });
  });
  
  return Math.min(score, 100); // Normalizar a 100
};
