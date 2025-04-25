'use client';

import { useState } from 'react';
import ArrayVisualizer from './arrayvisualizer';
import AmazonCartDemo, { explainAmazonCart } from './AmazonCartDemo';
import NetflixWatchListDemo, { explainNetflixWatchlist } from './NetflixWatchListDemo';
import YouTubeQueueDemo, { explainYouTubeQueue } from './YouTubeQueueDemo';

import AmazonproductData from './Amazonproduct';

import { motion } from 'framer-motion';
import { Reorder } from 'framer-motion';

export default function ArraysPage() {
  const [activeTab, setActiveTab] = useState('amazon');

  const tabs = [
    { 
      id: 'amazon', 
      label: '🛒 Shopping Cart', 
      component: () => <AmazonCartDemo products={AmazonproductData} />, 
      explanation: explainAmazonCart 
    },
    { 
      id: 'netflix', 
      label: '🎬 Watchlist', 
      component: () => <NetflixWatchListDemo />, 
      explanation: explainNetflixWatchlist 
    },
    { 
      id: 'youtube', 
      label: '▶️ Video Queue', 
      component: () => <YouTubeQueueDemo />, 
      explanation: explainYouTubeQueue 
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
  const ActiveExplanation = tabs.find(tab => tab.id === activeTab)?.explanation;

  const [items, setItems] = useState([
    {
      icon: '🛒',
      title: 'Amazon Cart',
      desc: 'The shopping cart is an array that dynamically stores items added by the user. Items are removed using array methods like splice() or filter(), and rendered using map().'
    },
    {
      icon: '🎬',
      title: 'Netflix Watchlist',
      desc: 'The watchlist is an array of media items. Arrays allow fast appending, random access via indexing, and reordering — just like in a real streaming platform.'
    },
    {
      icon: '📺',
      title: 'YouTube Queue',
      desc: 'The queue uses a dynamic array to model playlist behavior. Videos are added, skipped, or removed — simulating FIFO with array operations.'
    }
  ]);
  

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-slate-100 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Arrays in Real Development
        </h1>

        <p className="text-lg text-gray-700 mb-10">
          Arrays are ordered collections used everywhere in web development. This page demonstrates how arrays power real-world applications.
        </p>

        <ArrayVisualizer />

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">🔄 Interactive Demos</h2>
          <div className="flex space-x-4 mb-6 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 px-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-4">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>

        <div className="mt-10 bg-gradient-to-tr from-white to-blue-50 border border-blue-200 p-6 rounded-2xl shadow-xl text-left">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            💡 Under the Hood
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            This page demonstrates how <span className="font-semibold">linear data structures</span> — specifically arrays — power real-world application behaviors. Each interactive demo above uses arrays to manage dynamic, ordered content:
          </p>
          <Reorder.Group axis="y" onReorder={setItems} values={items} className="space-y-4">
            {items.map((item, index) => (
              <Reorder.Item
                key={item.title}
                value={item}
                className="bg-white p-4 rounded-lg shadow-lg border border-blue-200 cursor-grab active:cursor-grabbing hover:shadow-xl transition-transform"
              >
                <strong className="text-blue-700 block mb-1 text-base">{item.icon} {item.title}</strong>
                <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
              </Reorder.Item>
            ))}
          </Reorder.Group>
          <p className="mt-6 text-sm text-gray-700">
            Even this explanation list is generated using an array of objects and rendered with <code>Array.map()</code> — and yes, it's even draggable thanks to array reordering logic.
            <span className="block mt-2 font-medium text-blue-600">Snap! Even this is built using arrays ✨</span>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">📚 Educational Content</h2>
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold text-blue-600">What are Arrays?</h3>
            <p className="text-gray-700">
              Arrays are collections of elements stored in contiguous memory locations. Each element can be accessed directly using its index, making arrays efficient for random access operations.
            </p>

            <h3 className="text-xl font-semibold text-blue-600 mt-6">Key Characteristics</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li><strong>Fixed Size:</strong> Traditional arrays have a fixed size determined at declaration</li>
              <li><strong>Contiguous Memory:</strong> Elements are stored in adjacent memory locations</li>
              <li><strong>Random Access:</strong> O(1) time complexity for accessing elements by index</li>
              <li><strong>Index-based:</strong> Elements are accessed using zero-based indexing</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-600 mt-6">Common Operations</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li><strong>Access:</strong> O(1) - Direct access using index</li>
              <li><strong>Search:</strong> O(n) - Linear search through elements</li>
              <li><strong>Insertion:</strong> O(n) - May require shifting elements</li>
              <li><strong>Deletion:</strong> O(n) - May require shifting elements</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-600 mt-6">Real-World Applications</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li><strong>E-commerce:</strong> Shopping carts and product catalogs</li>
              <li><strong>Media Players:</strong> Playlists and video queues</li>
              <li><strong>Social Media:</strong> News feeds and user lists</li>
              <li><strong>Gaming:</strong> Inventory systems and leaderboards</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
