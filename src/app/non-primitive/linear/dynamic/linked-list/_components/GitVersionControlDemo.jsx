'use client';

import { useState } from 'react';

const GitVersionControlDemo = () => {
  const [commits, setCommits] = useState([
    { id: '1', message: 'Initial commit', parent: null },
    { id: '2', message: 'Add login page', parent: '1' },
    { id: '3', message: 'Fix login bug', parent: '2' },
    { id: '4', message: 'Add user profile', parent: '2' },
    { id: '5', message: 'Merge user profile', parent: '3' }
  ]);
  const [newCommit, setNewCommit] = useState('');
  const [selectedCommit, setSelectedCommit] = useState(null);

  const addCommit = () => {
    if (newCommit.trim() === '') return;
    
    const newId = (commits.length + 1).toString();
    const parentId = selectedCommit || commits[commits.length - 1].id;
    
    setCommits([
      ...commits,
      { id: newId, message: newCommit, parent: parentId }
    ]);
    
    setNewCommit('');
  };

  const checkoutCommit = (id) => {
    setSelectedCommit(id);
  };

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={newCommit}
          onChange={(e) => setNewCommit(e.target.value)}
          placeholder="Commit message"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
        <button
          onClick={addCommit}
          className="px-3 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600"
        >
          Commit
        </button>
      </div>
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Commit History:</div>
        <div className="space-y-2">
          {commits.map(commit => (
            <div
              key={commit.id}
              className={`p-3 rounded-md text-sm ${
                commit.id === selectedCommit
                  ? 'bg-orange-100 text-orange-800 border border-orange-300'
                  : 'bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded mr-2">
                    {commit.id.substring(0, 7)}
                  </span>
                  {commit.message}
                </div>
                <button
                  onClick={() => checkoutCommit(commit.id)}
                  className={`px-2 py-1 rounded-md text-xs ${
                    commit.id === selectedCommit
                      ? 'bg-orange-200 text-orange-800'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Checkout
                </button>
              </div>
              {commit.parent && (
                <div className="text-xs text-gray-500 mt-1">
                  Parent: {commit.parent.substring(0, 7)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100 p-3 rounded-md">
        <div className="text-sm font-medium text-gray-700 mb-1">Current Branch:</div>
        <div className="text-lg font-semibold text-orange-600">
          {selectedCommit ? `Commit ${selectedCommit}` : 'main'}
        </div>
      </div>
    </div>
  );
};

export default GitVersionControlDemo; 