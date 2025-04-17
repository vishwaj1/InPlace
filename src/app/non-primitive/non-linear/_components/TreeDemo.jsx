'use client';

import { useState, useMemo } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';

export default function TreeDemo() {
  const [tree, setTree] = useState([
    { id: 1, label: 'Root', children: [
      { id: 2, label: 'Child A', children: [
        { id: 4, label: 'Leaf A1' },
        { id: 5, label: 'Leaf A2' }
      ]},
      { id: 3, label: 'Child B', children: [] }
    ] }
  ]);
  const [parentId, setParentId] = useState('');
  const [label, setLabel] = useState('');
  const [idCounter, setIdCounter] = useState(6);
  const [deleteId, setDeleteId] = useState('');
  const [searchId, setSearchId] = useState('');
  const [highlightedNode, setHighlightedNode] = useState(null);

  const insertNode = (tree, parentId, newNode) => {
    return tree.map(node => {
      if (node.id === parseInt(parentId)) {
        return { ...node, children: [...(node.children || []), newNode] };
      } else if (node.children) {
        return { ...node, children: insertNode(node.children, parentId, newNode) };
      }
      return node;
    });
  };

  const handleAdd = () => {
    if (!label.trim() || !parentId.trim()) return;
    const newNode = { id: idCounter, label, children: [] };
    const newTree = insertNode(tree, parentId, newNode);
    setTree(newTree);

    // Find max id in updated tree to reset counter
    const findMaxId = (nodes) => nodes.reduce((max, node) => {
      return Math.max(max, node.id, ...(node.children ? [findMaxId(node.children)] : []));
    }, 0);

    const maxId = findMaxId(newTree);
    setIdCounter(maxId + 1);

    setLabel('');
    setParentId('');
    setParentId('');
  };

  const flattenTree = (tree, parent = null, level = 0, pos = { x: 0 }, nodes = [], edges = []) => {
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      const x = pos.x * 200;
      const y = level * 100;

      nodes.push({ id: `${node.id}`, data: { label: `${node.label} (#${node.id})` }, style: highlightedNode === node.id ? { border: '2px solid red' } : {}, position: { x, y } });
      if (parent) {
        edges.push({ id: `e${parent.id}-${node.id}`, source: `${parent.id}`, target: `${node.id}` });
      }

      if (node.children?.length) {
        flattenTree(node.children, node, level + 1, { x: pos.x }, nodes, edges);
        pos.x += node.children.length;
      } else {
        pos.x++;
      }
    }
    return { nodes, edges };
  };

  const { nodes, edges } = useMemo(() => flattenTree(tree), [tree, highlightedNode]);

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
          <input
            type="number"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="border px-2 py-1 rounded text-sm w-32 bg-white text-gray-800 placeholder-gray-400"
            placeholder="Parent ID"
          />
          <button
            onClick={handleAdd}
            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm"
          >
            Add Node
          </button>
        </div>

        <div className="w-full h-[500px] bg-white rounded shadow border">
          <ReactFlow nodes={nodes} edges={edges} fitView>
            <MiniMap />
            <Controls />
            <Background gap={16} color="#aaa" />
          </ReactFlow>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
          <input
            type="number"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            className="border px-2 py-1 rounded text-sm w-32 bg-white text-gray-800 placeholder-gray-400"
            placeholder="Delete ID"
          />
          <button
            onClick={() => {
              const deleteRecursively = (nodes, idToDelete) => {
                return nodes
                  .filter(node => node.id !== parseInt(idToDelete))
                  .map(node => ({
                    ...node,
                    children: deleteRecursively(node.children || [], idToDelete)
                  }));
              };
              setTree(deleteRecursively(tree, deleteId));
              setDeleteId('');
            }}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
          >
            Delete Node
          </button>

          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="border px-2 py-1 rounded text-sm w-32 bg-white text-gray-800 placeholder-gray-400"
            placeholder="Search ID"
          />
          <button
            onClick={() => setHighlightedNode(parseInt(searchId))}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
          >
            Search Node
          </button>
        </div>
      </div>
    </div>
  );
}  

