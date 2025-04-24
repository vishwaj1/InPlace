'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LinkedListPage = () => {
  const [linkedList, setLinkedList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const canvasRef = useRef(null);

  // Draw connecting lines between nodes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#4F46E5';
    ctx.lineWidth = 2;

    linkedList.forEach((_, index) => {
      if (index < linkedList.length - 1) {
        const currentNode = document.getElementById(`node-${index}`);
        const nextNode = document.getElementById(`node-${index + 1}`);
        
        if (currentNode && nextNode) {
          const currentRect = currentNode.getBoundingClientRect();
          const nextRect = nextNode.getBoundingClientRect();
          
          const startX = currentRect.left + currentRect.width / 2;
          const startY = currentRect.bottom;
          const endX = nextRect.left + nextRect.width / 2;
          const endY = nextRect.top;

          // Draw vertical line
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          // Draw arrow
          const arrowLength = 10;
          ctx.beginPath();
          ctx.moveTo(endX, endY);
          ctx.lineTo(endX - arrowLength, endY + arrowLength);
          ctx.moveTo(endX, endY);
          ctx.lineTo(endX + arrowLength, endY + arrowLength);
          ctx.stroke();
        }
      }
    });
  }, [linkedList]);

  const handleInsert = () => {
    if (inputValue.trim() === '') return;
    setLinkedList([...linkedList, { value: inputValue, next: null }]);
    setInputValue('');
  };

  const handleDelete = (index) => {
    const newList = linkedList.filter((_, i) => i !== index);
    setLinkedList(newList);
  };

  const handleUpdate = (index) => {
    if (inputValue.trim() === '') return;
    const newList = linkedList.map((node, i) => 
      i === index ? { ...node, value: inputValue } : node
    );
    setLinkedList(newList);
    setInputValue('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-indigo-900 mb-2">Linked List Adventure</h1>
        <p className="text-lg text-indigo-700 mb-8">Follow the treasure map of connected nodes!</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex gap-4 mb-6">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a treasure clue..."
                  className="flex-1 px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleInsert}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add Clue
                </button>
              </div>

              <div className="relative min-h-[400px]">
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                  style={{ pointerEvents: 'none' }}
                />
                <div className="flex flex-col items-center space-y-8 relative z-10">
                  {linkedList.map((node, index) => (
                    <motion.div
                      key={index}
                      id={`node-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-48"
                    >
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center text-lg font-semibold text-indigo-700 border-2 border-indigo-200">
                            {node.value}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdate(index)}
                              className="px-4 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(index)}
                              className="px-4 py-1 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-indigo-900 mb-4">The Treasure Hunt Story</h2>
              <div className="prose prose-indigo">
                <p className="text-gray-700 mb-4">
                  Imagine you're on a treasure hunt! Each node in our linked list is like a clue that leads to the next one. Just like following a map where each location points to the next, our linked list connects each piece of information to create a path to the treasure.
                </p>
                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="font-medium text-indigo-900 mb-2">How it Works:</h3>
                    <ul className="list-disc list-inside text-indigo-700 space-y-2">
                      <li>Each clue (node) contains valuable information</li>
                      <li>The arrow (↓) shows where to go next</li>
                      <li>You must follow the clues in order</li>
                      <li>Can't skip ahead - just like a real treasure hunt!</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-medium text-purple-900 mb-2">Why Linked Lists?</h3>
                    <ul className="list-disc list-inside text-purple-700 space-y-2">
                      <li>Easy to add new clues anywhere</li>
                      <li>Simple to remove old clues</li>
                      <li>Perfect for sequential data</li>
                      <li>Memory efficient for dynamic paths</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedListPage; 