import { type ArchivedLift } from '../data/UserData.ts'

export default function Log({title, content, record}: {title: string, content: string, record: ArchivedLift}) {
  //record should hold the lifts name, users 5rm as of the date of record creation
  //also make it a record of Records that has all the lifts of a given workout day?
  return (
    <div className="animate-fade-in snap-center w-dvw flex basis-full grow-0 shrink-0 flex-col items-center justify-center p-2 bg-olive-50" >
      <h2 className="text-2xl font-bold text-center mb-4 text-slate-800">
        {title || "Logbook"}
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200 max-w-lg w-full">
        <p className="text-slate-600 mb-4">{content || "Enter your name"}</p>
        <button className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-900 transition-colors">
          Save Entry
        </button>
      </div>
    </div>
  )
}
