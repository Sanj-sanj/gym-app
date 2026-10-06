import { userContext } from "../data/UserData"
import { WorkoutTemplates, type TemplateDates } from "../data/workout-templates"
import WorkoutCard from "./WorkoutCard"
import { WorkoutEntry } from "../utils/createWorkout"
import { workouts } from "../data/workouts"
import { useState } from "react"
import repSchemeSolver from "../utils/repSchemeDecypher"

export default function ContinueWorkout() {
  const [selectedLift, setSelectedLift] = useState<{id: number, appearance: number}| null>(null)
  const activeProgram = userContext.get().userTemplateInProgress
  const day = userContext.get().lastDayAttempt
  const program = WorkoutTemplates.find(template => template.id === activeProgram)

  if(!program) return <>No results currently</>
  const currentSession = program.programming[day as TemplateDates]

  const constructWorkout = (lift: typeof selectedLift ) => {
    if(!lift) return
      const entries = userContext.get().userWorkoutEntries
      const {id, description, name, uploadAmmount, img } = workouts.find((w) => w.id === lift.id) as WorkoutBuilderType 
      const match = entries[id]
      return new WorkoutEntry(id, name, description, match['5rm'],match.upcycle, uploadAmmount, img )
  }

  console.log(currentSession)
  console.log(program)

  return (
    <div className="flex flex-wrap flex-col justify-center mt-6">
    <h2>{program.name} | {day}</h2>
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
        ) : null;
      }) : (
        <WorkoutCard
        key={workouts.find((w) => w.id === selectedLift.id)?.id || 'null'}
        workout={constructWorkout(selectedLift) as WorkoutEntry}
        isSelected={true}
        repScheme={repSchemeSolver({modifiers:program.modifiers},{repScheme:program.repScheme},  selectedLift.appearance, userContext.get().lastWeekAttempt || 'w1')}
        onSelect={() => setSelectedLift(null)}
        /> 
      )
    }
    <button onClick={() => console.log(userContext.value)}>debug</button>
    </div>
  )
}
