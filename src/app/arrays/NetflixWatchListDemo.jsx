'use client';

import { useState } from 'react';

const defaultMovies = [
    'Inception', 'The Dark Knight', 'Stranger Things', 'Black Mirror', 'Interstellar',
    'Breaking Bad', 'Money Heist', 'The Witcher', 'Squid Game', 'The Crown',
    'Loki', 'WandaVision', 'The Mandalorian', 'Peaky Blinders', 'House of Cards',
    'Narcos', 'Ozark', 'You', 'The Umbrella Academy', 'Better Call Saul',
    'Daredevil', 'Jessica Jones', 'The Queen’s Gambit', 'Mindhunter', 'Lucifer',
    'The Boys', 'The Office', 'Friends', 'How I Met Your Mother', 'Brooklyn Nine-Nine',
    'Severance', 'The Morning Show', 'Ted Lasso', 'The Bear', 'The Last of Us',
    'Avatar: The Way of Water', 'Everything Everywhere All At Once', 'Top Gun: Maverick', 'John Wick 4', 'Dune',
    'Oppenheimer', 'Barbie', 'The Social Network', 'Fight Club', 'The Matrix',
    'Gladiator', 'Parasite', 'The Godfather', 'Pulp Fiction', 'Forrest Gump'
  ];
  

export default function NetflixWatchlistDemo() {
  const [watchlist, setWatchlist] = useState([]);

  const addMovie = () => {
    const randomMovie = defaultMovies[Math.floor(Math.random() * defaultMovies.length)];
    setWatchlist([...watchlist, randomMovie]);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newList = [...watchlist];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    setWatchlist(newList);
  };

  const moveDown = (index) => {
    if (index === watchlist.length - 1) return;
    const newList = [...watchlist];
    [newList[index + 1], newList[index]] = [newList[index], newList[index + 1]];
    setWatchlist(newList);
  };

  const removeMovie = (index) => {
    const newList = [...watchlist];
    newList.splice(index, 1);
    setWatchlist(newList);
  };

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">🎬 Your Watchlist</h4>
      <div className="flex gap-2 mb-4">
        <button
          onClick={addMovie}
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-1 rounded shadow"
        >
          Add Random Movie
        </button>
      </div>
      {watchlist.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No movies in your list</p>
      ) : (
        <ul className="space-y-2 text-left">
          {watchlist.map((movie, index) => (
            <li
              key={index}
              className="bg-purple-50 border border-purple-200 rounded p-3 shadow-sm flex justify-between items-center"
            >
              <div>
                <span className="text-purple-800 font-semibold">{index + 1}.</span>{' '}
                <span className="text-gray-800">{movie}</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => moveUp(index)}
                  className="text-xs px-2 py-1 bg-purple-200 rounded hover:bg-purple-300"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveDown(index)}
                  className="text-xs px-2 py-1 bg-purple-200 rounded hover:bg-purple-300"
                >
                  ↓
                </button>
                <button
                  onClick={() => removeMovie(index)}
                  className="text-xs px-2 py-1 bg-red-400 text-white rounded hover:bg-red-500"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
