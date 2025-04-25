'use client';

import { useState } from 'react';

export const explainTextEditor = () => {
  return (
    <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">How Text Editors Work with Linked Lists</h3>
      <p className="text-blue-700 mb-2">
        Text editors use linked lists to implement their undo/redo functionality. Here's how it works:
      </p>
      <ul className="list-disc pl-5 text-blue-700 space-y-1">
        <li>Each text operation (insert, delete, replace) becomes a <strong>node</strong> in the linked list</li>
        <li>Each node contains the operation data and a pointer to the next operation</li>
        <li>The editor maintains a pointer to the current state of the document</li>
        <li>When you perform an undo, the editor moves to the previous state</li>
        <li>When you perform a redo, the editor moves to the next state</li>
        <li>New operations create new nodes and link them to the current state</li>
        <li>When you perform a new operation after an undo, all future states are discarded</li>
      </ul>
      <div className="mt-3 p-3 bg-blue-100 rounded-md">
        <p className="text-blue-800 font-medium">Code Implementation:</p>
        <pre className="text-xs text-blue-900 mt-1 overflow-x-auto">
{`// Node structure
class TextOperation {
  constructor(type, content, position) {
    this.type = type; // 'insert', 'delete', 'replace'
    this.content = content;
    this.position = position;
    this.next = null;
    this.prev = null;
  }
}

// Text Editor implementation
class TextEditor {
  constructor() {
    this.head = null;
    this.current = null;
    this.document = '';
  }
  
  insert(text, position) {
    const operation = new TextOperation('insert', text, position);
    
    if (!this.head) {
      this.head = operation;
      this.current = operation;
    } else {
      operation.prev = this.current;
      this.current.next = operation;
      this.current = operation;
    }
    
    this.document = this.document.slice(0, position) + text + this.document.slice(position);
  }
  
  delete(position, length) {
    const deletedText = this.document.slice(position, position + length);
    const operation = new TextOperation('delete', deletedText, position);
    
    operation.prev = this.current;
    this.current.next = operation;
    this.current = operation;
    
    this.document = this.document.slice(0, position) + this.document.slice(position + length);
  }
  
  undo() {
    if (!this.current || !this.current.prev) return;
    
    const operation = this.current;
    this.current = operation.prev;
    
    // Reverse the operation
    if (operation.type === 'insert') {
      this.document = this.document.slice(0, operation.position) + 
                     this.document.slice(operation.position + operation.content.length);
    } else if (operation.type === 'delete') {
      this.document = this.document.slice(0, operation.position) + 
                     operation.content + 
                     this.document.slice(operation.position);
    }
  }
  
  redo() {
    if (!this.current || !this.current.next) return;
    
    const operation = this.current.next;
    this.current = operation;
    
    // Apply the operation
    if (operation.type === 'insert') {
      this.document = this.document.slice(0, operation.position) + 
                     operation.content + 
                     this.document.slice(operation.position);
    } else if (operation.type === 'delete') {
      this.document = this.document.slice(0, operation.position) + 
                     this.document.slice(operation.position + operation.content.length);
    }
  }
}`}
        </pre>
      </div>
    </div>
  );
};

const TextEditorDemo = () => {
  const [text, setText] = useState('');
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showExplanation, setShowExplanation] = useState(false);

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
      <div className="flex gap-2 mb-4">
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
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Type something..."
        className="w-full h-40 p-3 border border-gray-300 rounded-md text-sm resize-none"
      />
      
      <div className="mt-6">
        <button 
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <span>{showExplanation ? 'Hide' : 'Show'} Implementation Details</span>
          <span>{showExplanation ? '▲' : '▼'}</span>
        </button>
        {showExplanation && explainTextEditor()}
      </div>
    </div>
  );
};

export default TextEditorDemo; 