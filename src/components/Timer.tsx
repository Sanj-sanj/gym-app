import { formatDuration, intervalToDuration } from "date-fns";
import { useEffect, useState, type RefObject } from "react";

export function Timer({timerStart, ref, startValue = '0 seconds'}: {timerStart: Date | null, ref: null | RefObject<string | null>, startValue?: string}) {
  const [time, setTime] = useState<string>(startValue)

  useEffect(() => {
    if(!timerStart || !ref) return;
    const interval = setInterval(() => {
      const now = new Date()
      const durr = intervalToDuration({start: timerStart, end: now})
      setTime(formatDuration(durr))
    }, 1000)
    ref.current = time

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
