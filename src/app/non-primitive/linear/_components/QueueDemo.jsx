'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';



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
