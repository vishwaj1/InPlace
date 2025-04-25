'use client';

import { useState } from 'react';

const TextEditorDemo = () => {
  const [text, setText] = useState('');
  const [history, setHistory] = useState(['']);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    
    // Add to history
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newText);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setText(history[currentIndex - 1]);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setText(history[currentIndex + 1]);
    }
  };

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={undo}
          disabled={currentIndex === 0}
          className={`px-3 py-1 rounded-md text-sm ${
            currentIndex === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          ↩️ Undo
        </button>
        <button
          onClick={redo}
          disabled={currentIndex === history.length - 1}
          className={`px-3 py-1 rounded-md text-sm ${
            currentIndex === history.length - 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          ↪️ Redo
        </button>
      </div>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Type something here..."
        className="w-full h-32 p-3 border border-gray-300 rounded-md text-sm"
      />
      <div className="mt-2 text-xs text-gray-500">
        Characters: {text.length} | History: {currentIndex + 1}/{history.length}
      </div>
    </div>
  );
};

export default TextEditorDemo; 