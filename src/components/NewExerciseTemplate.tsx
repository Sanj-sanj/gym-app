import { useState } from 'react';
import { WORKOUT_TEMPLATE_OPTIONS, type TemplateOption} from '../data/workout-templates.ts';
import NewWorkoutContent from './NewWorkoutContent.tsx';

export default function NewExerciseTemplate() {
  const [template, setTemplate] = useState<TemplateOption | null>(null);
  const [workouts, setWorkouts] = useState<number[] | null>(null);
  
 return (
  !template ? (
      <div className="flex flex-wrap justify-center mt-6">
      one
      {
        WORKOUT_TEMPLATE_OPTIONS.map((opt) => (
          <button 
            key={opt.id}
            type="button" 
            onClick={() => setTemplate(opt)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
          {opt.name}
          </button>
        ))
      }
      </div>
    ) :

  template && !workouts ? (
      <div>
      two
      <h2 className="text-xl font-semibold mb-4 text-center">
      {template.name} 
      </h2>
      {
        template.programming.map((opt) => (
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
    ) :  
      template && workouts ? (
      <div>
        three
        <h2 className="text-xl font-semibold mb-4 text-center">
          {template.name} 
        </h2>
        <button onClick={() => console.log(template, workouts)} > define list </button>
        <NewWorkoutContent exercises={workouts} template={template} />
      </div>
    ) : <></>
 )
}
