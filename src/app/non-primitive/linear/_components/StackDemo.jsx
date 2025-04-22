'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function explainStack() {
  return (
    <div className="text-left text-sm text-gray-700 space-y-3">
      <p>
        This demo simulates a classic <span className="font-semibold text-blue-600">Stack</span> data structure with live interactions and animations:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li><span className="font-medium">📥 Push:</span> Adds an element to the top of the stack using <code>.push()</code>-like behavior.</li>
        <li><span className="font-medium">📤 Pop:</span> Removes the top item using <code>.slice(0, -1)</code>, showcasing LIFO (Last-In-First-Out).</li>
        <li><span className="font-medium">🟨 Top Highlight:</span> The top item is visually marked in yellow to indicate the stack's top.</li>
        <li><span className="font-medium">🚫 Overflow:</span> Displays an error when the stack exceeds 5 items.</li>
        <li><span className="font-medium">🔁 Reset:</span> Resets the stack to an empty state.</li>
        <li><span className="font-medium">🔢 Indexing:</span> Shows index numbers beside each element for clarity.</li>
      </ul>
      <p>
        All operations are handled with <code>React state</code> and animated via <span className="font-semibold text-purple-600">Framer Motion</span> to make stack behavior easy and fun to understand.
      </p>
    </div>
  );
}

export default function StackDemo() {
  const [stack, setStack] = useState([1, 2, 3]);
  const MAX_SIZE = 5;
  const [input, setInput] = useState('');

  const handlePush = () => {
    if (stack.length >= MAX_SIZE) {
      return;
    }
    if (input.trim()) {
      setStack((prev) => [...prev, parseInt(input)]);
      setInput('');
    }
  };

  const handlePop = () => {
    setStack((prev) => prev.slice(0, -1));
  };

  const handleReset = () => {
    setStack([]);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border px-2 py-1 rounded text-sm w-28 bg-white text-gray-800 placeholder-gray-400"
          placeholder="Push value"
        />
        <button
          onClick={handlePush}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
        >
          Push
        </button>
        <button
          onClick={handlePop}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Pop
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
        >
          Reset
        </button>
      </div>

      {stack.length >= MAX_SIZE && (
        <div className="text-center text-sm text-red-600 font-medium mb-2">Maximum size of 5 reached.</div>
      )}

      <div className="flex justify-center">
        <div className="flex flex-col-reverse items-center border-2 border-blue-300 rounded-xl py-4 px-8 min-h-[260px] w-32 bg-blue-50">
          <AnimatePresence>
            {stack.map((item, index) => (
            <div key={item + '-' + index} className="relative w-full">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-2 w-full h-10 text-white font-bold rounded shadow flex items-center justify-center ${index === stack.length - 1 ? 'bg-yellow-500' : 'bg-gradient-to-r from-blue-400 to-blue-600'}`}
              >
                {item}
              </motion.div>
              <div className="absolute right-full pr-2 top-1/2 transform -translate-y-1/2 text-xs text-blue-900 font-semibold">{stack.length - 1 - index}</div>
            </div>
          ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
