import type { RefObject } from "react"
import { userContext } from "../../data/UserData"

export function ModalNewUser(ref:RefObject<HTMLInputElement | null>, unmount: () => void) {

  function handleNameConfirmation() {
    if(ref.current && !ref.current.value){ 
      ref.current.placeholder = "Pick a name"
      ref.current.focus()
    }
    else if(ref.current) {
      userContext.setKey('userName', ref.current.value)
      unmount()
    }
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-center">Write your name</h2>
      <label className="w-full flex justify-center">Name: 
        <input name='nameInput' ref={ref} className="outline rounded px-0.5 ml-3 outline-slate-900" ></input>
      </label>
      <div className="w-full flex justify-center">
        <button id="closeModal" onClick={() => handleNameConfirmation()} className="flex justify-center mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Submit</button>
      </div>
    </>
  )
}
