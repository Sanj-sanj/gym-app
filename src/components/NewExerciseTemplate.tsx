import { useState } from 'react';
import { WorkoutTemplates, type TemplateOption } from '../data/workout-templates.ts';
import { type WorkoutBuilderType, workouts } from '../data/workouts'
import WorkoutCard from './WorkoutCard.tsx';
import repSchemeSolver from '../utils/repSchemeDecypher.ts';
import { isModalActive, userContext } from '../data/UserData.tsx';
import Modal from './Modal/Modal.tsx';

export default function NewExerciseTemplate() {
  const [template, setTemplate] = useState<TemplateOption | null>(null);
  const [workoutDay, setWorkoutDay] = useState<number[] | null>(null);
  const [selectedLift, setSelectedLift] = useState<{id: number, appearance: number}| null>(null);

  const existingUser = userContext.get().userName
  const liftsBySelectedDay: WorkoutBuilderType[] = []

  if(!existingUser) isModalActive.set(true); 

  function userSelectProgram(opt: TemplateOption) {
    setTemplate(opt)
    userContext.setKey('userTemplateInProgress', opt.id)
    userContext.setKey('lastDayAttempt', 'day1')
    userContext.setKey('lastWeekAttempt', 'w1')
  }
  const toggleEditView = () => isModalActive.set(true)
  return (
    <>
    {
      !template ? (
        <div className="flex flex-wrap flex-col justify-center mt-6">
        {
          WorkoutTemplates.map((opt) => (
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
        template && !workoutDay ? (
          <>
          <h2 className="text-xl font-semibold mb-4 text-center">
          {template.name} 
          </h2>
          {
            Object.values(template.programming).map((opt) => (
              <button 
              key={opt.name}
              type="button" 
              onClick={() => setWorkoutDay(opt.exercise_id)}
              className="px-4 py-2 my-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
              >
              {opt.name}
              </button>
            ))
          }
          <button onClick={() => setTemplate(null)} className='px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 transition-colors'>
          Template
          </button> 
          </>
      ) :  
        template && workoutDay ? (
          <>
          <h2 className="text-xl font-semibold mb-4 text-center absolute top-1/12">
          {template.name} 
          </h2>

          <div className="flex flex-col flex-wrap w-full items-center mt-8">
          {workoutDay.length ?
            selectedLift === null ?
            workoutDay.map((n) => {
            console.log('all')
            const match = workouts.find((workout) => workout.id === n)
            match && liftsBySelectedDay.push(match)
            return match ? (
              <WorkoutCard 
              key={match.id} 
              workout={match} 
              isSelected={false} 
              onSelect={(id: number) => setSelectedLift({id, appearance: workoutDay.indexOf(Number(id))})} 
              />
            ) : <>No matching workouts</>
          })
            : (
              <WorkoutCard
              key={workouts.find((w) => w.id === selectedLift.id)?.id || 'null'}
              workout={workouts.find((w) => w.id === selectedLift.id) as WorkoutBuilderType}
              isSelected={true}
              repScheme={repSchemeSolver(template, selectedLift.appearance, userContext.get().lastWeekAttempt || 'w1')}
              onSelect={() => setSelectedLift(null)}
              /> 
            ) : <div> no workouts prepared </div> 
          }
          </div>
          { selectedLift === null ? (
            <>
              <button onClick={() => toggleEditView()}
              className="scale-150 absolute right-6 bottom-6 hover:bg-green-500 bg-green-600 outline-emerald-300 outline-3 rounded-3xl min-w-9 min-h-9 p-1" title="Modify lift">✏️</button> 
              <button onClick={() => setWorkoutDay(null)} className='px-4 py-2 border mt-2 border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 transition-colors'>
                Days
              </button> 
            </>
          ) : null
          }
          </>
      ) : <></>
    }
    <button onClick={() => console.log(template)}>someshit</button>
    {!existingUser ? <Modal useCase='new user'/> : null}
    {isModalActive && existingUser ? console.log(liftsBySelectedDay): null}
    {isModalActive && existingUser ? <Modal useCase="edit lift" workouts={liftsBySelectedDay} /> : null}
    </>
  )
}

