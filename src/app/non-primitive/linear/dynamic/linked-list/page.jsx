'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import browserAnim from '/public/animations/browser.json';
import musicAnim from '/public/animations/music.json';
import textAnim from '/public/animations/text.json';
import undoAnim from '/public/animations/undo.json';
import gitAnim from '/public/animations/git.json';

// Import modularized components
import BrowserHistoryDemo from './_components/BrowserHistoryDemo';
import MusicPlaylistDemo from './_components/MusicPlaylistDemo';
import TextEditorDemo from './_components/TextEditorDemo';
import UndoRedoDemo from './_components/UndoRedoDemo';
import GitVersionControlDemo from './_components/GitVersionControlDemo';

const LinkedListPage = () => {
  const realWorldUses = [
    {
      title: 'Browser History',
      description:
        'Your browser\'s back/forward navigation uses a doubly linked list. Each page you visit is a node, with pointers to the previous and next pages, allowing seamless navigation through your browsing history.',
      icon: '🌐',
      animation: browserAnim,
      interactiveDemo: <BrowserHistoryDemo />
    },
    {
      title: 'Music Playlist',
      description:
        'Music players use linked lists to manage playlists. Each song points to the next one, allowing for easy insertion, deletion, and traversal of songs in your playlist.',
      icon: '🎵',
      animation: musicAnim,
      interactiveDemo: <MusicPlaylistDemo />
    },
    {
      title: 'Text Editor',
      description:
        'Text editors use linked lists to store text. Each character is a node, making it efficient to insert or delete text anywhere in the document without shifting the entire content.',
      icon: '📝',
      animation: textAnim,
      interactiveDemo: <TextEditorDemo />
    },
    {
      title: 'Undo/Redo Operations',
      description:
        'Applications use linked lists to implement undo/redo functionality. Each action is a node, allowing you to move backward and forward through your action history.',
      icon: '↩️',
      animation: undoAnim,
      interactiveDemo: <UndoRedoDemo />
    },
    {
      title: 'Git Version Control',
      description:
        'Git uses linked lists to track file versions. Each commit is a node pointing to its parent, creating a tree-like structure of your project\'s history.',
      icon: '📦',
      animation: gitAnim,
      interactiveDemo: <GitVersionControlDemo />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-indigo-900 mb-2">Linked Lists in Real Development</h1>
        <p className="text-lg text-indigo-700 mb-8">Powering dynamic data structures in modern applications</p>
        
        <div className="grid grid-cols-1 gap-8">
          {realWorldUses.map((use, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 flex-shrink-0">
                  <Lottie animationData={use.animation} loop autoplay className="w-24 h-24" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-indigo-900 mb-2">{use.icon} {use.title}</h2>
                  <p className="text-gray-700">{use.description}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-indigo-800 mb-4">Interactive Demo</h3>
                {use.interactiveDemo}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkedListPage; 