import { useRef, useState } from "react";
import type { WorkoutBuilderType } from "../data/workouts";
import { WorkoutEntry } from "../utils/createWorkout";
import { Timer } from "./Timer";
import Modal from "./Modal/Modal";
import { isModalActive } from "../data/UserData";

export default function WorkoutCard({ workout, isSelected, repScheme, onSelect, liftProgress }: {
  workout: WorkoutEntry | WorkoutBuilderType,
  isSelected: boolean,
  repScheme?: {reps: string[], percents: number[]},
  onSelect: (id: number) => void,
  liftProgress?: {progress: {
    goal: string[];
    progress: number[];
    done: boolean;
  },
  setProgress: (newProgress:{goal: string[], progress:  number[], done: boolean } ) => void
  }}) {
  const [repTimer, setRepTimer] = useState<Date | null>(null)
  const [restTimer, setRestTimer] = useState<Date | null>(null)
  let workoutHasBegun = useRef(false)

  console.log(workout, repScheme)
  console.log(liftProgress)

  function handleLiftSetTransition() {
    console.log(workoutHasBegun)
    if(!repTimer) {
      workoutHasBegun.current = true
      setRestTimer(null)
      setRepTimer(new Date()) 
    } else {
      if(liftProgress) {
        const {progress, setProgress} = liftProgress
        isModalActive.set(true)
        setProgress({...progress, done: true})
      }
      setRestTimer(new Date())
      setRepTimer(null) 
    }
  }


  return (
    <div className={`transition-all duration-300 delay-700 ${isSelected ? 'w-10/12 sm:w-96 mx-auto mt-8' : 'w-64 mx-2 my-4'}`}> 

    { !liftProgress ? 
      (
        <button
        title="Click/tap to preview"
        onClick={!isSelected ? () => onSelect(workout.id) : () => {}}
        className={`w-full p-4 rounded ${isSelected ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
        {workout.name}
        </button>
      ) : 
      (
        <button
        title={`Click/tap to ${!repTimer ? 'start' : 'log'} workout.`}
        onClick={handleLiftSetTransition}
        className={`w-full p-4 rounded transition-colors duration-500 ${repTimer ? 'bg-green-600 text-white hover:bg-green-500' : restTimer ? 'bg-yellow-500  hover:bg-yellow-400' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
        >
        { repTimer === null && restTimer === null ? 'Tap to start / log' : repTimer ? <Timer timerStart={repTimer} /> : <Timer timerStart={restTimer} /> }
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

          <div className="flex justify-center">
            {restTimer ? <Modal useCase="log reps"/> : null }
            <button onClick={() => { onSelect(-1); repTimer ? setRepTimer(null) : null }} className='px-4 py-2 border mt-2 border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 transition-colors'>
            Back
            </button> 
          </div>
        </>
      ) : null}
    </div>

  );
}
