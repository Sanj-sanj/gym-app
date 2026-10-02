import { useState, useEffect } from 'react';
import { WorkoutTemplates, type TemplateDates, type TemplateOption, type WorkoutProgramming } from '../data/workout-templates.ts';
import { type WorkoutBuilderType, workouts } from '../data/workouts'
import WorkoutCard from './WorkoutCard.tsx';
import repSchemeSolver from '../utils/repSchemeDecypher.ts';
import { isModalActive, userContext } from '../data/UserData.tsx';
import Modal from './Modal/Modal.tsx';

export default function NewExerciseTemplate() {
  const [template, setTemplate] = useState<TemplateOption | null>(null);
  const [workoutIDByDay, setWorkoutIDByDay] = useState<number[] | null>(null);
  const [selectedLift, setSelectedLift] = useState<{id: number, appearance: number}| null>(null);
  const [edited, setEdited] = useState<Partial<Record<TemplateDates, boolean >> | null>(null)

  const currDayEdit:  Partial<Record<TemplateDates, boolean >> = {}
  const liftsBySelectedDay: WorkoutBuilderType[] = []

  const existingUser = userContext.get().userName

  useEffect(() => {
    console.log('outer') 
    console.log(edited)
    if(template?.programming && Object.keys(currDayEdit).length === Object.keys(template?.programming).length) {
      console.log('inner') 
      console.log(currDayEdit)
    }
  }, [currDayEdit])
  if(!existingUser) isModalActive.set(true); 

  function userSelectProgram(opt: TemplateOption) {
    setTemplate(opt)
    userContext.setKey('userTemplateInProgress', opt.id)
    userContext.setKey('lastDayAttempt', 'day1')
    userContext.setKey('lastWeekAttempt', 'w1')
    console.log(opt)
  }

  const toggleEditView = (day: TemplateDates, exerciseByID: number[]) => {
    setWorkoutIDByDay(exerciseByID)
    userContext.setKey('modal',{active: true, entry: "edit lifts", styleFunc: () => setEdited({...edited, [day]: true})})
    isModalActive.set(true) 
  }

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
            className="px-4 py-2 my-1 rounded bg-indigo-600 text-white  hover:bg-indigo-700 transition-colors"
            >
            {opt.name}
            </button>
          ))
        }
        </div>
      ) :
        template && !workoutIDByDay ? (
          <>
          <h2 className="text-xl font-semibold mb-4 text-center">
            {template.name} 
          </h2>
          {
            Object.entries(template.programming).map(([key, opt]) => {
              if(key) currDayEdit[key as TemplateDates] = false
              return (
                <button 
                key={opt.name}
                type="button" 
                onClick={() => toggleEditView(key as TemplateDates, opt.exercise_id)}
                className={`px-4 py-2 my-1 ${edited?.[key as TemplateDates] === true ? "bg-green-600 text-white hover:bg-green-700": "bg-indigo-600 text-white hover:bg-indigo-700"} rounded transition-colors`}
                >
                {opt.name}
                </button>
              )
            })
          } 
          <button onClick={() => setTemplate(null)} className='px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 transition-colors'>
          Template 
          </button>
          </> ) :  
          template && workoutIDByDay ? (
            <> 
            <h2 className="text-xl font-semibold mb-4 text-center absolute top-1/12"> 
              {template.name} 
            </h2>

            <div className="flex flex-col flex-wrap w-full items-center mt-8">
              {workoutIDByDay.length ?
                selectedLift === null ?
                workoutIDByDay.map((n) => {
                const match = workouts.find((workout) => workout.id === n)
                match && liftsBySelectedDay.push(match)
                return match ? (
                  <WorkoutCard 
                  key={match.id} 
                  workout={match} 
                  isSelected={false} 
                  onSelect={(id: number) => setSelectedLift({id, appearance: workoutIDByDay.indexOf(Number(id))})} 
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
            {selectedLift === null ? (
              <>
                <button onClick={() => setWorkoutIDByDay(null)} className='px-4 py-2 border mt-2 border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 transition-colors'>
                  Days
                </button> 
              </>
            ) : null }
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


