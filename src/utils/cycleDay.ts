import type { Months, Year } from '../data/UserData'
import { type TemplateDates, type TemplateProgramWeeks } from '../data/workout-templates'

export function cycleDay(prevDay?: TemplateDates) {
  if(!prevDay) return 'day1'
  const dates: TemplateDates[] = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6']
  let newInd = dates.findIndex(v => v === prevDay) + 1
  if(newInd > dates.length) newInd = 0 
  return dates[newInd] 
}
export function cycleWeek(prevWeek?: TemplateProgramWeeks) {
  if(!prevWeek) return 'w1'
  const weeks: TemplateProgramWeeks[] = ['w1', 'w2', 'w3', 'w4']
  let newInd = weeks.findIndex(v => v === prevWeek) + 1
  if(newInd > weeks.length) newInd = 0 
  return weeks[newInd] 
}
export function cycleYear(prevYear?: Year) {
  if(!prevYear) return new Date().getFullYear().toString() as Year
  const years: Year[] = ['2026', '2027']
  let newInd = years.findIndex(v => v === prevYear) + 1
  if(newInd > years.length) newInd = 0 
  return years[newInd] 
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
  if(!prevMonth) return months[mI]

  let newInd = months.findIndex(v => v === prevMonth) + 1
  if(newInd > months.length) newInd = 0 
  return months[newInd] 
}
