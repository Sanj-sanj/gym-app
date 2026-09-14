import { useState } from 'react';
import { workouts } from '../data/workouts.ts';
import WorkoutCard from './WorkoutCard.tsx';

export default function NewWorkoutContent() {
  const [selected, setSelected] = useState<string | null>(null);


  return (
    <div className="flex flex-wrap justify-center mt-6">
    { workouts.length ?
      selected === null
        ? workouts.map((w) => (
          <WorkoutCard key={w.id} workout={w} isSelected={false} onSelect={(id) => setSelected(id)} />
        ))
        : (
          <WorkoutCard
          key={workouts.find((w) => w.id === selected.id)}
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
