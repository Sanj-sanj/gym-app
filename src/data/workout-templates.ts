export type TemplatePrograms = 'ppl' | '531' | 'fullbody';
export type TemplateNames = 'PPL' | '5/3/1' | 'Full Body';
export type TemplateDates = 'day1' | 'day2' | 'day3' | 'day4' | 'day5' | 'day6';
export type TemplateProgramWeeks = 'w1' | 'w2' | 'w3' | 'w4';
export type TemplateByDay = Partial<Record<TemplateDates ,{ name: string, exercise_id: number[], hasUserEdit: boolean  }>>;
export type WorkoutProgramming = {
  name: string;
  exercise_id: number[];
  hasUserEdit: boolean;
}

export type TemplateOption= { 
  id: TemplatePrograms; 
  name: TemplateNames, 
  repScheme: RepSchemeByLiftType
  programming: TemplateByDay
  modifiers?: { 
    [key in TemplateProgramWeeks]: {
      tier1: number[],
      tier2: number[],
      accessory: number[],
    }
  }
}
export type RepSchemeByLiftType = {
  tier1: Record<TemplateProgramWeeks, string[]>,
  tier2: Record<TemplateProgramWeeks, string[]>,
  accessory: string[]
} 

export const WorkoutTemplates:TemplateOption[] = [
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
      'day1':{ name: 'Push day 1', exercise_id: [0,0,0,0,0], hasUserEdit: false },
      'day2':{ name: 'Pull day 1', exercise_id: [0,0,0,0,0], hasUserEdit: false },
      'day3':{ name: 'Legs day 1', exercise_id: [0,0,0,0,0], hasUserEdit: false },
      'day4':{ name: 'Push day 2', exercise_id: [0,0,0,0,0], hasUserEdit: false },
      'day5':{ name: 'Pull day 2', exercise_id: [0,0,0,0,0], hasUserEdit: false },
      'day6':{ name: 'Legs day 2', exercise_id: [0,0,0,0,0], hasUserEdit: false },
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
          w3: ['5','5','3','5','3','1+'], 
          w4: ['5','5','3','5','5','5']
        },
        tier2: {
          w1: ['5','5','3','10','10','10'], 
          w2: ['5','5','3','6','6','6'], 
          w3: ['5','5','3','5','5','5'], 
          w4: ['5','5','3','5','5','5']
        }
    },
    programming: {
      'day1':{ name: 'Upper 1', exercise_id: [4,8,9,10,14], hasUserEdit: false},
      'day2':{ name: 'Lower 1', exercise_id: [3,7,37,34,26], hasUserEdit: false},
      'day3':{ name: 'Upper 2', exercise_id: [2,19,11,18,15], hasUserEdit: false},
      'day4':{ name: 'Lower 2', exercise_id: [1,6,28,29,31], hasUserEdit: false},
    },
    modifiers: {
        w1: {
          tier1: [40, 50, 60, 65, 75, 85],
          tier2: [40, 50, 60, 50, 60, 70],
          accessory: [50,50,50,50,50],
        },
        w2: {
          tier1: [40, 50, 60, 70, 80, 90],
          tier2: [40, 50, 60, 60, 70, 80],
          accessory: [50,50,50,50,50],
        },
        w3: {
          tier1: [40, 50, 60, 75, 85, 95],
          tier2: [40, 50, 60, 65, 75, 85],
          accessory: [50,50,50,50,50],
        },
        w4: {
          tier1: [40, 50, 60, 40, 50, 60],
          tier2: [40, 50, 60, 40, 50, 60],
          accessory: [50,50,50,50,50],
        }
      }
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
      'day1': {name: 'day 1', exercise_id: [0,0,0,0,0], hasUserEdit: false},
      'day2': {name: 'day 2', exercise_id: [0,0,0,0,0], hasUserEdit: false},
      'day3': {name: 'day 3', exercise_id: [0,0,0,0,0], hasUserEdit: false},
    }
  }
];
