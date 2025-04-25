'use client';

import { useState } from 'react';

// Simple tree node component
const TreeNode = ({ value, children, level }) => {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
        level === 0 ? 'bg-purple-600' : level === 1 ? 'bg-purple-500' : 'bg-purple-400'
      }`}>
        {value}
      </div>
      {children && children.length > 0 && (
        <div className="mt-2 flex gap-4">
          {children.map((child, index) => (
            <TreeNode key={index} value={child.value} children={child.children} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function TreePage() {
  const [inputValue, setInputValue] = useState('');
  const [tree, setTree] = useState({
    value: 'Root',
    children: [
      {
        value: 'A',
        children: [
          { value: 'A1', children: [] },
          { value: 'A2', children: [] }
        ]
      },
      {
        value: 'B',
        children: [
          { value: 'B1', children: [] },
          { value: 'B2', children: [] }
        ]
      }
    ]
  });

  const addNode = () => {
    if (inputValue.trim() === '') return;
    
    // For simplicity, we'll just add to the first child of the root
    const newTree = { ...tree };
    newTree.children[0].children.push({ value: inputValue, children: [] });
    setTree(newTree);
    setInputValue('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-purple-700">Tree Data Structure</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Tree Operations</h2>
          
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a node value"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={addNode}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              Add Node
            </button>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Tree Visualization:</h3>
            <div className="border border-gray-300 rounded-md p-8 min-h-[300px] flex justify-center">
              <TreeNode value={tree.value} children={tree.children} level={0} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">How Trees Work</h2>
          <p className="mb-4">
            A tree is a hierarchical data structure consisting of nodes connected by edges.
            Each node contains a value and references to other nodes (children).
          </p>
          <h3 className="text-xl font-medium mb-2">Key Concepts:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Root:</strong> The top node of the tree</li>
            <li><strong>Node:</strong> A data point in the tree</li>
            <li><strong>Edge:</strong> A connection between nodes</li>
            <li><strong>Leaf:</strong> A node with no children</li>
            <li><strong>Parent:</strong> A node that has children</li>
            <li><strong>Child:</strong> A node connected to a parent</li>
            <li><strong>Depth:</strong> The distance from the root to a node</li>
            <li><strong>Height:</strong> The maximum depth of any node</li>
          </ul>
          <h3 className="text-xl font-medium mb-2">Types of Trees:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Binary Tree:</strong> Each node has at most two children</li>
            <li><strong>Binary Search Tree:</strong> A binary tree with ordering properties</li>
            <li><strong>AVL Tree:</strong> A balanced binary search tree</li>
            <li><strong>Red-Black Tree:</strong> Another type of balanced binary search tree</li>
            <li><strong>B-Tree:</strong> Used in databases and file systems</li>
          </ul>
          <h3 className="text-xl font-medium mb-2">Applications:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>File systems</li>
            <li>Database indexing</li>
            <li>Expression evaluation</li>
            <li>Decision making in AI</li>
            <li>XML and HTML parsing</li>
          </ul>
        </div>
      </div>
    </main>
  );
} 