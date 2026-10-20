import { userContext } from "../../data/UserData"

export default function ModalLogReps(unmount: () => void, logRepFunc: (reps: number, weight?: number) => void) {
  let reps: number | null = null
  let inputWeight: number | null = null


  console.log(logRepFunc)
  console.log(userContext.value)
  
  return (
    <div>
    <h2>Log Reps</h2>
    <label>
      Reps done?
    </label>
    <input onChange={e => typeof e.target.valueAsNumber === 'number' ? reps = e.target.valueAsNumber : reps = null } type="number" min={0} className="outline outline-slate-300">
    </input>
    <label>
      Weight moved? (lbs)
    </label>
    <input placeholder="Leave blank for default weight" 
    onChange={e => typeof e.target.valueAsNumber === 'number' ? inputWeight = e.target.valueAsNumber : inputWeight = null } type="number" min={0} className="outline outline-slate-300">
    </input>
      <div className="flex w-full justify-center">
        <button type='button' onClick={() => unmount()} className="flex justify-center mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">force close</button>
        <button type='button' onClick={() => {
          if(Number.isNaN(reps) || Number.isNaN(inputWeight) && inputWeight !== null) return;
          if(typeof inputWeight === 'number' && typeof reps === 'number') {
            logRepFunc(reps, inputWeight)
            unmount()
          } else if(typeof reps === 'number' && inputWeight === null) {
            logRepFunc(reps)
            unmount()
          }
        }}
        className="flex justify-center mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Log</button>
      </div>
    </div>
  )
}
