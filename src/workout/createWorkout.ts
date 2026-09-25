import { WorkoutType } from "../data/workouts";

export function createWorkout(workoutType: WorkoutType): Workout {
  return new Workout(workoutType);
}
