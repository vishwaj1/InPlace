'use client';

import Link from 'next/link';

export default function HomePage() {
  const topics = [
    { name: 'Arrays', path: '/arrays' },
    { name: 'Linked Lists', path: '/linked-lists' },
    { name: 'Trees', path: '/trees' },
    { name: 'Graphs', path: '/graphs' },
    { name: 'Stacks & Queues', path: '/stacks-queues' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-white p-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Master Data Structures & Algorithms
        </h1>

        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
          Welcome to your interactive DSA learning playground. Each page on this site is implemented using the very data structure it teaches.
          Explore real-world use cases, experiment with live demos, and peek behind the curtain of practical implementation.
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📚 Explore Topics</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <li key={topic.name}>
                <Link href={topic.path}>
                  <div className="p-6 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 font-semibold text-lg transition-all shadow-sm hover:shadow-md cursor-pointer">
                    {topic.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <footer className="mt-16 text-sm text-gray-500">
          Built with ❤️ using Next.js 13, Tailwind CSS, and real developer stories.
        </footer>
      </div>
    </main>
  );
}
