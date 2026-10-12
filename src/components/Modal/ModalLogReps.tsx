export default function ModalLogReps(unmount: () => void) {

  return (
    <div>
    hi
      <div>
        <button type='button' onClick={() => unmount()} className="flex justify-center mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Exit</button>
      </div>
    </div>
  )
}
