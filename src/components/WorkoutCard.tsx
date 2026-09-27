import type { WorkoutType } from "../data/workouts";

export default function WorkoutCard({ workout, isSelected, repScheme, onSelect }: {
  workout: WorkoutType,
  isSelected: boolean,
  repScheme?: {reps: string[], percents: number[]},
  onSelect: (id: string) => void
}) {
  console.log(workout, repScheme)
  return (
    <div className={`transition-all duration-300 delay-700 ${isSelected ? 'w-10/12 sm:w-96 mx-auto mt-8' : 'w-64 mx-2 my-4'}`}> 
      <button
        onClick={!isSelected ? () => onSelect(workout.id) : () => {}}
        className={`w-full p-4 rounded ${isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
      >
        {workout.name}
      </button>
      {isSelected && (
        <>
          <div className="text-center mt-4 p-4 bg-white rounded shadow">
            <h3 className="text-xl font-bold">{workout.name}</h3>
            Rep Scheme: {" "}
            <ol>
            {repScheme?.reps.map((n,i)=> (
              <li key={i} className='grid grid-cols-3'>
              <span className="text-left">Set {i+1}: {n}</span> <span>{repScheme.percents[i]}%</span> <span>{Math.round(Math.ceil(workout["current-training-max"] * (repScheme.percents[i] * .01) / 5)) * 5}</span>
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
      )}
    </div>
  );
}
