import { useState } from 'react';
import { workouts } from '../data/workouts.ts';
import WorkoutCard from './WorkoutCard.tsx';

export default function NewWorkoutContent({exercises}: {exercises: number[]}) {
  const [selected, setSelected] = useState<string | null>(null);
  console.log(selected)
  console.log(exercises)

  return (
    <div className="flex flex-wrap justify-center mt-6">
    { exercises.length ?
      selected === null
        ? exercises.map((n) => {
          const match = workouts.find((workout) => workout.id === n.toString())
          console.log(match)
         return match ? (
            <WorkoutCard key={match.id} workout={match} isSelected={false} onSelect={(id) => setSelected(id)} />
          ) : <>no matching workouts</>
        })
        : (
          <WorkoutCard
          key={workouts.find((w) => w.id === selected.id)?.id || 'null'}
          workout={workouts.find((w) => w.id === selected)}
          isSelected={true}
          onSelect={(id) => setSelected(id)}
          />
        )
      : <div> no workouts prepared </div> 
    }
    </div>
  );
}
