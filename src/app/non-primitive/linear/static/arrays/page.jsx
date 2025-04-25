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
      title: 'Amazon Shopping Cart Demo',
      description: 'Experience how arrays power e-commerce shopping carts. Add and remove items to see how arrays manage dynamic content.',
      component: () => <AmazonCartDemo products={AmazonproductData} />, 
      explanation: explainAmazonCart 
    },
    { 
      id: 'netflix', 
      label: '🎬 Watchlist', 
      title: 'Netflix Watchlist Demo',
      description: 'See how arrays manage your streaming watchlist. Add movies, reorder them, and remove them from your list.',
      component: () => <NetflixWatchListDemo />, 
      explanation: explainNetflixWatchlist 
    },
    { 
      id: 'youtube', 
      label: '▶️ Video Queue', 
      title: 'YouTube Video Queue Demo',
      description: 'Explore how arrays power video playlists. Add videos, skip to the next one, and manage your queue.',
      component: () => <YouTubeQueueDemo />, 
      explanation: explainYouTubeQueue 
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
  const ActiveExplanation = tabs.find(tab => tab.id === activeTab)?.explanation;
  const ActiveTab = tabs.find(tab => tab.id === activeTab);

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
            {ActiveTab && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{ActiveTab.title}</h3>
                <p className="text-gray-600 mb-4">{ActiveTab.description}</p>
              </div>
            )}
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
          <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center justify-center">
            <span className="bg-blue-100 p-2 rounded-full mr-3">📚</span>
            Educational Content
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-lg border border-blue-100 shadow-sm">
              <h3 className="text-xl font-semibold text-blue-700 mb-3 flex items-center">
                <span className="bg-blue-200 p-1 rounded-full mr-2">🔍</span>
                What are Arrays?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Arrays are collections of elements stored in contiguous memory locations. Each element can be accessed directly using its index, making arrays efficient for random access operations.
              </p>
              <div className="mt-4 bg-blue-100 p-3 rounded-md">
                <p className="text-sm text-blue-800 font-medium">Quick Fact:</p>
                <p className="text-sm text-blue-700">Arrays are the most fundamental data structure in programming, used in virtually every application.</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-white p-5 rounded-lg border border-green-100 shadow-sm">
              <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center">
                <span className="bg-green-200 p-1 rounded-full mr-2">🔑</span>
                Key Characteristics
              </h3>
              <ul className="list-none space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-green-200 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">1</span>
                  <span><strong>Fixed Size:</strong> Traditional arrays have a fixed size determined at declaration</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-200 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">2</span>
                  <span><strong>Contiguous Memory:</strong> Elements are stored in adjacent memory locations</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-200 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">3</span>
                  <span><strong>Random Access:</strong> O(1) time complexity for accessing elements by index</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-200 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">4</span>
                  <span><strong>Index-based:</strong> Elements are accessed using zero-based indexing</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-lg border border-purple-100 shadow-sm">
              <h3 className="text-xl font-semibold text-purple-700 mb-3 flex items-center">
                <span className="bg-purple-200 p-1 rounded-full mr-2">⚡</span>
                Common Operations
              </h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-md border border-purple-100">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-purple-800">Access</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-mono">O(1)</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Direct access using index</p>
                </div>
                <div className="bg-white p-3 rounded-md border border-purple-100">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-purple-800">Search</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-mono">O(n)</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Linear search through elements</p>
                </div>
                <div className="bg-white p-3 rounded-md border border-purple-100">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-purple-800">Insertion</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-mono">O(n)</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">May require shifting elements</p>
                </div>
                <div className="bg-white p-3 rounded-md border border-purple-100">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-purple-800">Deletion</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-mono">O(n)</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">May require shifting elements</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-white p-5 rounded-lg border border-amber-100 shadow-sm">
              <h3 className="text-xl font-semibold text-amber-700 mb-3 flex items-center">
                <span className="bg-amber-200 p-1 rounded-full mr-2">🌐</span>
                Real-World Applications
              </h3>
              <div className="space-y-3">
                <div className="flex items-center bg-white p-3 rounded-md border border-amber-100">
                  <span className="bg-amber-100 text-amber-800 p-2 rounded-full mr-3">🛒</span>
                  <div>
                    <p className="font-medium text-amber-800">E-commerce</p>
                    <p className="text-sm text-gray-600">Shopping carts and product catalogs</p>
                  </div>
                </div>
                <div className="flex items-center bg-white p-3 rounded-md border border-amber-100">
                  <span className="bg-amber-100 text-amber-800 p-2 rounded-full mr-3">🎵</span>
                  <div>
                    <p className="font-medium text-amber-800">Media Players</p>
                    <p className="text-sm text-gray-600">Playlists and video queues</p>
                  </div>
                </div>
                <div className="flex items-center bg-white p-3 rounded-md border border-amber-100">
                  <span className="bg-amber-100 text-amber-800 p-2 rounded-full mr-3">📱</span>
                  <div>
                    <p className="font-medium text-amber-800">Social Media</p>
                    <p className="text-sm text-gray-600">News feeds and user lists</p>
                  </div>
                </div>
                <div className="flex items-center bg-white p-3 rounded-md border border-amber-100">
                  <span className="bg-amber-100 text-amber-800 p-2 rounded-full mr-3">🎮</span>
                  <div>
                    <p className="font-medium text-amber-800">Gaming</p>
                    <p className="text-sm text-gray-600">Inventory systems and leaderboards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-blue-100 to-purple-100 p-5 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">💻 Code Example</h3>
            <div className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
              <pre className="text-sm font-mono">
{`// Creating and manipulating arrays
const fruits = ['apple', 'banana', 'orange'];

// Accessing elements (O(1))
console.log(fruits[0]); // 'apple'

// Adding elements (O(1) at end, O(n) in middle)
fruits.push('grape');    // Add to end
fruits.unshift('lemon'); // Add to beginning

// Removing elements (O(1) at end, O(n) in middle)
fruits.pop();           // Remove from end
fruits.shift();         // Remove from beginning

// Searching (O(n))
const index = fruits.indexOf('banana'); // 1

// Iterating
fruits.forEach(fruit => console.log(fruit));`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
