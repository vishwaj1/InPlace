'use client';

export default function PrimitivePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-slate-100 p-8 text-left">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">🧬 Primitive Data Structures</h1>
        <p className="text-gray-700 text-lg mb-6">
          Primitive data structures are the most fundamental data types built into programming languages. They are direct representations of values in memory and form the foundation upon which all other data structures are built.
        </p>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          <div className="bg-white rounded-xl shadow-md p-4 border border-blue-100">
            <h2 className="text-lg font-semibold text-blue-700">🔢 Integer (Int)</h2>
            <p className="text-gray-700 text-sm mt-2">
              Stores whole numbers. Commonly used in loops, indexing arrays, counters, and representing quantity or IDs.
            </p>
            <p className="text-sm text-gray-500 mt-1">Example: <code>let age = 30;</code></p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border border-blue-100">
            <h2 className="text-lg font-semibold text-pink-700">🔤 Character (Char)</h2>
            <p className="text-gray-700 text-sm mt-2">
              Represents a single character. Useful in text processing, tokenizing strings, or building simple inputs.
            </p>
            <p className="text-sm text-gray-500 mt-1">Example: <code>char grade = 'A';</code></p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border border-blue-100">
            <h2 className="text-lg font-semibold text-green-700">✅ Boolean (Bool)</h2>
            <p className="text-gray-700 text-sm mt-2">
              Stores true/false values. Critical for decision-making, conditionals, and logic-based operations.
            </p>
            <p className="text-sm text-gray-500 mt-1">Example: <code>bool isAvailable = true;</code></p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border border-blue-100">
            <h2 className="text-lg font-semibold text-yellow-700">🌡 Float</h2>
            <p className="text-gray-700 text-sm mt-2">
              Stores decimal numbers. Widely used in scientific computations, real-time measurements, and currencies.
            </p>
            <p className="text-sm text-gray-500 mt-1">Example: <code>float pi = 3.14;</code></p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border border-blue-100">
            <h2 className="text-lg font-semibold text-purple-700">🧭 Pointer</h2>
            <p className="text-gray-700 text-sm mt-2">
              Stores the address of another variable in memory. Crucial in dynamic memory allocation, data structures like linked lists, and low-level system programming.
            </p>
            <p className="text-sm text-gray-500 mt-1">Example: <code>int *ptr = &value;</code></p>
          </div>
        </div>

        <p className="mt-8 text-md text-gray-600">
          These types are essential in nearly every software program and provide the groundwork for how information is represented and manipulated in memory.
        </p>

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">📚 Recommended Learning Resources</h2>
          <ul className="list-disc list-inside space-y-2 text-blue-800">
            <li>
              <a href="https://www.tutorialspoint.com/data_structures_algorithms/data_structure_primitive.htm" target="_blank" className="underline hover:text-blue-600">TutorialsPoint: Primitive DS Overview</a>
            </li>
            <li>
              <a href="https://www.geeksforgeeks.org/data-structures/" target="_blank" className="underline hover:text-blue-600">GeeksForGeeks - Data Structures Guide</a>
            </li>
            <li>
              <a href="https://en.wikipedia.org/wiki/Data_type" target="_blank" className="underline hover:text-blue-600">Wikipedia: Data Types in Programming</a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );

}
