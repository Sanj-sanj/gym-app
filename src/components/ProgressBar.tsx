
export default function ProgressBar({progression}: {progression: number}) {
   console.log(progression)
  return (
    <>
      <div className="w-11/12 absolute bottom-1/13 rounded-3xl outline outline-mist-600">
        <div className={`bg-green-300 rounded-3xl ${progression <= 0 ? "p-0" : "p-1"} rounded-3xl transition-all duration-1000 ease-in-out`} style={{width: Math.min(progression * 10, 100) + '%'}}>
          <div className={`bg-green-400 rounded-2xl ${progression <= 0 ? "p-0" : "p-1"}`}>
          </div>
        </div>
      </div>
    </>
  ) 
}

