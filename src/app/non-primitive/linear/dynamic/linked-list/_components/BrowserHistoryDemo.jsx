'use client';

import { useState } from 'react';

export const explainBrowserHistory = () => {
  return (
    <div className="mt-4 bg-indigo-50 p-4 rounded-lg border border-indigo-200">
      <h3 className="text-lg font-semibold text-indigo-800 mb-2">How Browser History Works with Linked Lists</h3>
      <p className="text-indigo-700 mb-2">
        Browser history is implemented using a doubly linked list data structure. Here's how it works:
      </p>
      <ul className="list-disc pl-5 text-indigo-700 space-y-1">
        <li>Each webpage you visit becomes a <strong>node</strong> in the linked list</li>
        <li>Each node contains the page URL, title, and pointers to the previous and next pages</li>
        <li>When you click "Back", the browser follows the "previous" pointer to the previous page</li>
        <li>When you click "Forward", the browser follows the "next" pointer to the next page</li>
        <li>When you visit a new page, a new node is created and linked to the current page</li>
        <li>If you navigate back and then visit a new page, the "forward" history is discarded</li>
      </ul>
      <div className="mt-3 p-3 bg-indigo-100 rounded-md">
        <p className="text-indigo-800 font-medium">Code Implementation:</p>
        <pre className="text-xs text-indigo-900 mt-1 overflow-x-auto">
{`// Node structure
class HistoryNode {
  constructor(url, title) {
    this.url = url;
    this.title = title;
    this.prev = null;
    this.next = null;
  }
}

// Browser history implementation
class BrowserHistory {
  constructor() {
    this.current = null;
  }
  
  visit(url, title) {
    const newNode = new HistoryNode(url, title);
    newNode.prev = this.current;
    
    if (this.current) {
      this.current.next = newNode;
    }
    
    this.current = newNode;
  }
  
  back() {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
      return this.current;
    }
    return null;
  }
  
  forward() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
      return this.current;
    }
    return null;
  }
}`}
        </pre>
      </div>
    </div>
  );
};

const BrowserHistoryDemo = () => {
  const [history, setHistory] = useState([
    { url: 'google.com', title: 'Google' },
    { url: 'github.com', title: 'GitHub' },
    { url: 'linkedin.com', title: 'LinkedIn' }
  ]);
  const [currentIndex, setCurrentIndex] = useState(history.length - 1);
  const [newUrl, setNewUrl] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);

  const addPage = () => {
    if (newUrl.trim() === '') return;
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push({ url: newUrl, title: newUrl.split('.')[0] });
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setNewUrl('');
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="Enter URL (e.g., facebook.com)"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
        <button
          onClick={addPage}
          className="px-3 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
        >
          Visit
        </button>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={goBack}
          disabled={currentIndex === 0}
          className={`px-3 py-1 rounded-md text-sm ${
            currentIndex === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          ← Back
        </button>
        <button
          onClick={goForward}
          disabled={currentIndex === history.length - 1}
          className={`px-3 py-1 rounded-md text-sm ${
            currentIndex === history.length - 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Forward →
        </button>
      </div>
      <div className="bg-gray-100 p-3 rounded-md">
        <div className="text-sm font-medium text-gray-700 mb-2">Current Page:</div>
        <div className="text-lg font-semibold text-blue-600">
          {history[currentIndex].title}
        </div>
        <div className="text-xs text-gray-500">{history[currentIndex].url}</div>
      </div>
      <div className="mt-4">
        <div className="text-sm font-medium text-gray-700 mb-2">History:</div>
        <div className="space-y-1">
          {history.map((page, index) => (
            <div
              key={index}
              className={`p-2 rounded-md text-sm ${
                index === currentIndex
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-50 text-gray-700'
              }`}
            >
              {page.title} ({page.url})
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <button 
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <span>{showExplanation ? 'Hide' : 'Show'} Implementation Details</span>
          <span>{showExplanation ? '▲' : '▼'}</span>
        </button>
        {showExplanation && explainBrowserHistory()}
      </div>
    </div>
  );
};

export default BrowserHistoryDemo; 