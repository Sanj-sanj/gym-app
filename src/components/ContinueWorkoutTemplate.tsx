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
import once from '../utils/once'

export default function ContinueWorkout() {
  const {archive, userSession, userTemplateInProgress, userWorkoutEntries} = userContext.get()
  const {lastDayAttempt, lastWeekAttempt, lastMonthAttempt, lastYearAttempt} = userContext.get()

  const program = WorkoutTemplates.find(template => template.id === userTemplateInProgress)
  if(!program) return <>No program found, wait a bit or make a <a href="/" className="text-blue-700 font-medium underline">New Template!</a></>

  function useSessionInit(preDay?: TemplateDates, preWeek?: TemplateProgramWeeks, preMonth?: Months, preYear?: Year) {
      const date = new Date()
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
    useSessionInit(lastDayAttempt, lastWeekAttempt!, lastMonthAttempt!, lastYearAttempt!)
  } else if(!userSession.day && !userSession.week && !userSession.year) {
    useSessionInit()
  }

  const thisDay = userSession.day as TemplateDates
  const thisWeek = userSession.week as TemplateProgramWeeks
  const thisYear = userSession.year as Year
  const thisMonth = userSession.month as Months
  const currentSession = program.programming[thisDay] as { name: string, exercise_id: number[] }

  const onceRef = useRef(false)
  const totalDuration = useRef<string | null>(null)
  const [totalDurTimer, setTotalDurTimer] = useState<Date | null>(null)
  const totalProgress = useRef<Record<number, boolean>>(currentSession.exercise_id.reduce((acc, curr) => ({...acc, [curr]: false}), {}))
  const activeLiftForTimer = useRef<number | null>(null)
  const [progBar, setProgBar] = useState(0) // MAX VALUE 10
  const [selectedLift, setSelectedLift] = useState<{id: number, appearance: number}| null>(null)
  const [timer, setTimer] = useState<Date | null>(null)
  const [userLift, setUserLift] = useState<Record<number, {
    goalReps: string[], 
    progressReps: number[],
    goalWeight: number[],
    progressWeight: number[],
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
        goalReps: Object.values(program.repScheme[appearanceToTier(currentSession.exercise_id.indexOf(Number(curr)))][thisWeek] || {}).map(v => v), 
        progressReps: [],
        goalWeight: [],
        progressWeight: [],
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
    const previous = archive[thisYear][thisMonth][userTemplateInProgress as TemplatePrograms]
    const thisYearContent = archive[thisYear]
    const thisMonthContent = archive[thisYear][thisMonth]
    userContext.setKey('archive', {
      ...archive,
      [thisYear]: { ...thisYearContent, 
        [thisMonth]: {...thisMonthContent,
          [userTemplateInProgress as TemplatePrograms]: {...previous,
            [userSession.date!.toLocaleString()]: {...userSession, notes: '', totalDuration: totalDuration.current}
          }
        }
      }
    })
    localStorage.setItem('userContext', JSON.stringify(userContext.value))
  }

  function handleEndofWorkout() {
    userContext.setKey('lastDayAttempt', thisDay)
    userContext.setKey('lastWeekAttempt', thisWeek)
    userContext.setKey('lastMonthAttempt', thisMonth)
    userContext.setKey('lastYearAttempt', thisYear)
    userContext.setKey('lastEntryTitle', userSession.date!.toLocaleString())
    userContext.setKey('userSession', {day: null, week: null, month: null, year: null, totalDuration: 0, date: null, liftDataByID: {} })
    userContext.setKey('userLiftStatus', 'idle')
    saveToArchive()
    document.location.replace('/')
  }

  useEffect(() => {
    if(userLift) {
   if(userContext.get().userLiftStatus ==='lifting') {
     once(onceRef, () => setTotalDurTimer(new Date))
   } 
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
      setUserLift({...userLift, [selectedLift.id]: {...selected, goalReps: repsByTierAndWeek || []} })
    }
  }, [selectedLift])

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
                goalReps: string[], 
                goalWeight: number[], 
                progressReps: number[], 
                progressWeight: number[], 
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
          {userContext.get().userLiftStatus === 'lifting' ? <Timer timerStart={totalDurTimer} ref={totalDuration} /> : null}
          <ProgressBar progression={progBar} />

          {Object.values(totalProgress.current).every(v => v) ? (
            <div className="flex flex-col">
            Finished all workouts
            <button 
            onClick={() => handleEndofWorkout()}
            className="outline pointer-events-auto hover:outline-fuchsia-400 outline-fuchsia-500 text-fuchsia-500 p-2 rounded">Save to Log</button>
            </div>
          ) : null
          }
    <button className="outline rounded p-2" onClick={() => console.log(userContext.value)}>debug</button>
    </>
  )
}
