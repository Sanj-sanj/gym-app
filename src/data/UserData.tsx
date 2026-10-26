import { map, atom } from "nanostores"
import type { TemplatePrograms, TemplateProgramWeeks, TemplateDates } from "./workout-templates"

export type Months = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec' ;
export type Year = '2026' | '2027'

export type AppContext = {
  userName: string | null,
  lastWeekAttempt: TemplateProgramWeeks | null,
  lastDayAttempt: TemplateDates | null,
  lastMonthAttempt: Months | null,
  lastYearAttempt: Year | null,
  lastEntryTitle: string | null,
  userTemplateInProgress: TemplatePrograms | null,
  userLiftStatus: 'idle' | 'lifting',
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
    date: string | null,
  }
  archive: { 
    [T in Year] : {
      [M in Months]: Record<TemplatePrograms, ArchivedLift>
    }
  } 
}
export type ArchivedLift = Record<number, {
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
    }>

const Initial: AppContext = {
  userName: null,
  lastWeekAttempt: null,
  lastDayAttempt: null,
  lastMonthAttempt: null,
  lastYearAttempt: null,
  lastEntryTitle: null,
  userLiftStatus: 'idle',
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
    date: null,
  },
  archive: {
    2026: {
      Jan: { 531: {}, fullbody: {}, ppl: {} }, 
      Feb: { 531: {}, fullbody: {}, ppl: {} }, 
      Mar: { 531: {}, fullbody: {}, ppl: {} }, 
      Apr: { 531: {}, fullbody: {}, ppl: {} }, 
      May: { 531: {}, fullbody: {}, ppl: {} }, 
      Jun: { 531: {}, fullbody: {}, ppl: {} }, 
      Jul: { 531: {}, fullbody: {}, ppl: {} }, 
      Aug: { 531: {}, fullbody: {}, ppl: {} }, 
      Sep: { 531: {}, fullbody: {}, ppl: {} }, 
      Oct: { 531: {}, fullbody: {}, ppl: {} }, 
      Nov: { 531: {}, fullbody: {}, ppl: {} }, 
      Dec: { 531: {}, fullbody: {}, ppl: {} }
    },
    2027: {
      Jan: { 531: {}, fullbody: {}, ppl: {} }, 
      Feb: { 531: {}, fullbody: {}, ppl: {} }, 
      Mar: { 531: {}, fullbody: {}, ppl: {} }, 
      Apr: { 531: {}, fullbody: {}, ppl: {} }, 
      May: { 531: {}, fullbody: {}, ppl: {} }, 
      Jun: { 531: {}, fullbody: {}, ppl: {} }, 
      Jul: { 531: {}, fullbody: {}, ppl: {} }, 
      Aug: { 531: {}, fullbody: {}, ppl: {} }, 
      Sep: { 531: {}, fullbody: {}, ppl: {} }, 
      Oct: { 531: {}, fullbody: {}, ppl: {} }, 
      Nov: { 531: {}, fullbody: {}, ppl: {} }, 
      Dec: { 531: {}, fullbody: {}, ppl: {} }
    },
  },
}
export const userContext = map(Initial)
export const isModalActive = atom(false)
export const isHamburgerMenu = atom(false)
