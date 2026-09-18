import { useState } from 'react';
import { workouts } from '../data/workouts.ts';
import WorkoutCard from './WorkoutCard.tsx';
import type { TemplateOption } from '../data/workout-templates.ts';

export default function NewWorkoutContent({exercises, template}: {exercises: number[], template: Pick<TemplateOption, 'repScheme'>}) {

  //  we can set reps based on order of exercise appearance
  //set the current individual workout ID to this state
  const [selectedLift, setSelectedLift] = useState<{id: string, appearance: number}| null>(null);

  return (
    <div className="flex flex-wrap justify-center mt-6">
    { exercises.length ?
      selectedLift === null
        ? exercises.map((n) => {
          const match = workouts.find((workout) => workout.id === n.toString())
          return match ? (
            <WorkoutCard 
            key={match.id} 
            workout={match} 
            isSelected={false} 
            onSelect={(id:string) => setSelectedLift({id, appearance: exercises.indexOf(Number(id))})} 
            />
          ) : <>no matching workouts</>
        })
        : (
            <div>
            tsu
          <WorkoutCard
          key={workouts.find((w) => w.id === selectedLift.id)?.id || 'null'}
          workout={workouts.find((w) => w.id === selectedLift.id)}
          repScheme={selectedLift.appearance <= 1 ? template.repScheme.tier1 : template.repScheme.accessory}
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
