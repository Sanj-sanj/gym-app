import { userContext } from "../data/UserData"
import { WorkoutTemplates } from "../data/workout-templates"
import { WorkoutEntry } from "../utils/createWorkout"
import { workouts, type WorkoutBuilderType } from "../data/workouts"
import { useEffect, useRef, useState } from "react"
import WorkoutCard from "./WorkoutCard"
import repSchemeSolver from "../utils/repSchemeDecypher"
import ProgressBar from "./ProgressBar"

export default function ContinueWorkout() {
  const {userTemplateInProgress, lastWeekAttempt, lastDayAttempt, userWorkoutEntries} = userContext.get()
  const program = WorkoutTemplates.find(template => template.id === userTemplateInProgress)

  console.log( userContext.get().userSession )
  if(!program || !lastWeekAttempt || !lastDayAttempt) return <>no program found</>

  const currentSession = program.programming[lastDayAttempt] as { name: string, exercise_id: number[] }
  const totalProgress = useRef<Record<number, boolean>>(currentSession.exercise_id.reduce((acc, curr) => ({...acc, [curr]: false}), {}))
  const [progBar, setProgBar] = useState(0)
  const [selectedLift, setSelectedLift] = useState<{id: number, appearance: number}| null>(null)
  const [userLift, setUserLift] = useState<Record<number, {goal: string[], progress: number[],timeSpentLifting: string[], timeSpentResting: string[], finishedSets: boolean}>>(
    Object.values(currentSession?.exercise_id || [])
    .reduce((acc,curr) => (
      {...acc, [curr]: {
        goal: Object.values(program.repScheme[appearanceToTier(currentSession.exercise_id.indexOf(Number(curr)))][lastWeekAttempt] || {}).map(v => v), 
        progress: [],
        timeSpentLifting: [],
        timeSpentResting: [],
        finishedSets: false
      }}
    ),{})) 

  function appearanceToTier(appear: number){
    return appear === 0 ? 'tier1' : appear === 1 ? 'tier2' : 'accessory'
  }
   
  const constructWorkout = (lift: typeof selectedLift ) => {
    if(!lift) return
      const {id, description, name, uploadAmmount, img } = workouts.find((w) => w.id === lift.id) as WorkoutBuilderType 
      const match = userWorkoutEntries[id]
      return new WorkoutEntry(id, name, description, match['5rm'],match.upcycle, uploadAmmount, img )
  }

  function userCompletedSets() {
    if(!selectedLift) return false;
    const id = selectedLift.id
    if(userLift[id].finishedSets && !totalProgress.current[id]) {
      totalProgress.current[id] = true
      return true;
    } else return false;
  }

  useEffect(() => {
    if(userLift) {
      console.log('useEffect progress')
      if(userCompletedSets()) setProgBar(progBar + 2)
    }
  }, [userLift])

  useEffect(() => {
    console.log('useEffect')
    if(selectedLift) {
      const selected = userLift[selectedLift.id]
      const repsByTierAndWeek = program.repScheme[appearanceToTier(selectedLift.appearance)][lastWeekAttempt]
      setUserLift({...userLift, [selectedLift.id]: {...selected, goal: repsByTierAndWeek || []} })
    }
  }, [selectedLift])

  console.log(userTemplateInProgress)
  console.log(currentSession)
  console.log(program)
  console.log(userLift)

  return (
    <>
        <h2>{program.name} | {lastDayAttempt}</h2>
        <div className="flex flex-col flex-wrap w-full items-center mt-8">
          {
            selectedLift === null ? currentSession?.exercise_id.map(n => {
              const match = workouts.find((workout) => workout.id === n)
              return match ? (
                <WorkoutCard 
                key={match.id} 
                workout={match} 
                isSelected={false} 
                onSelect={(id: number) => 
                  setSelectedLift({
                    id, 
                    appearance: currentSession.exercise_id.indexOf(Number(id))
                  })
                } 
                />
              ) : <>no matching workouts</>;
            }) : (
            <WorkoutCard
            key={workouts.find((w) => w.id === selectedLift.id)?.id || 'null'}
            workout={constructWorkout(selectedLift) as WorkoutEntry}
            isSelected={true}
            repScheme={repSchemeSolver(
              {modifiers: program.modifiers},
              {repScheme: program.repScheme},
              selectedLift.appearance, 
              lastWeekAttempt
            )}
            onSelect={() => setSelectedLift(null)}
            liftProgress={{
              userLift: userLift[selectedLift.id], 
              setUserLift: (newProgress: {
                goal: string[], 
                progress: number[], 
                timeSpentLifting: string[], 
                timeSpentResting: string[], 
                finishedSets: boolean 
              }) => setUserLift({...userLift, [selectedLift.id]: newProgress})
            }}
            /> 
            )
          }
          <ProgressBar progression={progBar} />
        </div>
    <button onClick={() => console.log(userContext.value)}>debug</button>
    </>
  )
}
