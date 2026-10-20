import type { Months, Year } from '../data/UserData'
import { type TemplateDates, type TemplateProgramWeeks } from '../data/workout-templates'

export function cycleDay(programDays?: TemplateDates[], prevDay?: TemplateDates | null) {
  if(!prevDay) return 'day1'
  const dates: TemplateDates[] = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6']
  let newInd = dates!.indexOf(prevDay) + 1
  console.log(programDays, prevDay)
  if(newInd >= programDays!.length) newInd = 0 
  return dates![newInd] 
}
export function cycleWeek(
  prevWeek?: TemplateProgramWeeks | null,
  prevDay?: TemplateDates | null,
  programWeeks?: TemplateProgramWeeks[],
  programDays?: TemplateDates[] | null,
) {
  if(!prevWeek || !prevDay || !programDays || !programWeeks) return 'w1'
  const weeks: TemplateProgramWeeks[] = ['w1', 'w2', 'w3', 'w4']

  if(programDays.indexOf(prevDay) === programDays.length - 1) {
    let newWeekIndex = programWeeks.indexOf(prevWeek) + 1
    if(newWeekIndex >= programWeeks.length) return 'w1'
    return programWeeks[newWeekIndex]
  }
  return prevWeek
}
function isLastDayofProgram(programDays: TemplateDates[], date: TemplateDates) {
  if(!programDays || !date) return false
  if(programDays.indexOf(date) === programDays.length - 1) return true
  return false
}

export function cycleYear(prevYear?: Year) {
  const thisYear = new Date().getFullYear().toString() as Year
  if(!prevYear || prevYear !== thisYear) return thisYear
  return prevYear
}

  const months: Months[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
  
export function cycleMonth(prevMonth?: Months) {
  const mI = new Date().getMonth()
  if(!prevMonth || prevMonth !== months[mI]) return months[mI]
  return prevMonth
}
