import { useStore } from "@nanostores/react"
import { userContext, isModalActive } from "../data/UserData"
import { useRef } from "react"

export default function Modal({useCase}: {useCase: 'new user'}) {
  const $isModalActive = useStore(isModalActive)
  const nameInputRef = useRef<HTMLInputElement | null>(null)


  function closeModal() {
    if(nameInputRef.current && !nameInputRef.current.value){ 
      nameInputRef.current.placeholder = "Pick a name"
      nameInputRef.current.focus()
    }
    else if(nameInputRef.current) {
      userContext.setKey('userName', nameInputRef.current.value)
       isModalActive.set(!$isModalActive)
    }
  }

  function newUserCase() {
    return (
      <>
      <h2 className="text-xl font-semibold mb-4 text-center">Write your name</h2>
      <label className="w-full flex justify-center">
      Name: 
        <input name='nameInput' ref={nameInputRef} className="outline rounded px-0.5 ml-3 outline-slate-900" ></input>
      </label>
      </>
    )
  }

  return !$isModalActive ? (
    <div id="modifyModal" className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
    {useCase === 'new user' ? newUserCase() : null}
    <div className="w-full flex justify-center">
      <button id="closeModal" onClick={() => closeModal()} className="flex justify-center mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Submit</button>
    </div>
    </div>
    </div>
  ) : <></>
}
