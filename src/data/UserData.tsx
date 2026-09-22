import { map, atom } from "nanostores"
import type { TemplatePrograms, TemplateProgramWeeks, TemplateDates } from "./workout-templates"

export type AppContext = {
  userName: string | null,
  lastWeekAttempt: TemplateProgramWeeks | null,
  lastDayAttempt: TemplateDates | null,
  userTemplateInProgress: TemplatePrograms | null,
  workoutInProgress: boolean
  archivedPrograms: {[T in TemplatePrograms]: {
    daysCompleted: number,
    weeksCompleted: number,
    excersises: number[][]
  }},
} 

const Initial: AppContext = {
  userName: null,
  lastWeekAttempt: null,
  lastDayAttempt: null,
  userTemplateInProgress: null,
  archivedPrograms: {
    ppl: {
      daysCompleted: 0,
      weeksCompleted: 0,
      excersises: [[4,8,9,10,14],[4,8,9,10,14],[4,8,9,10,14],[4,8,9,10,14],[4,8,9,10,14],[4,8,9,10,14]]
    },
    531: {
      daysCompleted: 0,
      weeksCompleted: 0,
      excersises: [[4,8,9,10,14],[3,7,37,34,26],[2,19,11,18,15],[1,6,28,29,31]]
    },
    fullbody: {
      daysCompleted: 0,
      weeksCompleted: 0,
      excersises: [[4,8,9,10,14],[4,8,9,10,14],[4,8,9,10,14]]
    },
  },
  workoutInProgress: false,
}
export const userContext = map(Initial)
export const isModalActive = atom(false)
export const isHamburgerMenu = atom(false)
