import { useStore } from "@nanostores/react"
import { userContext, isModalActive } from "../data/UserData"
import { useRef, type RefObject } from "react"
import type { WorkoutType } from "../data/workouts"

export default function Modal({useCase, workouts}: {useCase: 'new user' | 'edit lift', workouts?: WorkoutType[] | null}) {  
  const $isModalActive = useStore(isModalActive)
  const nameInputRef = useRef<HTMLInputElement | null>(null)

  console.log($isModalActive)

  function handleNameCase(closeFunc: () => void) {
    if(nameInputRef.current && !nameInputRef.current.value){ 
      nameInputRef.current.placeholder = "Pick a name"
      nameInputRef.current.focus()
    }
    else if(nameInputRef.current) {
      const thisModal = document.querySelector('#modifyModal')
      console.log(thisModal)
      userContext.setKey('userName', nameInputRef.current.value)
      closeFunc()
    }
  }
  const closeModal = () => isModalActive.set(!$isModalActive)

  function newUserCase(ref:RefObject<HTMLInputElement | null>, ) {
    return (
      <>
        <h2 className="text-xl font-semibold mb-4 text-center">Write your name</h2>
        <label className="w-full flex justify-center">
          Name: 
          <input name='nameInput' ref={ref} className="outline rounded px-0.5 ml-3 outline-slate-900" ></input>
        </label>
        <div className="w-full flex justify-center">
          <button id="closeModal" onClick={() => handleNameCase(closeModal)} className="flex justify-center mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Submit</button>
        </div>
      </>
    )
  }

  function editLiftsCase(lifts: WorkoutType[]) {
    return (
      <>
        <h2 className="text-xl font-bold mb-4 text-center">Edit Lifts</h2>
        {lifts.map((lift) => (
          <div key={lift.id}>
            <h3 className="text-lg font-semibold ">{lift.name}</h3>  
            <div className="w-full flex flex-col">
              <label className="w-full flex justify-between">
                5 RM: 
                <input name='5rm' className="outline rounded px-0.5 ml-3 outline-slate-900" type="number"></input>
              </label>
              <label className="w-full flex justify-between">
                Upcycle: 
                <input name='5rm' className="outline rounded px-0.5 ml-3 outline-slate-900" type="number"></input>
              </label>
            </div>
          </div>
        ))}
        <div className="w-full flex justify-center">
          <button id="closeModal" onClick={() => closeModal()} className="flex justify-center mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Submit</button>
        </div>
      </>
    )
  }
  return $isModalActive ? (
    <div id="modifyModal" className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        {useCase === 'new user' ? newUserCase(nameInputRef) : useCase === 'edit lift' ? editLiftsCase(workouts as WorkoutType[]) : <>someother cased</>}
      </div>
    </div>
  ) : null
}
