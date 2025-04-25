'use client';

import { useState } from 'react';

// Simple graph visualization component
const GraphVisualization = ({ nodes, edges }) => {
  return (
    <div className="relative w-full h-[400px] border border-gray-300 rounded-md bg-gray-50">
      {/* Render nodes */}
      {nodes.map((node, index) => (
        <div
          key={index}
          className="absolute w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {node.value}
        </div>
      ))}
      
      {/* Render edges */}
      <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
        {edges.map((edge, index) => {
          const sourceNode = nodes.find(n => n.value === edge.source);
          const targetNode = nodes.find(n => n.value === edge.target);
          
          if (!sourceNode || !targetNode) return null;
          
          return (
            <line
              key={index}
              x1={`${sourceNode.x}%`}
              y1={`${sourceNode.y}%`}
              x2={`${targetNode.x}%`}
              y2={`${targetNode.y}%`}
              stroke="#3b82f6"
              strokeWidth="2"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default function GraphPage() {
  const [nodes, setNodes] = useState([
    { value: 'A', x: 20, y: 30 },
    { value: 'B', x: 50, y: 30 },
    { value: 'C', x: 80, y: 30 },
    { value: 'D', x: 35, y: 60 },
    { value: 'E', x: 65, y: 60 }
  ]);
  
  const [edges, setEdges] = useState([
    { source: 'A', target: 'B' },
    { source: 'B', target: 'C' },
    { source: 'A', target: 'D' },
    { source: 'B', target: 'D' },
    { source: 'B', target: 'E' },
    { source: 'C', target: 'E' }
  ]);
  
  const [newNodeValue, setNewNodeValue] = useState('');
  const [sourceNode, setSourceNode] = useState('');
  const [targetNode, setTargetNode] = useState('');

  const addNode = () => {
    if (newNodeValue.trim() === '') return;
    
    // Check if node already exists
    if (nodes.some(node => node.value === newNodeValue)) {
      alert('Node already exists!');
      return;
    }
    
    // Add new node at a random position
    const newX = Math.floor(Math.random() * 60) + 20; // Between 20% and 80%
    const newY = Math.floor(Math.random() * 40) + 20; // Between 20% and 60%
    
    setNodes([...nodes, { value: newNodeValue, x: newX, y: newY }]);
    setNewNodeValue('');
  };

  const addEdge = () => {
    if (sourceNode === '' || targetNode === '') return;
    
    // Check if nodes exist
    if (!nodes.some(node => node.value === sourceNode) || 
        !nodes.some(node => node.value === targetNode)) {
      alert('One or both nodes do not exist!');
      return;
    }
    
    // Check if edge already exists
    if (edges.some(edge => 
        (edge.source === sourceNode && edge.target === targetNode) || 
        (edge.source === targetNode && edge.target === sourceNode))) {
      alert('Edge already exists!');
      return;
    }
    
    setEdges([...edges, { source: sourceNode, target: targetNode }]);
    setSourceNode('');
    setTargetNode('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-blue-700">Graph Data Structure</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Graph Operations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Add Node</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNodeValue}
                  onChange={(e) => setNewNodeValue(e.target.value)}
                  placeholder="Node value"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={addNode}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Add Edge</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sourceNode}
                  onChange={(e) => setSourceNode(e.target.value)}
                  placeholder="Source node"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  value={targetNode}
                  onChange={(e) => setTargetNode(e.target.value)}
                  placeholder="Target node"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={addEdge}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Graph Visualization:</h3>
            <GraphVisualization nodes={nodes} edges={edges} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Nodes:</h3>
              <div className="flex flex-wrap gap-2">
                {nodes.map((node, index) => (
                  <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
                    {node.value}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Edges:</h3>
              <div className="flex flex-wrap gap-2">
                {edges.map((edge, index) => (
                  <div key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md">
                    {edge.source} → {edge.target}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">How Graphs Work</h2>
          <p className="mb-4">
            A graph is a non-linear data structure consisting of vertices (nodes) and edges.
            Graphs are used to represent relationships between objects.
          </p>
          <h3 className="text-xl font-medium mb-2">Key Concepts:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Vertex/Node:</strong> A data point in the graph</li>
            <li><strong>Edge:</strong> A connection between vertices</li>
            <li><strong>Directed Graph:</strong> Edges have a direction</li>
            <li><strong>Undirected Graph:</strong> Edges have no direction</li>
            <li><strong>Weighted Graph:</strong> Edges have weights/costs</li>
            <li><strong>Degree:</strong> Number of edges connected to a vertex</li>
            <li><strong>Path:</strong> A sequence of vertices connected by edges</li>
            <li><strong>Cycle:</strong> A path that starts and ends at the same vertex</li>
          </ul>
          <h3 className="text-xl font-medium mb-2">Graph Representations:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Adjacency Matrix:</strong> A 2D array where a[i][j] = 1 if there's an edge from i to j</li>
            <li><strong>Adjacency List:</strong> An array of lists where each list represents the neighbors of a vertex</li>
          </ul>
          <h3 className="text-xl font-medium mb-2">Applications:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Social networks</li>
            <li>Transportation networks</li>
            <li>Web pages and links</li>
            <li>Dependency graphs</li>
            <li>Game maps and pathfinding</li>
          </ul>
        </div>
      </div>
    </main>
  );
}