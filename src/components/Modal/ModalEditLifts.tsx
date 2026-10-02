import { userContext } from "../../data/UserData";
import type { WorkoutBuilderType } from "../../data/workouts";
import { WorkoutEntry } from "../../utils/createWorkout";

export default function ModalEditLifts(
  lifts: WorkoutBuilderType[], 
  unmount: () => void, 
  { liftWeight, setLiftWeight }: 
  {
    liftWeight: Record<string, { '5rm': string; uploadCount: number; }>, 
    setLiftWeight: React.Dispatch<React.SetStateAction<Record<string, { '5rm': string; uploadCount: number; }>>>
  },
) {

  function saveChanges(e) {
    console.log(e)
    const setEditedTrue = userContext.get().modal.styleFunc;
    typeof setEditedTrue === 'function' ? setEditedTrue() : null;

    return lifts.map(({name, description, uploadAmmount, id, img }) => {
      const match = liftWeight[name]
      const entry = new WorkoutEntry(id, name, description, match["5rm"], match.uploadCount, uploadAmmount, img)
      return entry
    })
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h2 id='saveChanges' className="text-xl font-bold mb-4 text-center">Edit Lifts</h2>
      {lifts.map((lift) => (
        <div key={lift.id}>
          <h3 className="text-lg font-semibold ">{lift.name}</h3>  
          <div className="w-full flex flex-col">
            <label className="w-full flex justify-between mt-2">
              5 RM (In lbs): 
              <input name='5rm' step={5} min={0} onChange={(e) => setLiftWeight({...liftWeight, [lift.name]: {"5rm": e.target.value, uploadCount: 0} })} required={true} className="w-1/4 font-stretch-125% outline rounded text-right p-0.5 ml-3 outline-slate-900 appearance-auto" type="number"></input>
            </label>
            <label className="w-full flex justify-between mt-2">
              Upcycle: 
              <input name='5rm' min={0} defaultValue={0} onChange={(e) => setLiftWeight({...liftWeight, [lift.name]: {...liftWeight[lift.name], uploadCount: Number(e.target.value)} })} className="w-1/4 outline rounded text-right p-0.5 ml-3 outline-slate-900" type="number"></input>
            </label>
          </div>
        </div>
      ))}
      <div className="w-full flex justify-center">
        <button type='button' id="exitWithoutSave" onClick={() => unmount()} className="flex justify-center mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Exit</button>
        <button type='submit' id="saveChanges" onClick={(e) => console.log(saveChanges(e))} className="flex justify-center mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 ml-3">Submit</button>
      </div>
    </form>
  )
}
