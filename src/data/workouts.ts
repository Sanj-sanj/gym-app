export type WorkoutType = {
    id: string,
    name: string,
    "current-training-max": number,
    "upload-cycle-count": number,
    "rep-record": number,
    "rep-record-date": string,
    "5rm": number,
    "est1RM": number ,
    "initial-training-max": number,
    "upload-ammount": number,
    description: string,
    img: string
  };

  const workouts2 = {
  "1": {
    "liftName": "Squat",
    "rm5": 0,
    "description": "squat description",
    "uploadCount": 0,
    "uploadAmmount": 10,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "2": {
    "liftName": "Bench",
    "rm5": 0,
    "description": "bench description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "3": {
    "liftName": "Deadlift",
    "rm5": 0,
    "description": "deadlift description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "4": {
    "liftName": "Press",
    "rm5": 0,
    "description": "press description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "5": {
    "liftName": "Incline Press",
    "rm5": 0,
    "description": "incline press description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "6": {
    "liftName": "Front Squat",
    "rm5": 0,
    "description": "front squat description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "7": {
    "liftName": "Stiff Leg Deadlift",
    "rm5": 0,
    "description": "stiff leg deadlift description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "8": {
    "liftName": "Close Grip Bench",
    "rm5": 0,
    "description": "close grip bench description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "9": {
    "liftName": "Barbell Row",
    "rm5": 0,
    "description": "barbell row description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "10": {
    "liftName": "Lat Pulldown",
    "rm5": 0,
    "description": "lat pulldown description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "11": {
    "liftName": "Reverse Grip Pulldown",
    "rm5": 0,
    "description": "reverse grip pulldown description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "12": {
    "liftName": "Dips",
    "rm5": 0,
    "description": "dips description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "13": {
    "liftName": "Chin Ups",
    "rm5": 0,
    "description": "chin ups description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "14": {
    "liftNamE": "Barbell Curl",
    "rm5": 0,
    "description": "barbell curl description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "15": {
    "liftName": "Skullcrushers",
    "rm5": 0,
    "description": "skullcrushers description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "16": {
    "liftName": "DB Press",
    "rm5": 0,
    "description": "DB press description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "17": {
    "liftName": "DB Bench",
    "rm5": 0,
    "description": "DB bench description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "18": {
    "liftName": "DB Rows",
    "rm5": 0,
    "description": "DB rows description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "19": {
    "liftName": "DB Incline",
    "rm5": 0,
    "description": "DB incline description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "20": {
    "liftName": "Tricep Pushdown",
    "rm5": 0,
    "description": "tricep pushdown description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "21": {
    "liftName": "Face Pulls",
    "rm5": 0,
    "description": "face pulls description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "22": {
    "liftName": "Seated Rows",
    "rm5": 0,
    "description": "seated rows description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "23": {
    "liftName": "Wrist Curls",
    "rm5": 0,
    "description": "wrist curls description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "24": {
    "liftName": "Shrugs",
    "rm5": 0,
    "description": "shrugs description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "25": {
    "liftName": "Good Morning",
    "rm5": 0,
    "description": "good morning description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "26": {
    "liftName": "Back Raises",
    "rm5": 0,
    "description": "back raises description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "27": {
    "liftName": "Reverse Hypers",
    "rm5": 0,
    "description": "reverse hypers description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "28": {
    "liftName": "Leg Curls",
    "rm5": 0,
    "description": "leg curls description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "29": {
    "liftName": "Leg Extensions",
    "rm5": 0,
    "description": "leg extensions description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "30": {
    "liftName": "Calf Raises",
    "rm5": 0,
    "description": "calf raises description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "31": {
    "liftName": "Romainian Deadlifts",
    "rm5": 0,
    "description": "romainian deadlifts description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "32": {
    "liftName": "Box Squats",
    "rm5": 0,
    "description": "box squats description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "33": {
    "liftName": "Lunges",
    "rm5": 0,
    "description": "lunges description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "34": {
    "liftName": "Crunches",
    "rm5": 0,
    "description": "crunches description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "35": {
    "liftName": "Leg Raises",
    "rm5": 0,
    "description": "leg raises description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "36": {
    "liftName": "Hack Squat",
    "rm5": 0,
    "description": "hack squat description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "37": {
    "liftName": "Leg Press",
    "rm5": 0,
    "description": "leg press description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  },
  "38": {
    "liftName": "DB Side Bends",
    "rm5": 0,
    "description": "DB side bends description",
    "uploadCount": 0,
    "uploadAmmount": 5,
    "exampleImage": "placeholder.png",
    "trainingMaxRecord": 0
  }
}
 
export const workouts: WorkoutType[] = [
  {
    id: '1',
    name: 'squat',
    "upload-ammount": 10,
    description: 'squat description',
    img: 'placeholder'
  },
  {
    id: '2',
    name: 'bench',
    "current-training-max": 182.72675,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'bench description',
    img: 'placeholder'
  },
  {
    id: '3',
    name: 'deadlift',
    "current-training-max": 295.71775,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'deadlift description',
    img: 'placeholder'
  },
  {
    id: '4',
    name: 'press',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'press description',
    img: 'placeholder'
  },
  {
    id: '5',
    name: 'incline press',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'incline press description',
    img: 'placeholder'
  },
  {
    id: '6',
    name: 'front squat',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'front squat description',
    img: 'placeholder'
  },
  {
    id: '7',
    name: 'stiff leg deadlift',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'stiff leg deadlift description',
    img: 'placeholder'
  },
  {
    id: '8',
    name: 'close grip bench',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'close grip bench description',
    img: 'placeholder'
  },
  {
    id: '9',
    name: 'barbell row',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'barbell row description',
    img: 'placeholder'
  },
  {
    id: '10',
    name: 'lat pulldown',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'lat pulldown description',
    img: 'placeholder'
  },
  {
    id: '11',
    name: 'reverse grip pulldown',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'reverse grip pulldown description',
    img: 'placeholder'
  },
  {
    id: '12',
    name: 'dips',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'dips description',
    img: 'placeholder'
  },
  {
    id: '13',
    name: 'chin ups',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'chin ups description',
    img: 'placeholder'
  },
  {
    id: '14',
    name: 'barbell curl',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'barbell curl description',
    img: 'placeholder'
  },
  {
    id: '15',
    name: 'skullcrushers',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'skullcrushers description',
    img: 'placeholder'
  },
  {
    id: '16',
    name: 'DB press',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'DB press description',
    img: 'placeholder'
  },
  {
    id: '17',
    name: 'DB bench',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'DB bench description',
    img: 'placeholder'
  },
  {
    id: '18',
    name: 'DB rows',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'DB rows description',
    img: 'placeholder'
  },
  {
    id: '19',
    name: 'DB incline',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'DB incline description',
    img: 'placeholder'
  },
  {
    id: '20',
    name: 'tricep pushdown',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'tricep pushdown description',
    img: 'placeholder'
  },
  {
    id: '21',
    name: 'face pulls',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'face pulls description',
    img: 'placeholder'
  },
  {
    id: '22',
    name: 'seated rows',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'seated rows description',
    img: 'placeholder'
  },
  {
    id: '23',
    name: 'wrist curls',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'wrist curls description',
    img: 'placeholder'
  },
  {
    id: '24',
    name: 'shrugs',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'shrugs description',
    img: 'placeholder'
  },
  {
    id: '25',
    name: 'good morning',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'good morning description',
    img: 'placeholder'
  },
  {
    id: '26',
    name: 'back raises',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'back raises description',
    img: 'placeholder'
  },
  {
    id: '27',
    name: 'reverse hypers',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'reverse hypers description',
    img: 'placeholder'
  },
  {
    id: '28',
    name: 'leg curls',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'leg curls description',
    img: 'placeholder'
  },
  {
    id: '29',
    name: 'leg extensions',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'leg extensions description',
    img: 'placeholder'
  },
  {
    id: '30',
    name: 'calf raises',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'calf raises description',
    img: 'placeholder'
  },
  {
    id: '31',
    name: 'romainian deadlifts',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'romainian deadlifts description',
    img: 'placeholder'
  },
  {
    id: '32',
    name: 'box squats',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'box squats description',
    img: 'placeholder'
  },
  {
    id: '33',
    name: 'lunges',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'lunges description',
    img: 'placeholder'
  },
  {
    id: '34',
    name: 'crunches',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'crunches description',
    img: 'placeholder'
  },
  {
    id: '35',
    name: 'leg raises',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'leg raises description',
    img: 'placeholder'
  },
  {
    id: '36',
    name: 'hack squat',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'hack squat description',
    img: 'placeholder'
  },
  {
    id: '37',
    name: 'leg press',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'leg press description',
    img: 'placeholder'
  },
  {
    id: '38',
    name: 'DB side bends',
    "current-training-max": 175,
    "upload-cycle-count": 1,
    "rep-record": 5,
    "rep-record-date": "09-14-26",
    "5rm": 155,
    "est1RM": 180,
    "initial-training-max": 162,
    "upload-ammount": 10,
    description: 'DB side bends description',
    img: 'placeholder'
  }
];

const workouts4 = [
  {
    "id": "1",
    "name": "squat",
    "description": "squat description",
    "upload-ammount": 10
  },
  {
    "id": "2",
    "name": "bench",
    "description": "bench description",
    "upload-ammount": 10
  },
  {
    "id": "3",
    "name": "deadlift",
    "description": "deadlift description",
    "upload-ammount": 10
  },
  {
    "id": "4",
    "name": "press",
    "description": "press description",
    "upload-ammount": 10
  },
  {
    "id": "5",
    "name": "incline press",
    "description": "incline press description",
    "upload-ammount": 10
  },
  {
    "id": "6",
    "name": "front squat",
    "description": "front squat description",
    "upload-ammount": 10
  },
  {
    "id": "7",
    "name": "stiff leg deadlift",
    "description": "stiff leg deadlift description",
    "upload-ammount": 10
  },
  {
    "id": "8",
    "name": "close grip bench",
    "description": "close grip bench description",
    "upload-ammount": 10
  },
  {
    "id": "9",
    "name": "barbell row",
    "description": "barbell row description",
    "upload-ammount": 10
  },
  {
    "id": "10",
    "name": "lat pulldown",
    "description": "lat pulldown description",
    "upload-ammount": 10
  },
  {
    "id": "11",
    "name": "reverse grip pulldown",
    "description": "reverse grip pulldown description",
    "upload-ammount": 10
  },
  {
    "id": "12",
    "name": "dips",
    "description": "dips description",
    "upload-ammount": 10
  },
  {
    "id": "13",
    "name": "chin ups",
    "description": "chin ups description",
    "upload-ammount": 10
  },
  {
    "id": "14",
    "name": "barbell curl",
    "description": "barbell curl description",
    "upload-ammount": 10
  },
  {
    "id": "15",
    "name": "skullcrushers",
    "description": "skullcrushers description",
    "upload-ammount": 10
  },
  {
    "id": "16",
    "name": "DB press",
    "description": "DB press description",
    "upload-ammount": 10
  },
  {
    "id": "17",
    "name": "DB bench",
    "description": "DB bench description",
    "upload-ammount": 10
  },
  {
    "id": "18",
    "name": "DB rows",
    "description": "DB rows description",
    "upload-ammount": 10
  },
  {
    "id": "19",
    "name": "DB incline",
    "description": "DB incline description",
    "upload-ammount": 10
  },
  {
    "id": "20",
    "name": "tricep pushdown",
    "description": "tricep pushdown description",
    "upload-ammount": 10
  },
  {
    "id": "21",
    "name": "face pulls",
    "description": "face pulls description",
    "upload-ammount": 10
  },
  {
    "id": "22",
    "name": "seated rows",
    "description": "seated rows description",
    "upload-ammount": 10
  },
  {
    "id": "23",
    "name": "wrist curls",
    "description": "wrist curls description",
    "upload-ammount": 10
  },
  {
    "id": "24",
    "name": "shrugs",
    "description": "shrugs description",
    "upload-ammount": 10
  },
  {
    "id": "25",
    "name": "good morning",
    "description": "good morning description",
    "upload-ammount": 10
  },
  {
    "id": "26",
    "name": "back raises",
    "description": "back raises description",
    "upload-ammount": 10
  },
  {
    "id": "27",
    "name": "reverse hypers",
    "description": "reverse hypers description",
    "upload-ammount": 10
  },
  {
    "id": "28",
    "name": "leg curls",
    "description": "leg curls description",
    "upload-ammount": 10
  },
  {
    "id": "29",
    "name": "leg extensions",
    "description": "leg extensions description",
    "upload-ammount": 10
  },
  {
    "id": "30",
    "name": "calf raises",
    "description": "calf raises description",
    "upload-ammount": 10
  },
  {
    "id": "31",
    "name": "romainian deadlifts",
    "description": "romainian deadlifts description",
    "upload-ammount": 10
  },
  {
    "id": "32",
    "name": "box squats",
    "description": "box squats description",
    "upload-ammount": 10
  },
  {
    "id": "33",
    "name": "lunges",
    "description": "lunges description",
    "upload-ammount": 10
  },
  {
    "id": "34",
    "name": "crunches",
    "description": "crunches description",
    "upload-ammount": 10
  },
  {
    "id": "35",
    "name": "leg raises",
    "description": "leg raises description",
    "upload-ammount": 10
  },
  {
    "id": "36",
    "name": "hack squat",
    "description": "hack squat description",
    "upload-ammount": 10
  },
  {
    "id": "37",
    "name": "leg press",
    "description": "leg press description",
    "upload-ammount": 10
  },
  {
    "id": "38",
    "name": "DB side bends",
    "description": "DB side bends description",
    "upload-ammount": 10
  }
] 
