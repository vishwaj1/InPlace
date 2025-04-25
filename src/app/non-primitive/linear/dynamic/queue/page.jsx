'use client';

import { useState } from 'react';

export default function QueuePage() {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const enqueue = () => {
    if (inputValue.trim() === '') return;
    setQueue([...queue, inputValue]);
    setInputValue('');
  };

  const dequeue = () => {
    if (queue.length === 0) return;
    const newQueue = [...queue];
    newQueue.shift();
    setQueue(newQueue);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-green-700">Queue Data Structure</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">Queue Operations</h2>
          
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a value"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={enqueue}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Enqueue
            </button>
            <button
              onClick={dequeue}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Dequeue
            </button>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Queue Contents:</h3>
            <div className="border border-gray-300 rounded-md p-4 min-h-[200px] flex flex-col">
              {queue.length === 0 ? (
                <div className="text-gray-500 text-center">Queue is empty</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {queue.map((item, index) => (
                    <div
                      key={index}
                      className="bg-green-100 text-green-800 p-3 rounded-md"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>Queue size: {queue.length}</p>
            <p>Front element: {queue.length > 0 ? queue[0] : 'None'}</p>
            <p>Rear element: {queue.length > 0 ? queue[queue.length - 1] : 'None'}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">How Queues Work</h2>
          <p className="mb-4">
            A queue is a linear data structure that follows the First In, First Out (FIFO) principle.
            This means that the first element added to the queue is the first one to be removed.
          </p>
          <h3 className="text-xl font-medium mb-2">Key Operations:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Enqueue:</strong> Adds an element to the rear of the queue</li>
            <li><strong>Dequeue:</strong> Removes the front element from the queue</li>
            <li><strong>Front:</strong> Returns the front element without removing it</li>
            <li><strong>Rear:</strong> Returns the rear element without removing it</li>
            <li><strong>IsEmpty:</strong> Checks if the queue is empty</li>
          </ul>
          <h3 className="text-xl font-medium mb-2">Applications:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Task scheduling in operating systems</li>
            <li>Print job management</li>
            <li>Web server request handling</li>
            <li>Breadth-first search in graphs</li>
          </ul>
        </div>
      </div>
    </main>
  );
} 