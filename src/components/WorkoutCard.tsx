
// import type { WorkoutType} from "../data/workouts";
//this file needs the older workout type to display all the correct info

import type { WorkoutBuilderType } from "../data/workouts";
import { WorkoutEntry } from "../utils/createWorkout";

export default function WorkoutCard({ workout, isSelected, repScheme, onSelect }: {
  workout: WorkoutEntry | WorkoutBuilderType,
  isSelected: boolean,
  repScheme?: {reps: string[], percents: number[]},
  onSelect: (id: number) => void
}) {
  console.log(workout, repScheme)
  return (
    <div className={`transition-all duration-300 delay-700 ${isSelected ? 'w-10/12 sm:w-96 mx-auto mt-8' : 'w-64 mx-2 my-4'}`}> 
      <button
        title="Click/tap to preview"
        onClick={!isSelected ? () => onSelect(workout.id) : () => {}}
        className={`w-full p-4 rounded ${isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
      >
        {workout.name}
      </button>

      {workout instanceof WorkoutEntry && isSelected ? (
        <>
          <div className="text-center mt-4 p-4 bg-white rounded shadow relative">
            <h3 className="text-xl font-bold">{workout.name}</h3>

            <p>Current training max: {workout.currentTrainingMax()} lbs</p>
            <p>Initial 5 rep max: {workout.rm5} lbs</p>
            <h4 className="font-bold">Rep Scheme:</h4>

            <ol>
            {repScheme?.reps.map((n,i)=> (
              <li key={i} className='grid grid-cols-3'>
              <span className="text-left">Set {i+1}: {n}</span> <span>{repScheme.percents[i]}%</span> <span>{Math.round(Math.ceil(workout["current-training-max"] * (repScheme.percents[i] * .01) / 5)) * 5} lbs</span>
              </li>
            ))
            } 
            </ol>
            <img
              src={workout.image}
              alt={workout.name + ' img'}
              className="w-full h-48 object-cover rounded mt-2"
            />
            <p className="mt-2 text-gray-700">{workout.description}</p>
          </div>
        <div className="flex justify-center">
      <button onClick={() => onSelect(workout.id)} className='px-4 py-2 border mt-2 border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 transition-colors'>
      Exercises
      </button> 
        </div>
        </>
      ): null}
    </div>

  );
}
