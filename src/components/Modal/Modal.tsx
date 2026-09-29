import { useStore } from "@nanostores/react"
import { isModalActive } from "../../data/UserData"
import { useRef, useState } from "react"
import type { WorkoutType } from "../../data/workouts"
import { WorkoutEntry } from "../../utils/createWorkut"
import { ModalNewUser } from "./ModalNewUser"

export default function Modal({useCase, workouts}: {useCase: 'new user' | 'edit lift', workouts?: WorkoutType[] | null}) {  
  const $isModalActive = useStore(isModalActive)
  const nameInputRef = useRef<HTMLInputElement | null>(null)
  const [liftWeight, setLiftWeight] = useState<Record<string,{'5rm': string, upcycle: string} >>({});

  const closeModal = () => isModalActive.set(!$isModalActive)

  const bench = new WorkoutEntry(2, 'bench', '', 155, 0, 5, 'palceholder', )
  console.log('hi',bench.initialTrainingMax())



  function editLiftsCase(lifts: WorkoutType[]) {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-xl font-bold mb-4 text-center">Edit Lifts</h2>
        {lifts.map((lift) => (
          <div key={lift.id}>
            <h3 className="text-lg font-semibold ">{lift.name}</h3>  
            <div className="w-full flex flex-col">
              <label className="w-full flex justify-between mt-2">
                5 RM: 
                <input name='5rm' step={5} min={0} onChange={(e) => setLiftWeight({...liftWeight, [lift.name]: {"5rm": e.target.value, upcycle: '0'} })} required={true} className="w-1/4 font-stretch-125% outline rounded text-right p-0.5 ml-3 outline-slate-900 appearance-auto" type="number"></input>
              </label>
              <label className="w-full flex justify-between mt-2">
                Upcycle: 
                <input name='5rm' min={0} defaultValue={0} onChange={(e) => setLiftWeight({...liftWeight, [lift.name]: {...liftWeight[lift.name], "upcycle": e.target.value} })} className="w-1/4 outline rounded text-right p-0.5 ml-3 outline-slate-900" type="number"></input>
              </label>
            </div>
          </div>
        ))}
        <div className="w-full flex justify-center">
          <button type='submit' id="closeModal" onClick={() => console.log(liftWeight)} className="flex justify-center mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Submit</button>
        </div>
      </form>
    )
  }
  return $isModalActive ? (
    <div id="modifyModal" className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        {useCase === 'new user' ? ModalNewUser(nameInputRef, closeModal) : useCase === 'edit lift' ? editLiftsCase(workouts as WorkoutType[]) : <>someother cased</>}
      </div>
    </div>
  ) : null
}
