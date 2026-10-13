import { userContext } from "../../data/UserData"

export default function ModalLogReps(unmount: () => void, logRepFunc: (reps: number) => void) {
  let reps: number | null = null

  console.log(userContext.value)
  
  return (
    <div>
    <h2>Log Reps</h2>
    <label>
      How many reps did you do?
    </label>
    <input onChange={e => typeof e.target.valueAsNumber === 'number' ? reps = e.target.valueAsNumber : reps = null } type="number" min={0} className="outline outline-slate-300">
    </input>
      <div className="flex w-full justify-center">
        <button type='button' onClick={() => unmount()} className="flex justify-center mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">force close</button>
        <button type='button' onClick={() => {
          Number.isNaN(reps) || typeof reps !== 'number' ? null : (logRepFunc(reps), unmount())
        }}
        className="flex justify-center mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Log</button>
      </div>
    </div>
  )
}
