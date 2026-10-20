import { useRef, useEffect } from "react";
import type { WorkoutBuilderType } from "../data/workouts";
import { WorkoutEntry } from "../utils/createWorkout";
import Modal from "./Modal/Modal";
import { isModalActive, userContext } from "../data/UserData";

export default function WorkoutCard({ workout, isSelected, repScheme, onSelect, setTimer, liftProgress, activeLiftID }: {
  workout: WorkoutEntry | WorkoutBuilderType,
  isSelected: boolean,
  repScheme?: {reps: string[], percents: number[]},
  onSelect: (id: number) => void,
  setTimer?: React.Dispatch<React.SetStateAction<Date | null>>
  activeLiftID?: React.RefObject<number | null>,
  liftProgress?: {
    userLift: {
      goal: string[];
      progress: number[];
      weight: number[];
      timeSpentLifting: string[];
      timeSpentResting: string[];
      finishedSets: boolean
      timer: {
        active: React.RefObject<'rest' | 'rep' | null>
        formatted: React.RefObject<string | null>
      }
    },
    setUserLift: (newProgress: { 
      goal: string[],
      progress: number[],
      weight: number[],
      timeSpentLifting: string[];
      timeSpentResting: string[];
      finishedSets: boolean,
      timer: {
        active: React.RefObject<'rest' | 'rep' | null>
        formatted: React.RefObject<string | null>
      }
    }) => void
  }
}) {
  const activeSet = useRef<HTMLLIElement| null>(null)

 // console.log(activeSet.current)
 // console.log(workout, repScheme)
 // console.log(liftProgress?.userLift)

  function handleContextProgression() {
    if(!liftProgress || !repScheme) return;
    const {userLift} = liftProgress
    const newLiftData  =  {
        goalReps: userLift.goal,
        goalWeight: repScheme.percents.map(percent => repPercentToWeight(percent)) as number[],
        progressReps: userLift.progress,
        progressWeight: userLift.weight,
        timeSpentLifting: userLift.timeSpentLifting,
        timeSpentResting: userLift.timeSpentResting
    }
  console.log(newLiftData)

   const prev = userContext.get().userSession
    userContext.setKey('userSession', {...prev, liftDataByID: {...prev.liftDataByID, [workout.id]: newLiftData}} )
  }

  function repPercentToWeight(percent: number ) {
    if(workout instanceof WorkoutEntry)
      return Math.round(Math.ceil(workout.currentTrainingMax() * (percent * .01) / 5)) * 5
  }
  useEffect(() => {
    handleContextProgression()
    const goal = liftProgress?.userLift.goal
    const progress = liftProgress?.userLift.progress
    if(goal && progress && goal.length === progress.length && !liftProgress.userLift.finishedSets) {
      finishedSets()
    }
  })

  function finishedSets() {
    if(!liftProgress || !setTimer || !activeLiftID) return;
    const { userLift, setUserLift } = liftProgress
    setTimer(null)
    userLift.timer.active.current = null
    userLift.timer.formatted.current = null
    activeLiftID.current = null

    setUserLift({...userLift, finishedSets: true})
    
  }

  function handleLiftSetTransition() {
    if(!liftProgress || !setTimer || !activeLiftID) return;
    const {userLift, setUserLift} = liftProgress
    const {active, formatted}  = userLift.timer
    activeLiftID.current = workout.id

    if(active.current === 'rest') {
      console.log('rest active')
      setUserLift({...userLift, timeSpentResting: [...userLift.timeSpentResting, formatted.current || '0 seconds'] })
      setTimer(new Date()) 
      if(userLift.progress.length < userLift.goal.length) active.current = 'rep'
        else active.current = null
    } else {
      if(active.current === 'rep' && repScheme) {
      console.log('rep active')
        isModalActive.set(true)
        let repTimeCurr = formatted.current
        userContext.setKey('modal', {
          entry: 'log reps',
          activeDay: userContext.get().userSession.day, 
          styleFunc: (repsDid: number, weightDid = repPercentToWeight(repScheme.percents[userLift.progress.length]) as number) => { 
            setUserLift({
              ...userLift, 
              progress: [...userLift.progress, repsDid],
              weight: [...userLift.weight, weightDid],
              timeSpentLifting: [...userLift.timeSpentLifting, repTimeCurr || '0 seconds']
            }) 
          }
        })
        active.current = 'rest'
        setTimer(new Date()) 
        console.log('handler ', userLift)
      }
    }
    if(!active.current && userLift.finishedSets === false )  {
      setTimer(new Date())
      active.current = 'rep'
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
        title={`Click/tap to ${!liftProgress.userLift.timer.active.current ? 'start' : 'log'} workout.`}
        onClick={() => !activeLiftID?.current ||  activeLiftID?.current === workout.id && !liftProgress.userLift.finishedSets ? handleLiftSetTransition() : null}
        className={`w-full p-4 rounded transition-colors duration-500 ${
          liftProgress.userLift.finishedSets ?
            'bg-mauve-600 text-white hover:bg-mauve-500' :
          liftProgress.userLift.timer.active.current === 'rest' ? 
            'bg-green-600 text-white hover:bg-green-500' :
          liftProgress.userLift.timer.active.current === 'rep' ? 
            'bg-yellow-500  hover:bg-yellow-400' :
            'bg-indigo-600 text-white hover:bg-indigo-500'
        }`}
        >
        {
          liftProgress.userLift.finishedSets ? 
          'All sets completed!' : 
          liftProgress.userLift.timer.active.current === null ?
          'Tap to start set' :
          liftProgress.userLift.timer.active.current === 'rep' ?
          'Tap to rest' : 
          'Tap to lift'
        }
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
                <li key={i} className={`grid grid-cols-2 px-2 py-1 rounded ${liftProgress?.userLift.progress.length === i && activeLiftID?.current === workout.id ? 'bg-amber-400': 'bg-white'}`} ref={activeSet}>
                  <span className="text-left">Set {i+1}: {n} reps</span> 
                  <span className="text-right">
                    <span>{repScheme.percents[i]}%</span> - {repPercentToWeight(repScheme.percents[i])} lbs
                  </span>
                </li>
              ))} 
            </ol>
            <img
              src={workout.img}
              alt={workout.name + ' img'}
              className="w-full h-48 object-cover rounded mt-2"
            />
            <p className="mt-2 text-gray-700">{workout.description}</p>
          </div>

          <div className="flex justify-center">
            {liftProgress?.userLift.timer.active.current === 'rest' ? <Modal useCase="log reps"/> : null}
            <button onClick={() => onSelect(-1)} className='px-4 py-2 border mt-2 border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 transition-colors'>
              Back
            </button> 
            <button 
            onClick={() => {
              activeLiftID && activeLiftID.current === workout.id && !liftProgress?.userLift.finishedSets ?
              finishedSets() : 
              null
            }} 
            className='px-4 py-2 border mt-2 border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 transition-colors'>
              Finish all sets
            </button> 
          </div>
        </>
      ) : null}
    </div>

  );
}
