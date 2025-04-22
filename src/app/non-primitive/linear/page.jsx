'use client';

import ArrayDemo, { explainArray } from './_components/ArrayDemo';
import LinkedListDemo, { explainLinkedList } from './_components/LinkedListDemo';
import StackDemo, { explainStack } from './_components/StackDemo';
import QueueDemo, { explainQueue } from './_components/QueueDemo';

export default function LinearPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-slate-100 p-8 text-left">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-700 mb-4">📏 Linear Data Structures</h1>
        <p className="text-gray-700 text-lg mb-6">
          Linear data structures organize data in a sequential manner, where elements are stored and accessed in a specific order. They are foundational to many real-world applications and algorithms.
        </p>

        <div className="grid gap-6 grid-cols-1">
  <div className="bg-white border-l-4 border-cyan-400 p-4 rounded shadow">
    <h2 className="text-xl font-semibold text-cyan-700">📦 Array</h2>
    <p className="text-gray-700 mt-2">
      An array is a fixed-size data structure that stores elements of the same type in contiguous memory locations. It allows for efficient indexing and fast retrieval of elements by position. Arrays are ideal when the number of elements is known in advance, such as storing monthly sales data or daily temperatures.
    </p>
    <div className="mt-3 bg-cyan-50 p-3 rounded text-sm">
      <ArrayDemo />
    </div>
  </div>

  <div className="bg-white border-l-4 border-cyan-400 p-4 rounded shadow">
    <h2 className="text-xl font-semibold text-cyan-700">🔗 Linked List</h2>
    <p className="text-gray-700 mt-2">
      A linked list is a dynamic data structure where each element (called a node) contains a value and a reference to the next node. This structure allows efficient insertions and deletions, especially at the beginning or middle. It's commonly used in music playlists, undo features, and memory-efficient storage.
    </p>
    <div className="mt-3 bg-cyan-50 p-3 rounded text-sm">
      <LinkedListDemo />
    </div>
  </div>

  <div className="bg-white border-l-4 border-cyan-400 p-4 rounded shadow">
    <h2 className="text-xl font-semibold text-cyan-700">🧱 Stack</h2>
    <p className="text-gray-700 mt-2">
      A stack is a linear structure that follows the Last In First Out (LIFO) principle. Elements are added and removed from the top of the stack. It is frequently used in recursion, syntax parsing, and the browser's back button feature.
    </p>
    <div className="mt-3 bg-cyan-50 p-3 rounded text-sm">
      <StackDemo />
    </div>
  </div>

  <div className="bg-white border-l-4 border-cyan-400 p-4 rounded shadow">
    <h2 className="text-xl font-semibold text-cyan-700">📬 Queue</h2>
    <p className="text-gray-700 mt-2">
      A queue is a linear data structure that operates on a First In First Out (FIFO) basis. It is useful in scenarios like task scheduling, print queues, and customer service systems where processing occurs in the order of arrival.
    </p>
    <div className="mt-3 bg-cyan-50 p-3 rounded text-sm">
      <QueueDemo />
    </div>
  </div>
</div>


        <p className="mt-6 text-gray-600">
          Linear structures are typically easy to implement and traverse, making them a starting point for learning about algorithmic thinking and efficient memory access.
        </p>
      </div>

      <div className="mt-12 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold text-cyan-700 mb-4">🧠 Under the Hood</h2>
        <h2 className="text-left font-semibold text-gray-700 space-y-3">Let's dive in deep how each of the Demo works in detail</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li><strong>ArrayDemo:</strong> {explainArray()}</li>
          <li><strong>LinkedListDemo:</strong> {explainLinkedList()}</li>
          <li><strong>StackDemo:</strong> {explainStack()}</li>
          <li><strong>QueueDemo:</strong> {explainQueue()}</li>
        </ul>
      </div>
    </main>
  );
}