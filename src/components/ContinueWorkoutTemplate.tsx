import { userContext, type Months, type Year } from "../data/UserData"
import { WorkoutTemplates, type TemplateDates, type TemplatePrograms, type TemplateProgramWeeks } from "../data/workout-templates"
import { WorkoutEntry } from "../utils/createWorkout"
import { workouts, type WorkoutBuilderType } from "../data/workouts"
import { useEffect, useRef, useState } from "react"
import WorkoutCard from "./WorkoutCard"
import repSchemeSolver from "../utils/repSchemeDecypher"
import ProgressBar from "./ProgressBar"
import { Timer } from "./Timer"
import { cycleDay, cycleMonth, cycleWeek, cycleYear } from "../utils/cycleDay"

export default function ContinueWorkout() {
  const {archive, userSession, userTemplateInProgress, userWorkoutEntries} = userContext.get()
  const {lastDayAttempt, lastWeekAttempt, lastMonthAttempt, lastYearAttempt} = userContext.get()

  const program = WorkoutTemplates.find(template => template.id === userTemplateInProgress)
  if(!program) return <>You have not created a program yet!</>

  function useSessionInit(preDay?: TemplateDates, preWeek?: TemplateProgramWeeks, preMonth?: Months, preYear?: Year) {
      const date = new Date().toLocaleString()
const programWeeks = Object.keys(program!.modifiers).map(v => v as TemplateProgramWeeks)
const programDays = Object.keys(program!.programming).map(v => v as TemplateDates)
      userContext.setKey('userSession', {
        ...userSession,
        date,
        day: cycleDay(programDays, preDay),
        week: cycleWeek(preWeek, preDay, programWeeks, programDays),
        month: cycleMonth(preMonth),
        year: cycleYear(preYear)
      })
  }

  if(lastDayAttempt) {
    console.log('itter session')
    useSessionInit(lastDayAttempt, lastWeekAttempt!, lastMonthAttempt!, lastYearAttempt!)
  } else if(!userSession.day && !userSession.week && !userSession.year) {
    console.log('new session')
    useSessionInit()
  }
  console.log(program)
  console.log(userContext.value)
  const thisDay = userSession.day as TemplateDates
  const thisWeek = userSession.week as TemplateProgramWeeks
  const thisYear = userSession.year as Year
  const thisMonth = userSession.month as Months

  const currentSession = program.programming[thisDay] as { name: string, exercise_id: number[] }
  console.log(thisDay)

  console.log(currentSession)
  const totalProgress = useRef<Record<number, boolean>>(currentSession.exercise_id.reduce((acc, curr) => ({...acc, [curr]: false}), {}))
  const [progBar, setProgBar] = useState(0)
  const [selectedLift, setSelectedLift] = useState<{id: number, appearance: number}| null>(null)
  const [timer, setTimer] = useState<Date | null>(null)
  const activeLiftForTimer = useRef<number | null>(null)
  const [userLift, setUserLift] = useState<Record<number, {
    goal: string[], 
    progress: number[],
    weight: number[],
    timeSpentLifting: string[], 
    timeSpentResting: string[], 
    finishedSets: boolean, 
    timer: {
      active: React.RefObject<'rest' | 'rep' | null>
      formatted: React.RefObject<string | null>
    }
  }>>(Object.values(currentSession?.exercise_id || [])
    .reduce((acc,curr) => (
      {...acc, [curr]: {
        goal: Object.values(program.repScheme[appearanceToTier(currentSession.exercise_id.indexOf(Number(curr)))][thisWeek] || {}).map(v => v), 
        progress: [],
        weight: [],
        timeSpentLifting: [],
        timeSpentResting: [],
        finishedSets: false,
        timer: {
          active: useRef<null | string>(null),
          formatted: useRef<null | string>(null)
        }
      }}
    ), {}))

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

  function saveToArchive() {
    const thisYearContent = archive[userTemplateInProgress as TemplatePrograms][thisYear]
    const thisMonthContent = thisYearContent![thisMonth]
    
    userContext.setKey('archive', {
      ...archive,
      [userTemplateInProgress as TemplatePrograms]: {
        [thisYear]: {...thisYearContent, [thisMonth]: {...thisMonthContent, [userSession.date!.toLocaleString()]: userSession.liftDataByID }} 
      }
    })
    console.log('handle save work')
    localStorage.setItem('userContext', JSON.stringify(userContext.value))
  }
  function handleEndofWorkout() {
    console.log('handle end work')
    userContext.setKey('lastDayAttempt', thisDay)
    userContext.setKey('lastWeekAttempt', thisWeek)
    userContext.setKey('lastMonthAttempt', thisMonth)
    userContext.setKey('lastYearAttempt', thisYear)
    userContext.setKey('lastEntryTitle', userSession.date!.toLocaleString())
    userContext.setKey('userSession', {day: null, week: null, month: null, year: null, totalDuration: 0, date: null, liftDataByID: {} })
    saveToArchive()
  }

  useEffect(() => {
    if(userLift) {
      console.log('lift', userLift)
      if(userCompletedSets()) { 
        setProgBar(progBar + 10 / currentSession.exercise_id.length)
      }
    }
  }, [userLift])

  useEffect(() => {
    if(selectedLift) {
      const selected = userLift[selectedLift.id]
      const repsByTierAndWeek = program.repScheme[appearanceToTier(selectedLift.appearance)][thisWeek]
      setUserLift({...userLift, [selectedLift.id]: {...selected, goal: repsByTierAndWeek || []} })
    }
  }, [selectedLift])

  console.log(userTemplateInProgress)
  //console.log(currentSession)
  //console.log(program)
  console.log(userLift)
  //console.log(activeLiftForTimer.current)
  //console.log(selectedLift?.id)

  return (
    <>
        <h2>{program.name} | {thisWeek} | {thisDay}</h2>
        <span>
        </span>
        { activeLiftForTimer.current ? <h3>In progress: {workouts.find(w => w.id === activeLiftForTimer.current)?.name}</h3> : null }
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
              thisWeek
            )}
            onSelect={() => setSelectedLift(null)}
            setTimer={setTimer}
            activeLiftID={activeLiftForTimer}
            liftProgress={{
              userLift: userLift[selectedLift.id], 
              setUserLift: (newProgress: {
                goal: string[], 
                progress: number[], 
                weight: number[], 
                timeSpentLifting: string[], 
                timeSpentResting: string[], 
                finishedSets: boolean,
                timer: {
                  active: React.RefObject<'rest' | 'rep' | null>
                  formatted: React.RefObject<string | null>
                }
              }) => setUserLift({...userLift, [selectedLift.id]: newProgress})
            }}
            /> 
            )
          }
        </div>
          { activeLiftForTimer.current && !userLift[activeLiftForTimer.current].finishedSets ? 
          <Timer timerStart={timer} ref={userLift[activeLiftForTimer.current].timer.formatted || null} /> :
          null
          }
          <ProgressBar progression={progBar} />

          // auto save entry to log format and redirect the user to corresponding log entry
          // have log entry direct to all entries or to calendar page with calendar set to date of entry
          {Object.values(totalProgress.current).every(v => v) ? (
            <div className="flex flex-col ">
            Finished all workouts
            
            <button 
            onClick={() => handleEndofWorkout()}
            className="outline pointer-events-auto hover:outline-fuchsia-400 outline-fuchsia-500 text-fuchsia-500 p-2 rounded">Save to Log</button>
            </div>
          ) : null
          }
    <button onClick={() => console.log(userContext.value)}>debug</button>
    </>
  )
}
