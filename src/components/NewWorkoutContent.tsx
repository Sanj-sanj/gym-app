import { useState } from 'react';
import { workouts } from '../data/workouts.ts';
import WorkoutCard from './WorkoutCard.tsx';
import type { TemplateOption } from '../data/workout-templates.ts';

export default function NewWorkoutContent({exercises, template}: {exercises: number[], template: Pick<TemplateOption, 'repScheme'>}) {
  //with template, we have rep progressions for main and accessory lifts which we can
  //set on component level to assign reps based on exercise order
  //ie: lift 1 ohp = main lift = 531, lift 2 same, lift 3 tricep pushdown = accessory = 5x10
  // in summary we can set reps based on order of exercise appearance

  //set the current individual workout ID to this state
  const [selectedLift, setSelectedLift] = useState<{id: string, appearance: number}| null>(null);
  console.log(selectedLift)
  console.log(exercises) 
  console.log(template.repScheme)

  return (
    <div className="flex flex-wrap justify-center mt-6">
    { exercises.length ?
      selectedLift === null
        ? exercises.map((n) => {
          const match = workouts.find((workout) => workout.id === n.toString())
          return match ? (
            <div>
            wan
            <WorkoutCard key={match.id} workout={match} isSelected={false} onSelect={(id:string) => setSelectedLift({id, appearance: exercises.indexOf(Number(id))})} />
            </div>
          ) : <>no matching workouts</>
        })
        : (
            <div>
            tsu
          <WorkoutCard
          key={workouts.find((w) => w.id === selectedLift.id)?.id || 'null'}
          workout={workouts.find((w) => w.id === selectedLift.id)}
          repScheme={selectedLift.appearance <= 1 ? template.repScheme.main : template.repScheme.accessory}
          isSelected={true}
          onSelect={() => setSelectedLift(null)}
          />
          </div>
        )
      : <div> no workouts prepared </div> 
    }
    </div>
  );
}
