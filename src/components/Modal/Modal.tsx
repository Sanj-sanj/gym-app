import { useStore } from "@nanostores/react"
import { isModalActive } from "../../data/UserData"
import { useRef, useState } from "react"
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
  const $isModalActive = useStore(isModalActive)
  const nameInputRef = useRef<HTMLInputElement | null>(null)
  const [liftWeight, setLiftWeight] = useState<Record<string,{'5rm': string, uploadCount: number} >>({});
  const closeModal = () => isModalActive.set(!$isModalActive)

  return $isModalActive ? (
    <div id="modifyModal" className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        {
          useCase === 'new user' ?
          ModalNewUser(nameInputRef, closeModal) : 
          useCase === 'edit lift' ? 
          ModalEditLifts(workouts as WorkoutBuilderType[], closeModal, {liftWeight, setLiftWeight}) :
          <>someother cased</>
        }
      </div>
    </div>
  ) : null
}
