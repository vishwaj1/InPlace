'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function explainArray() {
  return (
    <div className="text-left text-sm text-gray-700 space-y-3">
      <p>
        This interactive demo showcases an <span className="font-semibold text-blue-600">Array</span> and its core operations with real-time feedback and animation:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li><span className="font-medium">🔢 Push:</span> Adds a value at the end using <code>.push()</code>, expanding the array dynamically.</li>
        <li><span className="font-medium">🧼 Pop:</span> Removes the last element using <code>.slice(0, -1)</code>, mimicking stack-like behavior.</li>
        <li><span className="font-medium">🔍 Access:</span> Retrieves elements by index to show O(1) direct access speed.</li>
        <li><span className="font-medium">🧪 Search:</span> Uses <code>.indexOf()</code> to highlight where values are found in the array.</li>
        <li><span className="font-medium">🔃 Sort:</span> Reorders the array in ascending order using <code>.sort()</code>.</li>
        <li><span className="font-medium">♻️ Reset:</span> Clears the array entirely and returns to an empty state.</li>
      </ul>
      <p>
        Powered by <code>React state</code> and <span className="font-semibold text-purple-600">Framer Motion</span>, this demo provides a fun and clear way to understand how arrays are manipulated visually.
      </p>
    </div>
  );
}


export default function ArrayDemo() {
  const [array, setArray] = useState([1, 2, 3]);
  const [input, setInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState('');

  const handlePush = () => {
    if (input.trim()) {
      setArray((prev) => [...prev, parseInt(input)]);
      setInput('');
    }
  };

  const handlePop = () => {
    setArray((prev) => prev.slice(0, -1));
  };

  const handleAccess = () => {
    const index = parseInt(selectedIndex);
    if (!isNaN(index) && index >= 0 && index < array.length) {
      alert(`Element at index ${index}: ${array[index]}`);
    } else {
      alert('Invalid index');
    }
    setSelectedIndex('');
  };

  const handleReset = () => {
    setArray([]);
  };

  const handleSort = () => {
    setArray((prev) => [...prev].sort((a, b) => a - b));
  };

  const handleSearch = () => {
    const value = parseInt(input);
    const index = array.indexOf(value);
    if (index !== -1) {
      alert(`Value ${value} found at index ${index}`);
    } else {
      alert('Value not found');
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border px-2 py-1 rounded text-sm w-28 bg-white text-gray-800 placeholder-gray-400"
          placeholder="Enter value"
        />
        <button onClick={handlePush} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">
          Push
        </button>
        <button onClick={handlePop} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
          Pop
        </button>
        <button onClick={handleAccess} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm">
          Access
        </button>
        <button onClick={handleSort} className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 text-sm">
          Sort
        </button>
        <button onClick={handleSearch} className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 text-sm">
          Search
        </button>
        <button onClick={handleReset} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm">
          Reset
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto py-2">
        <AnimatePresence>
          {array.map((item, index) => (
            <motion.div
              key={item + '-' + index}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="min-w-[60px] h-[60px] bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg shadow flex items-center justify-center font-bold text-white relative"
            >
              <div>{item}</div>
              <div className="absolute -bottom-6 text-xs text-white font-medium">{index}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
