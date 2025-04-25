'use client';

import { useState } from 'react';

const UndoRedoDemo = () => {
  const [shapes, setShapes] = useState([]);
  const [history, setHistory] = useState([[]]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedShape, setSelectedShape] = useState(null);

  const addShape = (type) => {
    const newShape = {
      id: Date.now(),
      type,
      x: Math.random() * 300,
      y: Math.random() * 200,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    };
    
    const newShapes = [...shapes, newShape];
    setShapes(newShapes);
    
    // Add to history
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newShapes);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShapes(history[currentIndex - 1]);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShapes(history[currentIndex + 1]);
    }
  };

  const deleteShape = (id) => {
    const newShapes = shapes.filter(shape => shape.id !== id);
    setShapes(newShapes);
    
    // Add to history
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newShapes);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => addShape('circle')}
          className="px-3 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
        >
          Add Circle
        </button>
        <button
          onClick={() => addShape('square')}
          className="px-3 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
        >
          Add Square
        </button>
        <button
          onClick={undo}
          disabled={currentIndex === 0}
          className={`px-3 py-2 rounded-md text-sm ${
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
          className={`px-3 py-2 rounded-md text-sm ${
            currentIndex === history.length - 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          ↪️ Redo
        </button>
      </div>
      <div className="relative h-64 border border-gray-300 rounded-md bg-gray-50">
        {shapes.map(shape => (
          <div
            key={shape.id}
            style={{
              position: 'absolute',
              left: `${shape.x}px`,
              top: `${shape.y}px`,
              width: shape.type === 'circle' ? '40px' : '40px',
              height: shape.type === 'circle' ? '40px' : '40px',
              backgroundColor: shape.color,
              borderRadius: shape.type === 'circle' ? '50%' : '0',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedShape(shape.id)}
          />
        ))}
        {selectedShape && (
          <button
            onClick={() => {
              deleteShape(selectedShape);
              setSelectedShape(null);
            }}
            className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded-md text-xs"
          >
            Delete Selected
          </button>
        )}
      </div>
      <div className="mt-2 text-xs text-gray-500">
        History: {currentIndex + 1}/{history.length} | Shapes: {shapes.length}
      </div>
    </div>
  );
};

export default UndoRedoDemo; 