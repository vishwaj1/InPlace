'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';



export default function LinkedListDemo() {
  const [list, setList] = useState([1, 2, 3]);
  const [input, setInput] = useState('');
  const [index, setIndex] = useState('');

  const insertAtTail = () => {
    if (input.trim()) {
      setList([...list, parseInt(input)]);
      setInput('');
    }
  };

  const insertAtHead = () => {
    if (input.trim()) {
      setList([parseInt(input), ...list]);
      setInput('');
    }
  };

  const insertAtIndex = () => {
    const idx = parseInt(index);
    if (!isNaN(idx) && idx >= 0 && idx <= list.length && input.trim()) {
      const newList = [...list];
      newList.splice(idx, 0, parseInt(input));
      setList(newList);
      setInput('');
      setIndex('');
    }
  };

  const deleteHead = () => {
    setList((prev) => prev.slice(1));
  };

  const deleteTail = () => {
    setList((prev) => prev.slice(0, -1));
  };

  const deleteAtIndex = () => {
    const idx = parseInt(index);
    if (!isNaN(idx) && idx >= 0 && idx < list.length) {
      const newList = [...list];
      newList.splice(idx, 1);
      setList(newList);
      setIndex('');
    }
  };

  const resetList = () => {
    setList([]);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border px-2 py-1 rounded text-sm w-28 bg-white text-gray-800 placeholder-gray-400"
          placeholder="Node value"
        />
        <input
          type="number"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          className="border px-2 py-1 rounded text-sm w-28 bg-white text-gray-800 placeholder-gray-400"
          placeholder="Index"
        />

        <button onClick={insertAtHead} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">
          Insert Head
        </button>
        <button onClick={insertAtTail} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm">
          Insert Tail
        </button>
        <button onClick={insertAtIndex} className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm">
          Insert @ Index
        </button>

        <button onClick={deleteHead} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
          Delete Head
        </button>
        <button onClick={deleteTail} className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 text-sm">
          Delete Tail
        </button>
        <button onClick={deleteAtIndex} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm">
          Delete @ Index
        </button>

        <button onClick={resetList} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm">
          Reset
        </button>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto py-2">
        <AnimatePresence>
          {list.map((value, idx) => (
            <motion.div
              key={value + '-' + idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative flex items-center"
            >
              <div className="min-w-[60px] h-[60px] bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg shadow flex items-center justify-center font-bold text-white">
                {value}
              </div>
              {idx < list.length - 1 && <ArrowRight className="text-gray-500 w-6 h-6 mx-1" />}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
