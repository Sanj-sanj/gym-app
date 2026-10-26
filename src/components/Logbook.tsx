import Log from "./Log";
import { userContext, type Months, type Year } from "../data/UserData";
import { addMonths, format, subMonths } from "date-fns";
import { useState } from "react";

export default function LogBook() {
  const { archive, userSession, lastYearAttempt, lastMonthAttempt, lastDayAttempt, lastWeekAttempt  } = userContext.get();
  const [currentMonth, setCurrentMonth] = useState(new Date())   
  const formattedMonth = format(currentMonth, 'MMMM') as Months
  const formattedYear = format(currentMonth, 'yyyy') as Year

  if(!archive) return 
  console.log(archive)
  return (
    <div>
      <div className="flex justify-center items-center mb-2 space-x-2">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 outline hover:outline-indigo-600 hover:bg-indigo-300 outline-indigo-400 bg-indigo-200 rounded">Prev</button>
          <button onClick={() => setCurrentMonth(new Date())} className="min-w-[14ch]">
            {formattedMonth} {formattedYear}
          </button>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 outline hover:outline-indigo-600 hover:bg-indigo-300 outline-indigo-400 bg-indigo-200 rounded">Next</button>
      </div>
      <div className="flex w-dvw snap-x snap-mandatory gap-8 overflow-scroll justify-start p-8">
      {Object.entries(archive[formattedYear]['Oct']).map(([program, entry]) => {
        return (
          <div>
          <Log title={program} content='lo' record={entry}/>
          </div>
        )
      })}
      </div>
    </div>
  )
} 
