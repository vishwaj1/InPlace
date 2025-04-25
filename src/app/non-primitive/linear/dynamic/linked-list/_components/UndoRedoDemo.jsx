'use client';

import { useState } from 'react';

export const explainUndoRedo = () => {
  return (
    <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">How Undo/Redo Works with Linked Lists</h3>
      <p className="text-blue-700 mb-2">
        The undo/redo functionality in applications like drawing tools uses a doubly linked list to track changes. Here's how it works:
      </p>
      <ul className="list-disc pl-5 text-blue-700 space-y-1">
        <li>Each action (add shape, delete shape, move shape) becomes a <strong>node</strong> in the linked list</li>
        <li>Each node contains the action data and pointers to both previous and next actions</li>
        <li>The application maintains a pointer to the current state</li>
        <li>When you perform an undo, the application moves to the previous state</li>
        <li>When you perform a redo, the application moves to the next state</li>
        <li>New actions create new nodes and link them to the current state</li>
        <li>When you perform a new action after an undo, all future states are discarded</li>
      </ul>
      <div className="mt-3 p-3 bg-blue-100 rounded-md">
        <p className="text-blue-800 font-medium">Code Implementation:</p>
        <pre className="text-xs text-blue-900 mt-1 overflow-x-auto">
{`// Node structure
class Action {
  constructor(type, data) {
    this.type = type; // 'add', 'delete', 'move'
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

// Undo/Redo implementation
class UndoRedoManager {
  constructor() {
    this.head = null;
    this.current = null;
    this.shapes = [];
  }
  
  addShape(shape) {
    const action = new Action('add', shape);
    
    if (!this.head) {
      this.head = action;
      this.current = action;
    } else {
      action.prev = this.current;
      this.current.next = action;
      this.current = action;
    }
    
    this.shapes.push(shape);
  }
  
  deleteShape(shapeId) {
    const shape = this.shapes.find(s => s.id === shapeId);
    if (!shape) return;
    
    const action = new Action('delete', shape);
    
    action.prev = this.current;
    this.current.next = action;
    this.current = action;
    
    this.shapes = this.shapes.filter(s => s.id !== shapeId);
  }
  
  undo() {
    if (!this.current || !this.current.prev) return;
    
    const action = this.current;
    this.current = action.prev;
    
    // Reverse the action
    if (action.type === 'add') {
      this.shapes = this.shapes.filter(s => s.id !== action.data.id);
    } else if (action.type === 'delete') {
      this.shapes.push(action.data);
    }
  }
  
  redo() {
    if (!this.current || !this.current.next) return;
    
    const action = this.current.next;
    this.current = action;
    
    // Apply the action
    if (action.type === 'add') {
      this.shapes.push(action.data);
    } else if (action.type === 'delete') {
      this.shapes = this.shapes.filter(s => s.id !== action.data.id);
    }
  }
}`}
        </pre>
      </div>
    </div>
  );
};

const UndoRedoDemo = () => {
  const [shapes, setShapes] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showExplanation, setShowExplanation] = useState(false);

  const addShape = () => {
    const newShape = {
      id: Date.now(),
      type: Math.random() > 0.5 ? 'circle' : 'square',
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
    };
    
    setShapes([...shapes, newShape]);
    
    // Add to history
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push([...shapes, newShape]);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
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

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex gap-2 mb-4">
        <button
          onClick={addShape}
          className="px-3 py-1 rounded-md text-sm bg-green-500 text-white hover:bg-green-600"
        >
          Add Shape
        </button>
        <button
          onClick={undo}
          disabled={currentIndex <= 0}
          className={`px-3 py-1 rounded-md text-sm ${
            currentIndex <= 0
              ? 'bg-gray-100 text-gray-400'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Undo
        </button>
        <button
          onClick={redo}
          disabled={currentIndex >= history.length - 1}
          className={`px-3 py-1 rounded-md text-sm ${
            currentIndex >= history.length - 1
              ? 'bg-gray-100 text-gray-400'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Redo
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {shapes.map(shape => (
          <div
            key={shape.id}
            className={`w-20 h-20 ${
              shape.type === 'circle' ? 'rounded-full' : ''
            }`}
            style={{ backgroundColor: shape.color }}
            onClick={() => deleteShape(shape.id)}
          />
        ))}
      </div>
      
      <div className="mt-6">
        <button 
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <span>{showExplanation ? 'Hide' : 'Show'} Implementation Details</span>
          <span>{showExplanation ? '▲' : '▼'}</span>
        </button>
        {showExplanation && explainUndoRedo()}
      </div>
    </div>
  );
};

export default UndoRedoDemo; 