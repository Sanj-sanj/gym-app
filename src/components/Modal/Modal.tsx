import { useStore } from "@nanostores/react"
import { isModalActive, userContext } from "../../data/UserData"
import { useRef } from "react"
import type { WorkoutBuilderType } from "../../data/workouts"
import { ModalNewUser } from "./ModalNewUser"
import  ModalEditLifts  from "./ModalEditLifts"

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
}
) {  
  console.log('where am i')
  const $isModalActive = useStore(isModalActive)
  const nameInputRef = useRef<HTMLInputElement | null>(null)
  const closeModal = () => {
    console.log('hi')
    userContext.setKey('modal', {activeDay: null, entry: null, styleFunc: null})
    isModalActive.set(false)
  }

  console.log($isModalActive)
  return $isModalActive ? ( 

    <div id="modifyModal" className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        {
          useCase === 'new user' ?
          ModalNewUser(nameInputRef, closeModal) : 
          useCase === 'edit lift' ? 
          ModalEditLifts(workouts as WorkoutBuilderType[], closeModal) :
          <>someother cased</>
        }
      </div>
    </div>
  ) : null
}
