'use client';

import { useEffect } from 'react';
import LeaderLine from 'leader-line-new';

const Node = ({ id, label }) => {
  const hrefMap = {
    'array': 'non-primitive/linear/static/arrays/',
    'stack': '/stack',
    'queue': '/queue',
    'linkedlist': '/non-primitive/linear/dynamic/linked-list',
    'tree': '/tree',
    'graph': '/graph',
    'linear': 'non-primitive/linear',
    'non-linear': 'non-primitive/non-linear',
    'non-primitive': '/non-primitive'
  };
  const href = hrefMap[id] || `/${id}`;
  return (
    <a href={href} className="no-underline">
      <div
        id={id}
        className="bg-white border border-blue-300 px-4 py-2 rounded shadow text-blue-800 font-semibold text-center min-w-[100px] hover:bg-blue-50 transition"
      >
        {label}
      </div>
    </a>
  );
};

export default function NonPrimitivePage() {
  useEffect(() => {
    let lines = [];
    const connect = (from, to) => {
      const start = document.getElementById(from);
      const end = document.getElementById(to);
      if (start && end) {
        const line = new LeaderLine(start, end, {
          path: 'straight',
          startSocket: 'bottom',
          endSocket: 'top',
          color: '#3b82f6',
          size: 2,
          dash: { animation: true },
          startPlug: 'disc',
          endPlug: 'arrow1',
          startPlugSize: 0.8,
          endPlugSize: 1.2,
          socketGravity: 100
        });
        lines.push(line);
      }
    };

    connect('non-primitive', 'linear');
    connect('non-primitive', 'non-linear');

    const linearChildren = ['static', 'array'];
    const dynamicChildren = ['dynamic', 'stack', 'queue', 'linkedlist'];
    linearChildren.forEach((id, index) => {
      if (index === 0) connect('linear', id);
      else connect(linearChildren[index - 1], id);
    });

    dynamicChildren.forEach((id, index) => {
      if (index === 0) connect('linear', id);
      else connect(dynamicChildren[index - 1], id);
    });

    const nonLinearChildren = ['tree', 'graph'];
    nonLinearChildren.forEach((id, index) => {
      if (index === 0) connect('non-linear', id);
      else connect(nonLinearChildren[index - 1], id);
    });

    return () => {
      lines.forEach((line) => line.remove());
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-slate-100 p-8">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-10">🧩 Non-Primitive Data Structures</h1>

        <div className="flex flex-col items-center gap-6 mb-12">
          <Node id="non-primitive" label="Non-Primitive" />

          <div className="flex flex-row gap-10 justify-center">
            <div className="flex flex-col items-center gap-4">
              <Node id="linear" label="Linear" />
              <div className="flex gap-10">
                <div className="flex flex-col items-center gap-3">
                  <Node id="static" label="Static" />
                  <Node id="array" label="Array" />
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Node id="dynamic" label="Dynamic" />
                  <Node id="stack" label="Stack" />
                  <Node id="queue" label="Queue" />
                  <Node id="linkedlist" label="Linked List" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Node id="non-linear" label="Non-Linear" />
              <Node id="tree" label="Tree" />
              <Node id="graph" label="Graph" />
            </div>
          </div>
        </div>

        <div className="text-left max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">📘 What Are Non-Primitive Structures?</h2>
<p className="text-gray-700 mb-4">
  Non-primitive data structures are the powerful architectures built atop primitive types. They allow you to store, organize, retrieve, and manipulate data efficiently — just like filing cabinets, bookshelves, or maps in the real world.
</p>
<p className="text-gray-700 mb-4">
  They are the foundation of almost every high-level programming concept. Whether you're building a shopping cart, implementing undo functionality, managing playlists, or navigating a 3D scene — you're using non-primitive structures.
</p>
<ul className="list-disc list-inside text-gray-700 space-y-2">
  <li><strong>Linear Structures:</strong> Store data in a sequential manner. Includes arrays, linked lists, stacks, and queues. Perfect for ordered flows like task queues, history stacks, or timelines.</li>
  <li><strong>Non-Linear Structures:</strong> Represent hierarchical or complex relationships. Includes trees (like the DOM in HTML) and graphs (like social networks or route maps).</li>
  <li><strong>Dynamic Operations:</strong> These structures allow insertion, deletion, searching, and traversal — adapting to your application's logic and needs.</li>
  <li><strong>Real-World Use:</strong> Databases use B-Trees, browsers use stacks for history, UIs use queues for rendering events, game AI uses graphs for pathfinding, and JSON data is often structured like trees.</li>
</ul>

<div className="mt-6">
  <h3 className="text-xl font-semibold text-blue-600 mb-2">🔗 Recommended Learning Resources</h3>
  <ul className="list-disc list-inside text-blue-700 space-y-2">
    <li><a href="https://visualgo.net/en" target="_blank" className="underline hover:text-blue-500">VisuAlgo</a> – Visualize common data structures and algorithms interactively.</li>
    <li><a href="https://cs.usfca.edu/~galles/visualization/Algorithms.html" target="_blank" className="underline hover:text-blue-500">USF Algorithm Visualizer</a> – Another great tool to watch operations step-by-step.</li>
    <li><a href="https://www.geeksforgeeks.org/data-structures/" target="_blank" className="underline hover:text-blue-500">GeeksForGeeks</a> – Extensive tutorials and practice problems.</li>
    <li><a href="https://www.youtube.com/watch?v=RBSGKlAvoiM" target="_blank" className="underline hover:text-blue-500">Data Structures Easy to Advanced Course – by freeCodeCamp</a></li>
  </ul>
</div>
        </div>
      </div>
    </main>
  );
}
