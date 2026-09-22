import { useState } from 'react';
import { WORKOUT_TEMPLATE_OPTIONS, type TemplateOption} from '../data/workout-templates.ts';
import NewWorkoutContent from './NewWorkoutContent.tsx';
import { userContext } from '../data/UserData.tsx';

export default function NewExerciseTemplate() {
  const [template, setTemplate] = useState<TemplateOption | null>(null);
  const [workouts, setWorkouts] = useState<number[] | null>(null);


  function userSelectProgram(opt: TemplateOption) {
    setTemplate(opt)
    userContext.setKey('userTemplateInProgress', opt.id)
    userContext.setKey('lastDayAttempt', 'day1')
    userContext.setKey('lastWeekAttempt', 'w1')
  }
  console.log('renderf')

  return (
  !template ? (
      <div className="flex flex-wrap flex-col justify-center mt-6">
      {
        WORKOUT_TEMPLATE_OPTIONS.map((opt) => (
          <button 
            key={opt.id}
           type="button" 
            onClick={() => userSelectProgram(opt)}
            className="px-4 py-2 my-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
          {opt.name}
          </button>
        ))
      }
      </div>
    ) :

  template && !workouts ? (
      <>
      <h2 className="text-xl font-semibold mb-4 text-center">
      {template.name} 
      </h2>
      {
        Object.values(template.programming).map((opt) => (
          <button 
            key={opt.name}
            type="button" 
            onClick={() => setWorkouts(opt.exercise_id)}
            className="px-4 py-2 my-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
          {opt.name}
          </button>
        ))
      }
      <button onClick={() => setTemplate(null)}>go back to templates</button> 
      </>
    ) :  
      template && workouts ? (
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center">
          {template.name} 
        </h2>
        <NewWorkoutContent exercises={workouts} template={template} />
      <button onClick={() => setWorkouts(null)}>go back lift viewer</button> 
      </div>
    ) : <></>
 )
}

