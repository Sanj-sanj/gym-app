import { useStore } from "@nanostores/react"
import { isModalActive, userContext } from "../../data/UserData"
import { useRef } from "react"
import type { WorkoutBuilderType } from "../../data/workouts"
import { ModalNewUser } from "./ModalNewUser"
import  ModalEditLifts  from "./ModalEditLifts"
import ModalLogReps from "./ModalLogReps"

export default function Modal({
  useCase, 
  workouts, 
} : {
  useCase: 'new user', 
  workouts?: undefined,
} |
{
  useCase: | 'edit lift', 
  workouts: WorkoutBuilderType[] | null,
} |
{
  useCase: | 'log reps', 
  workouts?: undefined
}
) {  
  const $isModalActive = useStore(isModalActive)
  const nameInputRef = useRef<HTMLInputElement | null>(null)
  const closeModal = () => {
    userContext.setKey('modal', {activeDay: null, entry: null, styleFunc: null})
    isModalActive.set(false)
  }

  return $isModalActive ? ( 
    <div id="modifyModal" className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        {
          useCase === 'new user' ?
          ModalNewUser(nameInputRef, closeModal) : 
          useCase === 'edit lift' ? 
          ModalEditLifts(workouts as WorkoutBuilderType[], closeModal) :
          useCase === 'log reps' ?
          ModalLogReps(closeModal) :
          <>someother cased</>
        }
      </div>
    </div>
  ) : null
}
