import { useState } from "react"

export default function ProgressBar() {
  const [num, setNum] = useState(0)
   console.log(num)
  return (
    <>
      <div className="w-11/12 absolute bottom-1/13 rounded-3xl outline outline-mist-600">
        <div className={`bg-green-300 rounded-3xl ${num <= 0 ? "p-0" : "p-1"} rounded-3xl transition-all duration-1000 ease-in-out`} style={{width: Math.min(num * 10, 100) + '%'}}>
          <div className={`bg-green-400 rounded-2xl ${num <= 0 ? "p-0" : "p-1"}`}>
          </div>
        </div>
      </div>
      <button  onClick={() => setNum(num + .5)} className="outline-2 outline-cyan-600 p-3 rounded hover:outline-cyan-500">
      ProgressBar
      </button>
    </>
  ) 
}

