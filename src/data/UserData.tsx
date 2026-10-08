import { map, atom } from "nanostores"
import type { TemplatePrograms, TemplateProgramWeeks, TemplateDates } from "./workout-templates"
import type { WorkoutEntry } from "../utils/createWorkout"

export type AppContext = {
  userName: string | null,
  lastWeekAttempt: TemplateProgramWeeks | null,
  lastDayAttempt: TemplateDates | null,
  userTemplateInProgress: TemplatePrograms | null,
  modal: {
    activeDay: TemplateDates | null,
    entry: "edit lift" | 'new user' | null,
    styleFunc: null | (() => void) 
  },
  userWorkoutEntries: Record<number, {"5rm": number, upcycle: number}>,
  archivedPrograms: {
    [T in TemplatePrograms]: {
      daysCompleted: number,
      weeksCompleted: number,
      excersises: Partial<Record<TemplateDates, WorkoutEntry[]>>,
      inProgress: boolean,
    }
  } 
}

const Initial: AppContext = {
  userName: null,
  lastWeekAttempt: null,
  lastDayAttempt: null,
  userTemplateInProgress: null,
  modal: { activeDay: null, entry: null, styleFunc: null },
  userWorkoutEntries: {},
  archivedPrograms: {
    ppl: {
      daysCompleted: 0,
      inProgress: false,
      excersises: { day1: [] },
      weeksCompleted: 0,
    },
    531: {
      daysCompleted: 0,
      weeksCompleted: 0,
      inProgress: false,
      excersises: { day1: [] },
    },
    fullbody: {
      daysCompleted: 0,
      weeksCompleted: 0,
      inProgress: false,
      excersises: { day1: [] },
    },
  },
}
export const userContext = map(Initial)
export const isModalActive = atom(false)
export const isHamburgerMenu = atom(false)
