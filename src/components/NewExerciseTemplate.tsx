import { useState } from 'react';
import { WORKOUT_TEMPLATE_OPTIONS, type TemplateOption } from '../data/workout-templates.ts';
import { type WorkoutType, workouts } from '../data/workouts'
import WorkoutCard from './WorkoutCard.tsx';
import repSchemeSolver from '../utils/repSchemeDecypher.ts';
import { userContext } from '../data/UserData.tsx';

export default function NewExerciseTemplate() {
  const [template, setTemplate] = useState<TemplateOption | null>(null);
  const [workoutProgramming, setWorkoutProgramming] = useState<number[] | null>(null);
  const [selectedLift, setSelectedLift] = useState<{id: string, appearance: number}| null>(null);

  function userSelectProgram(opt: TemplateOption) {
    setTemplate(opt)
    userContext.setKey('userTemplateInProgress', opt.id)
    userContext.setKey('lastDayAttempt', 'day1')
    userContext.setKey('lastWeekAttempt', 'w1')
  }

  return (
    <>
    {
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
        template && !workoutProgramming ? (
          <>
          <h2 className="text-xl font-semibold mb-4 text-center">
          {template.name} 
          </h2>
          {
            Object.values(template.programming).map((opt) => (
              <button 
              key={opt.name}
              type="button" 
              onClick={() => setWorkoutProgramming(opt.exercise_id)}
              className="px-4 py-2 my-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
              >
              {opt.name}
              </button>
            ))
          }
          <button 
          onClick={() => setTemplate(null)} 
          className='px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 transition-colors'>
          Template
          </button> 
          </>
      ) :  
        template && workoutProgramming ? (
          <>
          <h2 className="text-xl font-semibold mb-4 text-center absolute top-1/12">
          {template.name} 
          </h2>

          <div className="flex flex-wrap w-full justify-center mt-8">
          {workoutProgramming.length ?
            selectedLift === null
              ? <div className="flex flex-col"> 
                {workoutProgramming.map((n) => {
                  const match = workouts.find((workout) => workout.id === n.toString())
                  return match ? (
                    <WorkoutCard 
                    key={match.id} 
                    workout={match} 
                    isSelected={false} 
                    onSelect={(id:string) => setSelectedLift({id, appearance: workoutProgramming.indexOf(Number(id))})} 
                    />
                  ) : <>No matching workouts</>
                })}
                  <div className='flex justify-center'>
                  <button onClick={() => setWorkoutProgramming(null)} className='px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 transition-colors'>
                    Days
                    </button> 
                  </div>
                </div>
                : (
                  <WorkoutCard
                  key={workouts.find((w) => w.id === selectedLift.id)?.id || 'null'}
                  workout={workouts.find((w) => w.id === selectedLift.id) as WorkoutType}
                  isSelected={true}
                  repScheme={repSchemeSolver(template, selectedLift.appearance, userContext.get().lastWeekAttempt || 'w1')}
                  onSelect={() => setSelectedLift(null)}
                  /> 
                ) : <div> no workouts prepared </div> 
          }
    </div>
    </>
      ) : <></>
    }
    <button onClick={() => console.log(template)}>someshit</button>
    </>
  )
}

