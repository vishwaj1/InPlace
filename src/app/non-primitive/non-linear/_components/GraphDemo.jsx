'use client';

import { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';

export function explainGraph() {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-left text-sm text-gray-700 space-y-3">
      <button
        onClick={() => setOpen(!open)}
        className="text-indigo-700 font-semibold hover:underline mb-2"
      >
        {open ? 'Hide Explanation ▲' : 'Show Explanation ▼'}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
      <p>
        This demo provides an interactive and visual representation of a <span className="font-semibold text-indigo-600">Graph</span> data structure using <code>React Flow</code>:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li><span className="font-medium">🔘 Nodes:</span> Initially placed in a circular layout, nodes are labeled A–F and are represented as draggable circles.</li>
        <li><span className="font-medium">➕ Add Node:</span> Adds a new node with a label (e.g., G, H, ...) and random position on the canvas.</li>
        <li><span className="font-medium">🔗 Add Edge:</span> Connects two nodes using directional arrows by specifying their IDs.</li>
        <li><span className="font-medium">🎯 Arrows:</span> Directional edges indicate the flow of the graph, powered by <code>MarkerType.ArrowClosed</code>.</li>
        <li><span className="font-medium">🧭 Controls:</span> Zoom, pan, and fit-to-view tools let users explore the full graph.</li>
        <li><span className="font-medium">🗺️ MiniMap:</span> Offers a real-time overview of the entire node graph.</li>
      </ul>
      <p>
        This implementation demonstrates the dynamic nature of graphs in UI and algorithm visualization, giving learners an engaging way to explore <span className="font-semibold text-purple-600">nodes</span> and <span className="font-semibold text-purple-600">edges</span> interactively.
      </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



export default function GraphDemo() {
  const [nodes, setNodes] = useState([
    ...[1, 2, 3, 4, 5, 6].map((num, idx) => {
      const angle = (Math.PI * 2 * idx) / 6;
      return {
        id: `${num}`,
        data: { label: `Node ${String.fromCharCode(64 + num)}` },
        position: {
          x: 200 + 150 * Math.cos(angle),
          y: 200 + 150 * Math.sin(angle)
        },
        style: {
          borderRadius: '50%',
          width: 60,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          backgroundColor: '#e0e7ff'
        }
      };
    })
  ]);
  const [edges, setEdges] = useState([
    { id: 'e1-2', source: '1', target: '2', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e1-3', source: '1', target: '3', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e2-4', source: '2', target: '4', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e3-5', source: '3', target: '5', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e4-6', source: '4', target: '6', markerEnd: { type: MarkerType.ArrowClosed } },
  ]);
  const [label, setLabel] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [idCounter, setIdCounter] = useState(7);

  const handleAddNode = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const labelChar = alphabet[(idCounter - 1) % alphabet.length];
    if (!label.trim()) return;
    const newNode = {
      id: `${idCounter}`,
      data: { label: `Node ${labelChar}` },
      position: { x: Math.random() * 300, y: Math.random() * 300 }, style: { borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', backgroundColor: '#e0e7ff' },
    };
    setNodes((nds) => [...nds, newNode]);
    setIdCounter((prev) => prev + 1);
    setLabel('');
  };

  const handleAddEdge = () => {
    if (!from.trim() || !to.trim()) return;
    setEdges((eds) => [
      ...eds,
      {
        id: `e${from}-${to}`,
        source: from,
        target: to,
        markerEnd: { type: MarkerType.ArrowClosed },
      },
    ]);
    setFrom('');
    setTo('');
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-col items-center p-4">
        <div className="mb-4 flex flex-wrap gap-2">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="border px-2 py-1 rounded text-sm w-32 bg-white text-gray-800 placeholder-gray-400"
            placeholder="Node label"
          />
          <button
            onClick={handleAddNode}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            Add Node
          </button>

          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border px-2 py-1 rounded text-sm w-24 bg-white text-gray-800 placeholder-gray-400"
            placeholder="From ID"
          />
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border px-2 py-1 rounded text-sm w-24 bg-white text-gray-800 placeholder-gray-400"
            placeholder="To ID"
          />
          <button
            onClick={handleAddEdge}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
          >
            Add Edge
          </button>
        </div>

        <div className="w-full h-[500px] bg-white rounded shadow border">
          <ReactFlow nodes={nodes} edges={edges} fitView>
            <MiniMap />
            <Controls />
            <Background gap={16} color="#aaa" />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
