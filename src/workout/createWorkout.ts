/**
 * Creates a Workout object with all parameters from WorkoutType
 */
export function createWorkout(workoutType: WorkoutType): Workout {
  return new Workout(workoutType);
}
