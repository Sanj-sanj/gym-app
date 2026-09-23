export type TemplatePrograms = 'ppl' | '531' | 'fullbody';
export type TemplateNames = 'PPL' | '5/3/1' | 'Full Body';
export type TemplateDates = 'day1' | 'day2' | 'day3' | 'day4' | 'day5' | 'day6';
export type TemplateProgramWeeks = 'w1' | 'w2' | 'w3' | 'w4';
export type TemplateByDay = Partial<Record<TemplateDates ,{ name: string, exercise_id: number[]  }>>;

export type TemplateOption= { 
  id: TemplatePrograms; 
  name: TemplateNames, 
  repScheme: RepSchemeByLiftType
  programming: TemplateByDay
}
export type RepSchemeByLiftType = {
  tier1: Record<TemplateProgramWeeks, string[]>,
  tier2: Record<TemplateProgramWeeks, string[]>,
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
    programming: {
      'day1':{ name: 'Push day 1', exercise_id: [0,0,0,0,0] },
      'day2':{ name: 'Pull day 1', exercise_id: [0,0,0,0,0] },
      'day3':{ name: 'Legs day 1', exercise_id: [0,0,0,0,0] },
      'day4':{ name: 'Push day 2', exercise_id: [0,0,0,0,0] },
      'day5':{ name: 'Pull day 2', exercise_id: [0,0,0,0,0] },
      'day6':{ name: 'Legs day 2', exercise_id: [0,0,0,0,0] },
    } 
  },
  { 
    id: '531',
    name: '5/3/1', 
    repScheme: {
        accessory: ['10','10','10','10','10'], 
        tier1: {
          w1: ['5','5','3','5','5','5+'], 
          w2: ['5','5','3','3','3','3+'], 
          w3: ['5','5','3','3','3','3+'], 
          w4: ['5','5','3','3','3','3']
        },
        tier2: {
          w1: ['5','5','3','10','10','10'], 
          w2: ['6','6','6','6','6','6'], 
          w3: ['5','5','5','5','3','1'], 
          w4: ['5','5','5','5','5','5']
        }

    },
    programming: {
      'day1':{ name: 'Upper 1', exercise_id: [4,8,9,10,14] },
      'day2':{ name: 'Lower 1', exercise_id: [3,7,37,34,26] },
      'day3':{ name: 'Upper 2', exercise_id: [2,19,11,18,15] },
      'day4':{ name: 'Lower 2', exercise_id: [1,6,28,29,31] },
    },
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
    programming: {
      'day1': {name: 'day 1', exercise_id: [0,0,0,0,0]},
      'day2': {name: 'day 2', exercise_id: [0,0,0,0,0]},
      'day3': {name: 'day 3', exercise_id: [0,0,0,0,0]},
    }
  }
];
