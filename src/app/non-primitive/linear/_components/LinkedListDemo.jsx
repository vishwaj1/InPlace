'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';


export function explainLinkedList() {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-left text-sm text-gray-700 space-y-3">
      <button
        onClick={() => setOpen(!open)}
        className="text-emerald-700 font-semibold hover:underline mb-2"
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
        This demo illustrates a <span className="font-semibold text-emerald-600">Linked List</span> structure with animated node management and directional arrows:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li><span className="font-medium">➕ Insert Head:</span> Prepends a new node using array spread, simulating a head pointer update.</li>
        <li><span className="font-medium">➕ Insert Tail:</span> Appends a node to the end via state spreading — mimicking traditional tail insertion.</li>
        <li><span className="font-medium">🔢 Insert @ Index:</span> Inserts at any position using <code>.splice()</code>, dynamically adjusting connections.</li>
        <li><span className="font-medium">❌ Delete:</span> Removes a node from head, tail, or specific index using array filtering/splicing logic.</li>
        <li><span className="font-medium">🔄 Reset:</span> Empties the linked list state and resets it visually.</li>
      </ul>
      <p>
        Directional arrows between nodes mimic <span className="italic">next</span> pointers, and all transitions are smoothly animated with <span className="font-semibold text-purple-600">Framer Motion</span>. The demo bridges theory and UI in a dynamic, intuitive way.
      </p>
              </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



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
