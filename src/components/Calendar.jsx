import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameDay, getYear } from 'date-fns';

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const days = eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) });
  const startDay = startOfMonth(currentMonth).getDay(); // 0 Sunday
  const emptyCells = Array.from({ length: startDay }, () => null);
  const allDays = [...emptyCells, ...days];

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex flex-col items-center mb-4"><h2 className="text-xl font-bold mb-2">Calendar</h2>
        <div className="flex items-center space-x-2 mb-2">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 12))} className="p-2 bg-gray-200 rounded">Prev Year</button>
          <button title="Reset to nearest year" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1))} className="p-2 bg-gray-200 rounded">{format(currentMonth, 'yyyy')}</button>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 12))} className="p-2 bg-gray-200 rounded">Next Year</button>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 bg-gray-200 rounded">Prev</button>
          <select
            value={currentMonth.getMonth()}
            onChange={e => setCurrentMonth(new Date(currentMonth.getFullYear(), parseInt(e.target.value), 1))}
            className="p-2 border rounded"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>{format(new Date(currentMonth.getFullYear(), i, 1), 'MMMM')}</option>
            ))}
          </select>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 bg-gray-200 rounded">Next</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {allDays.map((day, idx) => (
          <div key={idx} className={`p-2 text-center ${day && isSameDay(day, today) ? 'bg-blue-500 text-white rounded' : ''}`}>{day ? format(day, 'd') : ''}</div>
        ))}
      </div>
    </div>
  );
}
