'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import LeaderLine from 'leader-line-new';

const dataMap = {
  Primitive: [
    { label: 'Int' },
    { label: 'Char' },
    { label: 'Bool' },
    { label: 'Float' },
    { label: 'Pointer' }
  ],
  'Non-Primitive': {
    Linear: {
      Static: [{ label: 'Array', href: '/arrays' }],
      Dynamic: [
        { label: 'Linked List', href: '/linkedlist' },
        { label: 'Stack', href: '/stack' },
        { label: 'Queue', href: '/queue' }
      ]
    },
    'Non-Linear': [
      { label: 'Tree', href: '/tree' },
      { label: 'Graph', href: '/graph' }
    ]
  }
};

const Node = ({ id, label, href, className }) => (
  <motion.div
    id={id}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`min-w-[120px] text-center bg-white border border-blue-300 px-6 py-3 rounded-md shadow-md text-base font-semibold text-blue-800 ${className}`}
  >
    {href ? <Link href={href}>{label}</Link> : label}
  </motion.div>
);

export default function HomePage() {
  useEffect(() => {
    const lines = [];
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
          endPlugSize: 1.5,
          startPlugSize: 0.8,
          socketGravity: 100
        });
        lines.push(line);
      }
    };

    connect('ds', 'primitive');
    connect('ds', 'non-primitive');

    dataMap.Primitive.forEach((item, index, arr) => {
      const id = item.label.toLowerCase();
      if (index === 0) {
        connect('primitive', id);
      } else {
        connect(arr[index - 1].label.toLowerCase(), id);
      }
    });

    connect('non-primitive', 'linear');
    connect('non-primitive', 'non-linear');

    connect('linear', 'static');
    connect('linear', 'dynamic');
    connect('static', 'array');
    ['linked list', 'stack', 'queue'].forEach((id, index, arr) => {
      if (index === 0) {
        connect('dynamic', id);
      } else {
        connect(arr[index - 1], id);
      }
    });
    ['tree', 'graph'].forEach((id, index, arr) => {
      if (index === 0) {
        connect('non-linear', id);
      } else {
        connect(arr[index - 1], id);
      }
    });

    return () => {
      lines.forEach((line) => line.remove());
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-white p-6 md:p-12 overflow-x-scroll min-w-[1024px]">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          InPlace
        </h1>
        <h3 className="text-3xl font-semibold text-gray-700 mb-10">
          Interactive Node-based Platform for Learning Algorithms, Code & Execution
        </h3>

        <div className="flex flex-col items-center gap-12">
          <Node id="ds" label="Data Structure" className="bg-indigo-200 text-black" />

          <div className="flex flex-col lg:flex-row justify-center gap-10 items-start lg:items-center">
            {/* Primitive Branch */}
            <div className="flex flex-col items-center gap-4">
              <Node id="primitive" label="Primitive" className="bg-blue-300" />
              {dataMap.Primitive.map((item) => (
                <Node key={item.label} id={item.label.toLowerCase()} label={item.label} className="bg-blue-100" />
              ))}
            </div>

            {/* Non-Primitive Branch */}
            <div className="flex flex-col items-center gap-6">
              <Node id="non-primitive" label="Non-Primitive" className="bg-pink-300" />

              <div className="flex flex-col xl:flex-row justify-center items-start xl:items-center gap-10">
                {/* Linear */}
                <div className="flex flex-col items-center gap-4">
                  <Node id="linear" label="Linear" className="bg-cyan-200" />
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="flex flex-col items-center gap-3">
                      <Node id="static" label="Static" className="bg-cyan-100" />
                      {dataMap['Non-Primitive'].Linear.Static.map((s) => (
                        <Node key={s.label} id={s.label.toLowerCase()} label={s.label} href={s.href} className="bg-teal-200" />
                      ))}
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <Node id="dynamic" label="Dynamic" className="bg-cyan-100" />
                      {dataMap['Non-Primitive'].Linear.Dynamic.map((d) => (
                        <Node key={d.label} id={d.label.toLowerCase()} label={d.label} href={d.href} className="bg-teal-200" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Non-Linear */}
                <div className="flex flex-col items-center gap-4">
                  <Node id="non-linear" label="Non-Linear" className="bg-violet-200" />
                  {dataMap['Non-Primitive']['Non-Linear'].map((n) => (
                    <Node key={n.label} id={n.label.toLowerCase()} label={n.label} href={n.href} className="bg-violet-100" />
                  ))}
                </div>
              </div>
            </div>
          </div>


          <div className="mt-16 text-left bg-white rounded-xl shadow-inner p-6 border border-blue-100 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">🔍 Under the Hood</h2>
            <p className="text-gray-700 mb-3">
              This page itself is a live demonstration of how data structures can be used to model and render a visual hierarchy. Here&apos;s how:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                The core structure of the diagram is powered by a nested JavaScript <code>Object</code> called <code>dataMap</code>, which mimics a tree-like structure.
              </li>
              <li>
                The <code>Primitive</code> and <code>Non-Primitive</code> categories branch from the root node (<code>Data Structure</code>), and each sub-category is rendered using <code>.map()</code> to loop through children.
              </li>
              <li>
                Each node you see is a reusable React component called <code>Node</code>, which receives props like <code>id</code>, <code>label</code>, and an optional <code>href</code> for navigation.
              </li>
              <li>
                The connections between nodes are drawn dynamically using <code>LeaderLine</code>, a library that attaches animated arrows between DOM elements.
              </li>
              <li>
                Arrows are connected programmatically using their element IDs and stored in an array so they can be cleaned up on page unmount.
              </li>
              <li>
                The layout and responsiveness are handled by <code>Tailwind CSS</code>, and the entire page is client-rendered via the <code>&apos;use client&apos;</code> directive.
              </li>
              <li>
                The animations, such as hover/tap effects on nodes, are provided by <code>Framer Motion</code>.
              </li>
            </ul>
            <p className="mt-4 text-blue-600 font-medium">
              In essence, this page uses a real-world tree-like structure and array-based rendering to reflect how data structures work — visually and interactively.
            </p>
          </div>

          <footer className="mt-20 text-sm text-gray-500">
            Built with ❤️ using Next.js 13, Tailwind CSS, and real developer stories.
          </footer>
        </div>
      </div>
    </main>
  );
}
