
export default function Log({title, content}: {title: string, content: string}) {
  return (
    <div
      className="animate-fade-in"
      style={{
        height: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backgroundColor: "#f9f9f9"
      }}
    >
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
