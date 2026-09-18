export type TemplatePrograms = 'ppl' | '531' | 'fullbody';
export type TemplateByDay = { id: string; name: string, exercise_id: number[]  }

export type TemplateOption= { 
  id: TemplatePrograms; 
  name: string, 
  repScheme: RepSchemeByLiftType
  programming: TemplateByDay[]
}
export type RepSchemeByLiftType = {
  tier1: Record<'w1' | 'w2' | 'w3' | 'w4', string[]>,
  tier2: Record<'w1' | 'w2' | 'w3' | 'w4', string[]>,
  accessory: string[]
} 

export const WORKOUT_TEMPLATE_OPTIONS:TemplateOption[] = [
  { 
    id: 'ppl',
    name: 'PPL', 
    repScheme: {
        accessory: ['10','10','10','10','10','10'], 
        tier1: {
          w1: ['5','5','3','5','5','5'], 
          w2: ['5','5','3','3','3','3'], 
          w3: ['5','5','3','3','3','3'], 
          w4: ['5','5','3','3','3','3']
        },
        tier2: {
          w1: ['5','5','3','5','5','5'], 
          w2: ['5','5','3','3','3','3'], 
          w3: ['5','5','3','3','3','3'], 
          w4: ['5','5','3','3','3','3']
        }
    },
    programming: [
      { id: 'push1', name: 'Push day 1', exercise_id: [0,0,0,0,0] },
      { id: 'pull1', name: 'Pull day 1', exercise_id: [0,0,0,0,0] },
      { id: 'legs1', name: 'Legs day 1', exercise_id: [0,0,0,0,0] },
      { id: 'push2', name: 'Push day 2', exercise_id: [0,0,0,0,0] },
      { id: 'pull2', name: 'Pull day 2', exercise_id: [0,0,0,0,0] },
      { id: 'legs2', name: 'Legs day 2', exercise_id: [0,0,0,0,0] },
    ]
  },
  { 
    id: '531',
    name: '5/3/1', 
    repScheme: {
        accessory: ['10','10','10','10','10','10'], 
        tier1: {
          w1: ['5','5','3','5','5','5'], 
          w2: ['5','5','3','3','3','3'], 
          w3: ['5','5','3','3','3','3'], 
          w4: ['5','5','3','3','3','3']
        },
        tier2: {
          w1: ['5','5','3','10','10','10'], 
          w2: ['6','6','6','6','6','6'], 
          w3: ['5','5','5','5','5','5'], 
          w4: ['5','5','5','5','5','5']
        }

    },
    programming:
      [
      { id: 'upper1', name: 'Upper 1', exercise_id: [4,8,9,10,14] },
      { id: 'lower1', name: 'Lower 1', exercise_id: [3,7,37,34,26] },
      { id: 'upper2', name: 'Upper 2', exercise_id: [2,19,11,18,15] },
      { id: 'lower2', name: 'Lower 2', exercise_id: [1,6,28,29,31] },
    ],
  },
  { 
    id: 'fullbody',
    name: 'Full Body', 
    repScheme: {
        accessory: ['10','10','10','10','10','10'], 
        tier1: {
          w1: ['5','5','3','5','5','5'], 
          w2: ['5','5','3','3','3','3'], 
          w3: ['5','5','3','3','3','3'], 
          w4: ['5','5','3','3','3','3']
        },
        tier2: {
          w1: ['5','5','3','5','5','5'], 
          w2: ['5','5','3','3','3','3'], 
          w3: ['5','5','3','3','3','3'], 
          w4: ['5','5','3','3','3','3']
        }
    },
    programming:[
      { id: 'day1', name: 'day 1', exercise_id: [0,0,0,0,0]},
      { id: 'day2', name: 'day 2', exercise_id: [0,0,0,0,0]},
      { id: 'day3', name: 'day 3', exercise_id: [0,0,0,0,0]},
    ]

  }
];

// keep track of the users progress
export const userData: {
  userName: string,
  lastWeekAttempt: string | null,
  lastDayAttempt: string | null,
  lastUsedTemplate: TemplatePrograms | null
} = {
  userName: 'sanjeet',
  lastWeekAttempt: null,
  lastDayAttempt: null,
  lastUsedTemplate: null
}
