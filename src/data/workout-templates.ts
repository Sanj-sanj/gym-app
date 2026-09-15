
export const TEMPLATE_OPTIONS = [
  { id: 'ppl', name: 'PPL' },
  { id: '531', name: '5/3/1' },
  { id: 'fullbody', name: 'Full Body' },
];

export const TEMPLATE_DATES: Record<string, { id: string; name: string, exercise_id: number[] }[]> = {
  ppl: [
    { id: 'push1', name: 'Push day 1', exercise_id: [0,0,0,0,0] },
    { id: 'pull1', name: 'Pull day 1', exercise_id: [0,0,0,0,0] },
    { id: 'legs1', name: 'Legs day 1', exercise_id: [0,0,0,0,0] },
    { id: 'push2', name: 'Push day 2', exercise_id: [0,0,0,0,0] },
    { id: 'pull2', name: 'Pull day 2', exercise_id: [0,0,0,0,0] },
    { id: 'legs2', name: 'Legs day 2', exercise_id: [0,0,0,0,0] },
  ],
  531: [
    { id: 'upper', name: 'Upper', exercise_id: [4,8,9,10,14] },
    { id: 'lower', name: 'Lower', exercise_id: [3,7,37,34,26] },
    { id: 'upper2', name: 'Upper 2', exercise_id: [2,19,11,18,15] },
    { id: 'lower2', name: 'Lower 2', exercise_id: [1,6,28,29,31] },
  ],
  fullbody: [
    { id: 'day1', name: 'Day 1', exercise_id: [0,0,0,0,0]},
    { id: 'day2', name: 'Day 2', exercise_id: [0,0,0,0,0]},
    { id: 'day3', name: 'Day 3', exercise_id: [0,0,0,0,0]},
  ]
};
