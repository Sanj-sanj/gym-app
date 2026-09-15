//import { useState } from 'react';

export default function WorkoutCard({ workout, isSelected, onSelect }) {
  console.log('workou card', workout)
  return (
    <div className={`transition-all duration-300 ${isSelected ? 'w-full max-w-md mx-auto mt-8' : 'w-64 mx-2 my-4'}`}> 
      <button
        onClick={() => onSelect(workout.id)}
        className={`w-full p-4 rounded ${isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
      >
        {workout.name}
      </button>
      {isSelected && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <h3 className="text-xl font-bold">{workout.name}</h3>
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-48 object-cover rounded mt-2"
          />
          <p className="mt-2 text-gray-700">{workout.description}</p>
        </div>
      )}
    </div>
  );
}
