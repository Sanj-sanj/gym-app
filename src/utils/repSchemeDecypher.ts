import type { RepSchemeByLiftType } from '../data/workout-templates.ts';

export default function repSchemeSolver(
  repScheme: RepSchemeByLiftType,
  orderOfAppearance: number,
  week: 'w1' | 'w2' | 'w3' | 'w4'
) {
  const exerciseTier =
    orderOfAppearance === 0 ? 
    'tier1' :
    orderOfAppearance === 1 ?
    'tier2' :
    'accessory' ;

  if(exerciseTier === 'accessory') return repScheme.accessory
  else return repScheme[exerciseTier][week]
}
