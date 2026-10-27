import { type RefObject } from "react";
import useTimer from "../utils/userTimer";

export function Timer({timerStart, ref, startValue = '0 seconds'}: {timerStart: Date | null, ref: null | RefObject<string | null>, startValue?: string}) {
  const { time } = useTimer({timerStart, ref, startValue})
  return (
    <span>
      {time}
    </span>
  )
}
