import type { TemplateOption, TemplateProgramWeeks } from '../data/workout-templates.ts';

export default function repSchemeSolver(
  template: TemplateOption,
  orderOfAppearance: number,
  week: TemplateProgramWeeks,
) {
  const exerciseTier =
    orderOfAppearance === 0 ? 
    'tier1' :
    orderOfAppearance === 1 ?
    'tier2' :
    'accessory' ;
  const weightPercents = template.modifiers[week][exerciseTier];
  const reps = exerciseTier === 'accessory' ? template.repScheme.accessory : template.repScheme[exerciseTier][week];

  return { reps, percents: weightPercents }
}
