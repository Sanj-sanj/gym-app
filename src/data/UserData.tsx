import { map, atom } from "nanostores"
import type { TemplatePrograms, TemplateProgramWeeks, TemplateDates } from "./workout-templates"

export type Months = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec' ;
export type Year = '2026' | '2027'

export type AppContext = {
  userName: string | null,
  lastWeekAttempt: TemplateProgramWeeks | null,
  lastDayAttempt: TemplateDates | null,
  lastYearAttempt: Year | null,
  lastEntryTitle: string | null,
  userTemplateInProgress: TemplatePrograms | null,
  userLiftStatus: 'not lifting' | 'lifting' | 'finished',
  modal: {
    activeDay: TemplateDates | null,
    entry: "edit lift" | 'new user' | 'log reps' | null,
    styleFunc: null | (() => void) | ((reps: number, weight?: number) => void) 
  },
  userWorkoutEntries: Record<number, {"5rm": number, upcycle: number}>,
  userSession: {
    day: null | TemplateDates,
    week: null |  TemplateProgramWeeks,
    year: null |  Year,
    month: null |  Months,
    liftDataByID: Record<number, {
      goalReps: string[],
      goalWeight: number[],
      progressReps: number[],
      progressWeight: number[],
      timeSpentLifting: string[],
      timeSpentResting: string[]
    }>,
    totalDuration: number,
    date: Date
  }
  archive: { 
    [T in TemplatePrograms]: Partial<Record<Year, Record<Months,
    Record<string, Record<number, {
      day: TemplateDates,
      week: TemplateProgramWeeks,
      liftDataByID: Record<number, {
        goalReps: string[],
        goalWeight: number[],
        progressReps: number[],
        progressWeight: number[],
        timeSpentLifting: string[],
        timeSpentResting: string[]
      }>,
    }>>>>>
  } 
}


const Initial: AppContext = {
  userName: null,
  lastWeekAttempt: null,
  lastDayAttempt: null,
  lastYearAttempt: null,
  lastEntryTitle: null,
  userLiftStatus: 'not lifting',
  userTemplateInProgress: null,
  modal: { activeDay: null, entry: null, styleFunc: null },
  userWorkoutEntries: {},
  userSession: {
    day: null,
    week: null,
    year: null,
    month: null,
    liftDataByID: {},
    totalDuration: 0,
    date: new Date()
  },
  archive: {
    ppl: {2026: {Jan: {}, Feb: {}, Mar: {}, Apr: {}, May: {}, Jun: {}, Jul: {}, Aug: {}, Sep: {}, Oct: {}, Nov: {}, Dec: {}}},
    531: {2026: {Jan: {}, Feb: {}, Mar: {}, Apr: {}, May: {}, Jun: {}, Jul: {}, Aug: {}, Sep: {}, Oct: {}, Nov: {}, Dec: {}}},
    fullbody: {2026: {Jan: {}, Feb: {}, Mar: {}, Apr: {}, May: {}, Jun: {}, Jul: {}, Aug: {}, Sep: {}, Oct: {}, Nov: {}, Dec: {}}},
  },
}
export const userContext = map(Initial)
export const isModalActive = atom(false)
export const isHamburgerMenu = atom(false)
