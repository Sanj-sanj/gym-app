import { useState } from 'react';
import { TEMPLATE_OPTIONS, TEMPLATE_DATES} from '../data/workout-templates.ts';
import NewWorkoutContent from './NewWorkoutContent.tsx';

export default function NewExerciseTemplate() {
  const [template, setTemplate] = useState<string | null>(null);
  const [workouts, setWorkouts] = useState<number[] | null>(null);

  if(!template) {
    return (
      <div className="flex flex-wrap justify-center mt-6">
      {
        TEMPLATE_OPTIONS.map((opt) => (
          <button 
            key={opt.id}
            type="button" 
            onClick={() => setTemplate(opt.id)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
          {opt.name}
          </button>
        ))
      }
      </div>
    );
  }

  if (template && !workouts) {
    return (
      <div>
      <h2 className="text-xl font-semibold mb-4 text-center">
      </h2>
      {
        TEMPLATE_DATES[template].map((opt) => (
          <button 
            key={opt.id}
            type="button" 
            onClick={() => setWorkouts(opt.exercise_id)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
          {opt.name}
          </button>
        ))
      }
      </div>
    );
  }

  if (workouts) {
    return (
      <NewWorkoutContent exercises={workouts} />
    )
  }

}
