import { WorkoutType } from './workouts';

/**
 * Creates a Workout object with all parameters from WorkoutType
 */
export class Workout {
  id: string;
  name: string;
  currentTrainingMax: number;
  uploadCycleCount: number;
  repRecord: number;
  repRecordDate: string;
  "5rm": number;
  est1RM: number;
  initialTrainingMax: number;
  uploadAmount: number;
  description: string;
  img: string;

  constructor(workoutType: WorkoutType) {
    this.id = workoutType.id;
    this.name = workoutType.name;
    this.currentTrainingMax = workoutType.currentTrainingMax;
    this.uploadCycleCount = workoutType.uploadCycleCount;
    this.repRecord = workoutType.repRecord;
    this.repRecordDate = workoutType.repRecordDate;
    this.["5rm"] = workoutType.["5rm"]
    this.est1RM = workoutType.est1RM;
    this.initialTrainingMax = workoutType.initialTrainingMax;
    this.uploadAmount = workoutType.uploadAmount;
    this.description = workoutType.description;
    this.img = workoutType.img;
  }
}
