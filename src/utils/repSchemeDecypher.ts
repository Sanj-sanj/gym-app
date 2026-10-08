import type { TemplateOption, TemplateProgramWeeks } from '../data/workout-templates.ts';

export default function repSchemeSolver(
  {modifiers}: Pick<TemplateOption, 'modifiers'>,
  {repScheme}: Pick<TemplateOption, 'repScheme'>,
  orderOfAppearance: number,
  week: TemplateProgramWeeks,
) {
  const exerciseTier =
    orderOfAppearance === 0 ? 
    'tier1' :
    orderOfAppearance === 1 ?
    'tier2' :
    'accessory' ;
  const weightPercents = modifiers[week][exerciseTier];
  const reps = exerciseTier === 'accessory' ? repScheme.accessory['w1'] : repScheme[exerciseTier][week];

  return { reps, percents: weightPercents }
}
