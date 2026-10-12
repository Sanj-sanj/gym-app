import { formatDuration, intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";

export function Timer({timerStart, startValue = '0 seconds'}: {timerStart: Date | null, startValue?: string}) {
  const [time, setTime] = useState<string>(startValue)

  useEffect(() => {
    if(!timerStart) return;
    const interval = setInterval(() => {
      const now = new Date()
      const durr = intervalToDuration({start: timerStart, end: now})
      setTime(formatDuration(durr))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })

  return (
    <span>
      {time}
    </span>
  )
}
