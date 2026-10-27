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
      goalReps: string[];
      progressReps: number[];
      goalWeight: number[];
      progressWeight: number[];
      timeSpentLifting: string[];
      timeSpentResting: string[];
      finishedSets: boolean
      timer: {
        active: React.RefObject<'rest' | 'rep' | null>
        formatted: React.RefObject<string | null>
      }
    },
    setUserLift: (newProgress: { 
      goalReps: string[];
      progressReps: number[];
      goalWeight: number[];
      progressWeight: number[];
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

  function handleContextProgression() {
    if(!liftProgress || !repScheme) return;
    const {userLift} = liftProgress
    const newLiftData  =  {
        goalReps: userLift.goalReps,
        goalWeight: userLift.goalWeight,
        progressReps: userLift.progressReps,
        progressWeight: userLift.progressWeight,
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
    const goalReps = liftProgress?.userLift.goalReps
    const progressReps = liftProgress?.userLift.progressReps
    if(goalReps && progressReps && goalReps.length === progressReps.length && !liftProgress.userLift.finishedSets) {
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
    if(userContext.get().userLiftStatus === 'idle') userContext.setKey('userLiftStatus', 'lifting')

    if(active.current === 'rest') {
      console.log('rest active')
      setUserLift({...userLift, timeSpentResting: [...userLift.timeSpentResting, formatted.current || '0 seconds'] })
      setTimer(new Date()) 
      if(userLift.progressReps.length < userLift.goalReps.length) active.current = 'rep'
        else active.current = null
    } else {
      if(active.current === 'rep' && repScheme) {
      console.log('rep active')
        isModalActive.set(true)
        let repTimeCurr = formatted.current
        userContext.setKey('modal', {
          entry: 'log reps',
          activeDay: userContext.get().userSession.day, 
          styleFunc: (repsDid: number, weightDid = repPercentToWeight(repScheme.percents[userLift.progressReps.length]) as number) => { 
            setUserLift({
              ...userLift, 
              progressReps: [...userLift.progressReps, repsDid],
              progressWeight: [...userLift.progressWeight, weightDid],
              timeSpentLifting: [...userLift.timeSpentLifting, repTimeCurr || '0 seconds']
            }) 
          }
        })
        active.current = 'rest'
        setTimer(new Date()) 
        console.log('handler ', userLift)
      }
    }
    if(!active.current && userLift.finishedSets === false && repScheme )  {
      setTimer(new Date())
      active.current = 'rep'
      setUserLift({
        ...userLift,
        goalWeight: repScheme.percents.map(percent => repPercentToWeight(percent)) as number[]
      })
    }
  }

  return (
    <div className={`transition-all duration-300 delay-700 ${isSelected ? 'w-10/12 sm:w-96 mx-auto mt-8' : 'w-64 mx-2 my-4'}`}> 

    {!liftProgress ? (
      <button
      title="Click/tap to preview"
      onClick={!isSelected ? () => onSelect(workout.id) : () => {}}
      className={`w-full p-4 rounded outline shadow shadow-neutral-600 outline-stone-500 ${isSelected ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-mauve-200  text-gray-800 hover:bg-mauve-100'}`}
      >
      {workout.name}
      </button>
    ) : (
    <button
    title={`Click/tap to ${!liftProgress.userLift.timer.active.current ? 'start' : 'log'} workout.`}
    onClick={() => 
      !activeLiftID?.current || activeLiftID?.current === workout.id && !liftProgress.userLift.finishedSets ?
        handleLiftSetTransition() :
        null
    }
    className={`w-full p-4 rounded transition-colors duration-500 ${
      liftProgress.userLift.finishedSets ?
        'bg-mauve-600 text-white hover:bg-mauve-500' :
        liftProgress.userLift.timer.active.current === 'rest' ? 
        'bg-green-600 text-white hover:bg-green-500' :
        liftProgress.userLift.timer.active.current === 'rep' ? 
        'bg-yellow-500  hover:bg-yellow-400' :
        'bg-indigo-600 text-white hover:bg-indigo-500'
    }`}>
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
    )}

      {workout instanceof WorkoutEntry && isSelected  ? (
        <>
          <div className="text-center mt-4 p-4 bg-stone-100 rounded shadow relative">
            <h3 className="text-xl font-bold">{workout.name}</h3>

            <p>Current training max: {workout.currentTrainingMax()} lbs</p>
            <p>Initial 5 rep max: {workout.rm5} lbs</p>
            <h4 className="font-bold">Rep Scheme:</h4>
            <ol>
              {repScheme?.reps.map((n,i)=> (
                <li key={i} className={`grid grid-cols-2 px-2 py-1 rounded ${liftProgress?.userLift.progressReps.length === i && activeLiftID?.current === workout.id ? 'bg-amber-400': 'bg-stone-100'}`} ref={activeSet}>
                  <span className="text-left flex flex-col sm:flex-row">
                    <span>Set {i+1}: </span><span>{liftProgress?.userLift.progressReps[i] ? liftProgress?.userLift.progressReps[i] + ' /' || ' /' : ' /'} {n} reps</span>
                  </span> 
                  <span className="text-right flex justify-end flex-col sm:flex-row">
                    <span className="a">{repScheme.percents[i]}% </span> 
                    <span className="min-w-[7ch]">
                    {liftProgress?.userLift.progressWeight[i] && liftProgress?.userLift.progressWeight[i] !== repPercentToWeight(repScheme.percents[i]) ? liftProgress?.userLift.progressWeight[i] : repPercentToWeight(repScheme.percents[i])} lbs
                    </span>
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
            {activeLiftID ? (
            <button onClick={() => { activeLiftID && activeLiftID.current === workout.id && !liftProgress?.userLift.finishedSets ?
              finishedSets() : 
              null
            }} 
            className='px-4 py-2 border mt-2 border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 transition-colors'>
              Finish all sets
            </button> ) : 
            null }
          </div>
        </>
      ) : null}
    </div>

  );
}
