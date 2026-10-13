import { userContext } from "../data/UserData"
import { WorkoutTemplates, type TemplateDates } from "../data/workout-templates"
import WorkoutCard from "./WorkoutCard"
import { WorkoutEntry } from "../utils/createWorkout"
import { workouts, type WorkoutBuilderType } from "../data/workouts"
import { useEffect, useState } from "react"
import repSchemeSolver from "../utils/repSchemeDecypher"
import ProgressBar from "./ProgressBar"

export default function ContinueWorkout() {
  const [selectedLift, setSelectedLift] = useState<{id: number, appearance: number}| null>(null)
  const activeProgram = userContext.get().userTemplateInProgress
  const week = userContext.get().lastWeekAttempt
  const day = userContext.get().lastDayAttempt
  const entries = userContext.get().userWorkoutEntries
  const program = WorkoutTemplates.find(template => template.id === activeProgram)
  
  console.log(
  userContext.get().userSession
  )
  if(!program || !week) return <>no program found</>

  const currentSession = program.programming[day as TemplateDates]
  const appearanceToTier = (appear: number) => {return appear === 0 ? 'tier1' : appear === 1 ? 'tier2' : 'accessory'}
  const appearance = (liftOrderAppearance: number) => appearanceToTier(liftOrderAppearance)

  const [userLift, setUserLift] = useState<Record<number, {goal: string[], progress: number[],timeSpentLifting: string[], timeSpentResting: string[], finishedSets: boolean}>>(
    Object.values(currentSession?.exercise_id || [])
    .reduce((acc,curr) => (
      {...acc, [curr]: {
        goal: [],
        progress: [],
        timeSpentLifting: [],
        timeSpentResting: [],
        finishedSets: false
      }}
    ),{})) 

  const constructWorkout = (lift: typeof selectedLift ) => {
    if(!lift) return
      const {id, description, name, uploadAmmount, img } = workouts.find((w) => w.id === lift.id) as WorkoutBuilderType 
      const match = entries[id]
      return new WorkoutEntry(id, name, description, match['5rm'],match.upcycle, uploadAmmount, img )
  }
  useEffect(() => {
    if(selectedLift) {
      const selected = userLift[selectedLift.id]
      const a  = program.repScheme[appearance(selectedLift.appearance)][week]
      setUserLift({...userLift, [selectedLift.id]: {...selected, goal: a || []} })
    }
  }, [selectedLift])
  console.log(activeProgram)
  console.log(currentSession)
  console.log(program)
  console.log(userLift)

  return (
    <>
        <h2>{program.name} | {day}</h2>
        <div className="flex flex-col flex-wrap w-full items-center mt-8">
          {
            selectedLift === null ? currentSession?.exercise_id.map(n => {
              const match = workouts.find((workout) => workout.id === n)
              return match ? (
                <WorkoutCard 
                key={match.id} 
                workout={match} 
                isSelected={false} 
                onSelect={(id: number) => setSelectedLift({id, appearance: currentSession.exercise_id.indexOf(Number(id))})} 
                />
              ) : <>no matching workouts</>;
            }) : (
            <WorkoutCard
            key={workouts.find((w) => w.id === selectedLift.id)?.id || 'null'}
            workout={constructWorkout(selectedLift) as WorkoutEntry}
            isSelected={true}
            repScheme={repSchemeSolver({modifiers:program.modifiers},{repScheme:program.repScheme},  selectedLift.appearance, userContext.get().lastWeekAttempt || 'w1')}
            onSelect={() => setSelectedLift(null)}
            liftProgress={{userLift: userLift[selectedLift.id], setUserLift: (newProgress: {goal: string[], progress: number[], timeSpentLifting: string[], timeSpentResting: string[], finishedSets: boolean }) => setUserLift({...userLift, [selectedLift.id]: newProgress})}}
            /> 
            )
          }
          <ProgressBar />
        </div>
    <button onClick={() => console.log(userContext.value)}>debug</button>
    </>
  )
}
