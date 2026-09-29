export class WorkoutEntry implements WorkoutType2 {
  liftName;
  rm5;
  description;
  uploadCount;
  uploadAmmount;
  exampleImage;
  trainingMaxRecord;
  id;
  constructor(id: number, enteredName: string, description: string, rm5: number, uploadCount:number, uploadAmmount: 5|10, exampleImage:string){
    this.liftName = enteredName
    this.id = id
    this.description = description, 
    this.rm5 = rm5, 
    this.uploadCount =uploadCount, 
    this.exampleImage = exampleImage,
    this.uploadAmmount = uploadAmmount
    this.trainingMaxRecord = 0
  }

  roundUpToFives(num: number) {
    return Math.ceil(Math.round(num / 5) * 5);
  }

  initialTrainingMax(){
    return this.rm5 * 0.9
  }
  Estimated1RM() {
    return this.rm5 * this.uploadAmmount * 0.333 + this.rm5;
  }
  currentTrainingMax() {
    return this.initialTrainingMax() + this.uploadAmmount * this.uploadCount;
  }
}


