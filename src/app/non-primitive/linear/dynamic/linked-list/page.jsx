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
import BrowserHistoryDemo, { explainBrowserHistory } from './_components/BrowserHistoryDemo';
import MusicPlaylistDemo, { explainMusicPlaylist } from './_components/MusicPlaylistDemo';
import TextEditorDemo, { explainTextEditor } from './_components/TextEditorDemo';
import UndoRedoDemo, { explainUndoRedo } from './_components/UndoRedoDemo';
import GitVersionControlDemo, { explainGitVersionControl } from './_components/GitVersionControlDemo';

const LinkedListPage = () => {
  const [activeTab, setActiveTab] = useState('browser');

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
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Real-World Applications</h2>
          <p className="text-gray-700 mb-4">
            Linked lists are used in many real-world applications. Click on each tab to see an interactive demo and learn how linked lists are implemented in these scenarios.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTab('browser')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'browser'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Browser History
            </button>
            <button
              onClick={() => setActiveTab('music')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'music'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Music Playlist
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'text'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Text Editor
            </button>
            <button
              onClick={() => setActiveTab('undo')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'undo'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Undo/Redo
            </button>
            <button
              onClick={() => setActiveTab('git')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'git'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Git Version Control
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            {activeTab === 'browser' && (
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Browser History Navigation</h3>
                <p className="text-gray-700 mb-4">
                  Browser history uses a doubly linked list to enable back and forward navigation. Each webpage you visit becomes a node in the list, with pointers to both the previous and next pages.
                </p>
                <BrowserHistoryDemo />
                {/* <div className="mt-6">
                  <h4 className="text-lg font-semibold text-blue-700 mb-2">Implementation Details</h4>
                  {explainBrowserHistory()}
                </div> */}
              </div>
            )}

            {activeTab === 'music' && (
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Music Playlist Management</h3>
                <p className="text-gray-700 mb-4">
                  Music players use linked lists to manage playlists. Each song is a node that points to the next song, allowing for easy navigation and playlist manipulation.
                </p>
                <MusicPlaylistDemo />
                {/* <div className="mt-6">
                  <h4 className="text-lg font-semibold text-blue-700 mb-2">Implementation Details</h4>
                  {explainMusicPlaylist()}
                </div> */}
              </div>
            )}

            {activeTab === 'text' && (
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Text Editor with Undo/Redo</h3>
                <p className="text-gray-700 mb-4">
                  Text editors use linked lists to implement undo and redo functionality. Each text operation is stored as a node, allowing users to move backward and forward through their editing history.
                </p>
                <TextEditorDemo />
                {/* <div className="mt-6">
                  <h4 className="text-lg font-semibold text-blue-700 mb-2">Implementation Details</h4>
                  {explainTextEditor()}
                </div> */}
              </div>
            )}

            {activeTab === 'undo' && (
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Drawing Application with Undo/Redo</h3>
                <p className="text-gray-700 mb-4">
                  Drawing applications use linked lists to track changes, enabling undo and redo operations. Each action (adding or deleting shapes) becomes a node in the list.
                </p>
                <UndoRedoDemo />
                {/* <div className="mt-6">
                  <h4 className="text-lg font-semibold text-blue-700 mb-2">Implementation Details</h4>
                  {explainUndoRedo()}
                </div> */}
              </div>
            )}

            {activeTab === 'git' && (
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Git Version Control</h3>
                <p className="text-gray-700 mb-4">
                  Git uses linked lists to track commit history. Each commit is a node that points to its parent commit, forming a directed acyclic graph (DAG) that represents the project's history.
                </p>
                <GitVersionControlDemo />
                {/* <div className="mt-6">
                  <h4 className="text-lg font-semibold text-blue-700 mb-2">Implementation Details</h4>
                  {explainGitVersionControl()}
                </div> */}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Linked List Operations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Insertion</h3>
              <p className="text-gray-700 mb-2">
                Adding a new node to a linked list is efficient, especially at the beginning or end. Unlike arrays, you don't need to shift elements.
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Insert at beginning: O(1)</li>
                <li>Insert at end: O(n) for singly linked list, O(1) for doubly linked list with tail pointer</li>
                <li>Insert at middle: O(n)</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Deletion</h3>
              <p className="text-gray-700 mb-2">
                Removing a node from a linked list is also efficient, as you only need to update pointers.
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Delete from beginning: O(1)</li>
                <li>Delete from end: O(n) for singly linked list, O(1) for doubly linked list with tail pointer</li>
                <li>Delete from middle: O(n)</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Traversal</h3>
              <p className="text-gray-700 mb-2">
                Accessing elements in a linked list requires traversing from the head node.
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Access by index: O(n)</li>
                <li>Search by value: O(n)</li>
                <li>Traverse entire list: O(n)</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Types of Linked Lists</h3>
              <p className="text-gray-700 mb-2">
                There are several variations of linked lists, each with its own advantages.
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Singly Linked List: Each node points to the next node</li>
                <li>Doubly Linked List: Each node points to both next and previous nodes</li>
                <li>Circular Linked List: The last node points back to the first node</li>
                <li>Circular Doubly Linked List: Combines features of doubly and circular linked lists</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">When to Use Linked Lists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <h3 className="text-xl font-semibold text-green-700 mb-2">Advantages</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Dynamic size - can grow or shrink as needed</li>
                <li>Efficient insertion and deletion at any position</li>
                <li>No need for contiguous memory allocation</li>
                <li>Memory is allocated only when needed</li>
                <li>Ideal for applications with frequent insertions/deletions</li>
              </ul>
            </div>
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <h3 className="text-xl font-semibold text-red-700 mb-2">Disadvantages</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Random access is not possible - must traverse from the beginning</li>
                <li>Extra memory space for pointers</li>
                <li>Not cache-friendly due to non-contiguous memory allocation</li>
                <li>More complex than arrays</li>
                <li>Reverse traversal is difficult in singly linked lists</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedListPage; 