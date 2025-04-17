'use client';

import { useState } from 'react';
import ArrayVisualizer from './arrayvisualizer';
import AmazonCartDemo from './AmazonCartDemo';
import NetflixWatchlistDemo from './NetflixWatchListDemo';
import YouTubeQueueDemo from './YouTubeQueueDemo';

import AmazonproductData from './Amazonproduct';

import { motion } from 'framer-motion';
import { Reorder } from 'framer-motion';


import Lottie from 'lottie-react';
import cartAnim from '/public/animations/amazoncart.json';
import netflixAnim from '/public/animations/netflix.json';
import youtubeAnim from '/public/animations/youtube.json';
import chromeAnim from '/public/animations/chrome.json';
import trelloAnim from '/public/animations/trello.json';


export default function ArraysPage() {
  const realWorldUses = [
    {
      title: 'Amazon Cart System',
      description:
        'Amazon uses arrays to manage the list of items in a user\'s cart. Each time an item is added, it is pushed to an array representing the cart. When the user removes an item, it is popped or spliced from that array.',
      icon: '🛒',
      animation: cartAnim,
      interactiveDemo: <AmazonCartDemo products={AmazonproductData} />
    },
    {
      title: 'Netflix Watchlist',
      description:
        'Netflix maintains your watchlist as an array of movies/shows. Arrays allow fast appending, indexing, and ordering of the items in your list.',
      icon: '🎬',
      animation: netflixAnim,
      interactiveDemo: <NetflixWatchlistDemo />

    },
    {
      title: 'YouTube Video Queue',
      description:
        'YouTube uses an array to manage the queue of videos to be played next. Users can add, remove, or reorder videos in this list.',
      icon: '📺',
      animation: youtubeAnim,
      interactiveDemo: <YouTubeQueueDemo/>
    },
    {
      title: 'Google Chrome Tabs',
      description:
        'Your open tabs in Chrome are stored in an array. When you open or close tabs, Chrome updates the tab array to reflect the current session.',
      icon: '🌐',
      animation: chromeAnim
    },
    {
      title: 'Trello Task Management',
      description:
        'Each Trello column holds a list of cards. These cards are stored in arrays, which can be reordered with drag-and-drop and moved between columns.',
      icon: '📝',
      animation: trelloAnim
    },
  ];

  const [topics] = useState(realWorldUses);

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
          Arrays are ordered collections used everywhere in web development. This page itself renders content from an array of examples below!
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🧑‍💻 Real-World Use Cases</h2>
          <div className="space-y-6 text-left max-w-full overflow-hidden">
            {topics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col sm:flex-row items-start gap-4 bg-slate-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="w-24 h-24">
                    <Lottie animationData={topic.animation} loop autoplay className="w-24 h-24" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{topic.icon} {topic.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
                  {topic.interactiveDemo && topic.interactiveDemo}
              </div>
              </motion.div>
            ))}
          </div>
        </div>

        <ArrayVisualizer />

        <div className="mt-10 bg-gradient-to-tr from-white to-blue-50 border border-blue-200 p-6 rounded-2xl shadow-xl text-left">
  <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
    💡 Under the Hood
  </h2>
  <p className="text-sm text-gray-700 mb-4">
    This page demonstrates how <span className="font-semibold">linear data structures</span> — specifically arrays — power real-world application behaviors. Each interactive demo below uses arrays to manage dynamic, ordered content:
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
      </div>
    </main>
  );
}
