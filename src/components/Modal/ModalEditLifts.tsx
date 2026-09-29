import { useState } from "react";
import type { WorkoutType } from "../../data/workouts";

  export default function ModalEditLifts(lifts: WorkoutType[]) {
  const [liftWeight, setLiftWeight] = useState<Record<string,{'5rm': string, upcycle: string} >>({});
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
