'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ArrayVisualizer() {
  const [array, setArray] = useState([1, 2, 3]);

  const pushItem = () => {
    const newItem = Math.floor(Math.random() * 100);
    setArray([...array, newItem]);
  };

  const popItem = () => {
    if (array.length > 0) {
      setArray(array.slice(0, -1));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-left">🧪 Array Visualizer</h3>

      <div className="flex flex-wrap gap-3 justify-center mb-6 min-h-[3rem]">
        <AnimatePresence initial={false}>
          {array.map((num, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-xl font-medium shadow-sm hover:scale-105 transition-transform"
            >
              {num}
            </motion.div>
          ))}
        </AnimatePresence>

        {array.length === 0 && (
          <div className="text-gray-400 italic">Array is empty</div>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={pushItem}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition font-semibold shadow-md"
        >
          <Plus size={18} /> Push
        </button>
        <button
          onClick={popItem}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition font-semibold shadow-md"
        >
          <Minus size={18} /> Pop
        </button>
      </div>
    </div>
  );
}
