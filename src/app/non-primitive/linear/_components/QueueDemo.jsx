'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function explainQueue() {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-left text-sm text-gray-700 space-y-3">
      <button
        onClick={() => setOpen(!open)}
        className="text-green-700 font-semibold hover:underline mb-2"
      >
        {open ? 'Hide Explanation ▲' : 'Show Explanation ▼'}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
      <p>
        This demo simulates a functional <span className="font-semibold text-green-600">Queue</span> data structure with animated enqueue and dequeue operations:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li><span className="font-medium">📥 Enqueue:</span> Adds an element to the rear using array spreading to simulate <code>.push()</code>.</li>
        <li><span className="font-medium">📤 Dequeue:</span> Removes the element from the front using <code>.slice(1)</code>, maintaining FIFO behavior.</li>
        <li><span className="font-medium">📍 Labels:</span> Front and Rear are clearly labeled to visualize entry and exit points.</li>
        <li><span className="font-medium">🚫 Overflow:</span> Prevents adding beyond a maximum size of 5 and displays a warning.</li>
        <li><span className="font-medium">🔁 Reset:</span> Clears all elements and resets the queue state.</li>
      </ul>
      <p>
        Built with <code>React state</code> and <span className="font-semibold text-purple-600">Framer Motion</span> animations, this demo helps visualize how a queue operates in real-time.
      </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


export default function QueueDemo() {
  const [queue, setQueue] = useState([10, 20, 30]);
  const [input, setInput] = useState('');
  const MAX_SIZE = 5;

  const enqueue = () => {
    if (queue.length >= MAX_SIZE) return;
    if (input.trim()) {
      setQueue([...queue, parseInt(input)]);
      setInput('');
    }
  };

  const dequeue = () => {
    setQueue((prev) => prev.slice(1));
  };

  const resetQueue = () => {
    setQueue([]);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border px-2 py-1 rounded text-sm w-28 bg-white text-gray-800 placeholder-gray-400"
          placeholder="Enqueue value"
        />
        <button
          onClick={enqueue}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
        >
          Enqueue
        </button>
        <button
          onClick={dequeue}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Dequeue
        </button>
        <button
          onClick={resetQueue}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
        >
          Reset
        </button>
      </div>

      {queue.length >= MAX_SIZE && (
        <div className="text-center text-sm text-red-600 font-medium mb-2">
          Queue Overflow! Maximum size of 5 reached.
        </div>
      )}

      <div className="relative w-full overflow-x-auto py-4">
        <div className="min-w-fit flex items-end gap-3 px-4 pt-4 pb-10 border-b-4 border-indigo-300 bg-indigo-50 rounded-lg mx-auto">
        {queue.length > 0 && (
            <>
              <div className="absolute left-4 -top-6 text-xs font-semibold text-green-700">Front</div>
              <div className="absolute right-4 -top-6 text-xs font-semibold text-blue-700">Rear</div>
            </>
          )}
          <AnimatePresence>
            {queue.map((item, index) => (
              <motion.div
                key={item + '-' + index}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col items-center"
              >
                <div className="min-w-[60px] h-[60px] bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg shadow flex items-center justify-center font-bold text-white">
                  {item}
                </div>
                <div className="text-xs text-indigo-900 font-medium mt-1">{index}</div>
              </motion.div>
            ))}
          
          </AnimatePresence>
      </div>
      </div>
    </div>);
}
