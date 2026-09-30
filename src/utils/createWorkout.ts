type WorkoutClass = {
  liftName: string
  rm5: number
  description: string
  uploadCount: number
  uploadAmmount: 5 | 10
  exampleImage: string
  trainingMaxRecord: number
  id: number
  img: string
}
export class WorkoutEntry {
  trainingMaxRecord: number = 0;
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public rm5: number, 
    public uploadCount: number, 
    public uploadAmmount: 5 | 10, 
    public img: string
  ){
    this.name = name
    this.id = id
    this.description = description, 
    this.rm5 = rm5, 
    this.img = img,
    this.uploadCount =uploadCount, 
    this.uploadAmmount = uploadAmmount
  }

  roundUpToFives(num: number) {
    return Math.ceil(Math.round(num / 5) * 5);
  }

  initialTrainingMax(){
    return this.rm5 * 0.9
  }
  est1RM() {
    return this.rm5 * this.uploadAmmount * 0.333 + this.rm5;
  }
  currentTrainingMax() {
    return this.initialTrainingMax() + this.uploadAmmount * this.uploadCount;
  }
}


