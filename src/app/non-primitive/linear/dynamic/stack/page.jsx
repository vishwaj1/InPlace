'use client';

import { useState } from 'react';

export default function StackPage() {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const push = () => {
    if (inputValue.trim() === '') return;
    setStack([...stack, inputValue]);
    setInputValue('');
  };

  const pop = () => {
    if (stack.length === 0) return;
    const newStack = [...stack];
    newStack.pop();
    setStack(newStack);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-blue-700">Stack Data Structure</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Stack Operations</h2>
          
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a value"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={push}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Push
            </button>
            <button
              onClick={pop}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Pop
            </button>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Stack Contents:</h3>
            <div className="border border-gray-300 rounded-md p-4 min-h-[200px] flex flex-col-reverse">
              {stack.length === 0 ? (
                <div className="text-gray-500 text-center">Stack is empty</div>
              ) : (
                stack.map((item, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-800 p-3 mb-2 rounded-md"
                  >
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>Stack size: {stack.length}</p>
            <p>Top element: {stack.length > 0 ? stack[stack.length - 1] : 'None'}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">How Stacks Work</h2>
          <p className="mb-4">
            A stack is a linear data structure that follows the Last In, First Out (LIFO) principle.
            This means that the last element added to the stack is the first one to be removed.
          </p>
          <h3 className="text-xl font-medium mb-2">Key Operations:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Push:</strong> Adds an element to the top of the stack</li>
            <li><strong>Pop:</strong> Removes the top element from the stack</li>
            <li><strong>Peek/Top:</strong> Returns the top element without removing it</li>
            <li><strong>IsEmpty:</strong> Checks if the stack is empty</li>
          </ul>
          <h3 className="text-xl font-medium mb-2">Applications:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Function call management in programming languages</li>
            <li>Undo mechanisms in text editors</li>
            <li>Expression evaluation and syntax parsing</li>
            <li>Backtracking algorithms</li>
          </ul>
        </div>
      </div>
    </main>
  );
} 