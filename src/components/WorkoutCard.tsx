import { useRef, useState, useEffect } from "react";
import type { WorkoutBuilderType } from "../data/workouts";
import { WorkoutEntry } from "../utils/createWorkout";
import { Timer } from "./Timer";
import Modal from "./Modal/Modal";
import { isModalActive, userContext } from "../data/UserData";

export default function WorkoutCard({ workout, isSelected, repScheme, onSelect, liftProgress }: {
  workout: WorkoutEntry | WorkoutBuilderType,
  isSelected: boolean,
  repScheme?: {reps: string[], percents: number[]},
  onSelect: (id: number) => void,
  liftProgress?: {
    userLift: {
      goal: string[];
      progress: number[];
      timeSpentLifting: string[];
      timeSpentResting: string[];
      finishedSets: boolean
    },
    setUserLift: (newProgress: { 
      goal: string[],
      progress: number[],
      timeSpentLifting: string[];
      timeSpentResting: string[];
      finishedSets: boolean
    } ) => void
  }
}) {

  const [repTimer, setRepTimer] = useState<Date | null>(null)
  const [restTimer, setRestTimer] = useState<Date | null>(null)
  let workoutHasBegun = useRef(false)
  let lastTimeLogged = useRef<string | null>(null)

  console.log(workout, repScheme)
  console.log(liftProgress?.userLift)

  useEffect(() => {
    const goal = liftProgress?.userLift.goal
    const progress = liftProgress?.userLift.progress
    if(goal && progress && goal.length === progress.length && !liftProgress.userLift.finishedSets) {
      finishedSets()
    }
  })

  function finishedSets() {
    if(!liftProgress) return;
    const { userLift, setUserLift } = liftProgress
    setUserLift({...userLift, finishedSets: true})
  }

  function handleLiftSetTransition() {
    if(!liftProgress) return;
    if(!repTimer && !restTimer) workoutHasBegun.current = true
    const {userLift, setUserLift} = liftProgress
      console.log(lastTimeLogged)

    if(!repTimer) {
      setUserLift({...userLift, timeSpentResting: [...userLift.timeSpentResting, lastTimeLogged.current || '0 seconds'] })
      setRestTimer(null)
      setRepTimer(new Date()) 
    } else {
      if(repTimer) {
        isModalActive.set(true)
        let repTimeCurr = lastTimeLogged.current
        userContext.setKey('modal', {
          entry: 'log reps',
          activeDay: userContext.get().lastDayAttempt, styleFunc: (repsDid: number) => { 
            setUserLift({
              ...userLift, 
              progress: [...userLift.progress, repsDid],
              timeSpentLifting: [...userLift.timeSpentLifting, repTimeCurr || '0 seconds']
            }) 
          }
        })
        console.log('handler ', userLift)
      }
      setRestTimer(new Date())
      setRepTimer(null) 
    }
  }

  return (
    <div className={`transition-all duration-300 delay-700 ${isSelected ? 'w-10/12 sm:w-96 mx-auto mt-8' : 'w-64 mx-2 my-4'}`}> 

    { !liftProgress ? (
        <button
        title="Click/tap to preview"
        onClick={!isSelected ? () => onSelect(workout.id) : () => {}}
        className={`w-full p-4 rounded ${isSelected ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
        {workout.name}
        </button>
      ) : (
        <button
        title={`Click/tap to ${!repTimer ? 'start' : 'log'} workout.`}
        onClick={() => !liftProgress.userLift.finishedSets ? handleLiftSetTransition() : null}
        className={`w-full p-4 rounded transition-colors duration-500 ${liftProgress.userLift.finishedSets ? 'bg-indigo-600 text-white hover:bg-indigo-500' : repTimer ? 'bg-green-600 text-white hover:bg-green-500' : restTimer ? 'bg-yellow-500  hover:bg-yellow-400' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
        >
        {liftProgress.userLift.finishedSets ? 'All sets completed!' : repTimer === null && restTimer === null ? 'Tap to start / log' : repTimer ? <Timer timerStart={repTimer} ref={lastTimeLogged}/> : <Timer timerStart={restTimer} ref={lastTimeLogged} /> }
        </button>
      )
    }

      {workout instanceof WorkoutEntry && isSelected  ? (
        <>
          <div className="text-center mt-4 p-4 bg-white rounded shadow relative">
            <h3 className="text-xl font-bold">{workout.name}</h3>

            <p>Current training max: {workout.currentTrainingMax()} lbs</p>
            <p>Initial 5 rep max: {workout.rm5} lbs</p>
            <h4 className="font-bold">Rep Scheme:</h4>
            <ol>
            {repScheme?.reps.map((n,i)=> (
              <li key={i} className='grid grid-cols-3'>
                <span className="text-left">Set {i+1}: {n} reps</span> 
                <span>{repScheme.percents[i]}%</span> 
                <span>{Math.round(Math.ceil(workout.currentTrainingMax() * (repScheme.percents[i] * .01) / 5)) * 5} lbs </span>
              </li>
            ))
            } 
            </ol>
            <img
              src={workout.img}
              alt={workout.name + ' img'}
              className="w-full h-48 object-cover rounded mt-2"
            />
            <p className="mt-2 text-gray-700">{workout.description}</p>
          </div>

          <div className="flex flex-  justify-center">
            {restTimer ? <Modal useCase="log reps"/> : null }
            <button onClick={() => {setRepTimer(null); setRestTimer(null); onSelect(-1)} } className='px-4 py-2 border mt-2 border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 transition-colors'>
            Back
            </button> 
            <button onClick={finishedSets} className='px-4 py-2 border mt-2 border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 transition-colors'>
              Finish all sets
            </button> 
          </div>
        </>
      ) : null}
    </div>

  );
}
