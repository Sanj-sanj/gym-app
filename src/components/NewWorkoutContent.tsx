import { useState } from 'react';
import { workouts, type WorkoutType } from '../data/workouts.ts';
import WorkoutCard from './WorkoutCard.tsx';
import type { TemplateOption } from '../data/workout-templates.ts';
import repSchemeSolver from '../utils/repSchemeDecypher.ts';
import { userContext } from '../data/UserData.tsx';

export default function NewWorkoutContent({exercises, template}: {exercises: number[], template: TemplateOption}) {

  //  we can set re ps based on order of exercise appearance
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
          <WorkoutCard
          key={workouts.find((w) => w.id === selectedLift.id)?.id || 'null'}
          workout={workouts.find((w) => w.id === selectedLift.id) as WorkoutType}
          reps={repSchemeSolver(template.repScheme, selectedLift.appearance, 'w1')}
          isSelected={true}
          onSelect={() => setSelectedLift(null)}
          />
        )
      : <div> no workouts prepared </div> 
    }
    <button onClick={() => console.log(workouts)}>someshit</button>
    </div>
  );
}
