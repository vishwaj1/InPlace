'use client';

import TreeDemo , {explainTree} from './_components/TreeDemo';
import GraphDemo,{explainGraph} from './_components/GraphDemo';

export default function NonLinearPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-slate-100 p-8 text-left">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">🌳 Non-Linear Data Structures</h1>
        <p className="text-gray-700 text-lg mb-6">
          Non-linear data structures are used when data is not arranged sequentially. These structures are powerful when modeling complex relationships, hierarchies, and graphs.
        </p>

        <div className="space-y-6">
          <div className="bg-white border-l-4 border-purple-400 p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-purple-700">🌲 Tree</h2>
            <p className="text-gray-700 mt-2">
              Trees are hierarchical structures made up of nodes, where each node has a parent and potentially many children. They are essential in file systems, JSON data, and parsing expressions. Each tree starts with a root node, and branches out into levels.
            </p>
            <div className="mt-3 bg-purple-50 p-3 rounded">
              <TreeDemo />
              <li><strong>{explainTree()}</strong></li>

            </div>
          </div>

          <div className="bg-white border-l-4 border-purple-400 p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-purple-700">🌐 Graph</h2>
            <p className="text-gray-700 mt-2">
              Graphs represent relationships between entities. Nodes are connected by edges and can be directed or undirected. They are foundational in social networks, recommendation engines, GPS systems, and dependency resolution.
            </p>
            <div className="mt-3 bg-purple-50 p-3 rounded">
              <GraphDemo />
              <li><strong>{explainGraph()}</strong></li>
            </div>
          </div>
        </div>

        <p className="mt-6 text-gray-600">
          Mastering non-linear structures helps build scalable systems like file explorers, AI search trees, and recommendation engines.
        </p>
      </div>
    </main>
  );
}
