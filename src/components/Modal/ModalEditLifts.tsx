import { userContext } from "../../data/UserData";
import type { WorkoutBuilderType } from "../../data/workouts";
import { WorkoutEntry } from "../../utils/createWorkout";

export default function ModalEditLifts(
  lifts: WorkoutBuilderType[], 
  unmount: () => void, 
) {
  const userEntries: Record<number, {'5rm': number, upcycle: number}> = {}

  function saveChanges() {
    const formInputs: WorkoutEntry[] = []
    console.log(userContext.value)
    console.log(userEntries)
    //this loop isnt really needed here now that we save to userContext
    for(const { name, description, uploadAmmount, id, img } of lifts) {
      if(!userEntries[id]) break; 
      const match = userEntries[id]
      formInputs.push(new WorkoutEntry(id, name, description, match["5rm"], match.upcycle, uploadAmmount, img))
    }
    if(formInputs.length === lifts.length) {
      const workoutEntries = userContext.get()['userWorkoutEntries']
      const setEditedTrue = userContext.get().modal.styleFunc;
      typeof setEditedTrue === 'function' ? setEditedTrue() : null;
      console.log('we get here')
      userContext.setKey('userWorkoutEntries', {...workoutEntries, ...userEntries}) 
      unmount()
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault() }>
      <h2 id='saveChanges' className="text-xl font-bold mb-4 text-center">Edit Lifts</h2>
      {lifts.map((lift) => (
        <div key={lift.id}>
          <h3 className="text-lg font-semibold ">{lift.name}</h3>  
          <div className="w-full flex flex-col">
            <label className="w-full flex justify-between mt-2">
              5 RM (In lbs): 
              <input name='5rm' inputMode="numeric"  contentEditable='false' step={1} min={1} onChange={(e) => userEntries[lift.id] = {"5rm": Number(e.target.value), upcycle: 0} } required={true} className="w-1/4 font-stretch-125% outline rounded text-right p-0.5 ml-3 outline-slate-900 appearance-auto" type="number"></input>
            </label>
            <label className="w-full flex justify-between mt-2">
              Upcycle: 
              <input name='5rm' min={0} defaultValue={0} onChange={(e) => userEntries[lift.id] = {...userEntries[lift.id], upcycle: Number(e.target.value)}} className="w-1/4 outline rounded text-right p-0.5 ml-3 outline-slate-900" type="number"></input>
            </label>
          </div>
        </div>
      ))}
      <div className="w-full flex justify-center">
        <button type='button' onClick={() => unmount()} className="flex justify-center mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Exit</button>
        <button type='submit' onClick={() => saveChanges()} className="flex justify-center mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 ml-3">Submit</button>
      </div>
    </form>
  )
}
