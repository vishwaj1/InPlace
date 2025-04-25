'use client';

import { useState } from 'react';

const MusicPlaylistDemo = () => {
  const [playlist, setPlaylist] = useState([
    { id: 1, title: 'Shape of You', artist: 'Ed Sheeran' },
    { id: 2, title: 'Blinding Lights', artist: 'The Weeknd' },
    { id: 3, title: 'Dance Monkey', artist: 'Tones and I' }
  ]);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [newSong, setNewSong] = useState({ title: '', artist: '' });

  const addSong = () => {
    if (newSong.title.trim() === '' || newSong.artist.trim() === '') return;
    setPlaylist([
      ...playlist,
      { id: playlist.length + 1, title: newSong.title, artist: newSong.artist }
    ]);
    setNewSong({ title: '', artist: '' });
  };

  const removeSong = (id) => {
    setPlaylist(playlist.filter(song => song.id !== id));
    if (currentSong >= playlist.length - 1) {
      setCurrentSong(Math.max(0, playlist.length - 2));
    }
  };

  const playNext = () => {
    if (currentSong < playlist.length - 1) {
      setCurrentSong(currentSong + 1);
    } else {
      setCurrentSong(0);
    }
  };

  const playPrevious = () => {
    if (currentSong > 0) {
      setCurrentSong(currentSong - 1);
    } else {
      setCurrentSong(playlist.length - 1);
    }
  };

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          value={newSong.title}
          onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
          placeholder="Song title"
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
        <input
          type="text"
          value={newSong.artist}
          onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
          placeholder="Artist"
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
        <button
          onClick={addSong}
          className="px-3 py-2 bg-purple-500 text-white rounded-md text-sm hover:bg-purple-600"
        >
          Add Song
        </button>
      </div>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <div className="text-sm font-medium text-gray-700 mb-1">Now Playing:</div>
        <div className="text-lg font-semibold text-purple-600">
          {playlist[currentSong].title}
        </div>
        <div className="text-sm text-gray-600">{playlist[currentSong].artist}</div>
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={playPrevious}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            ⏮️
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-purple-500 rounded-full text-white hover:bg-purple-600"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button
            onClick={playNext}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            ⏭️
          </button>
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-700 mb-2">Playlist:</div>
        <div className="space-y-1">
          {playlist.map((song, index) => (
            <div
              key={song.id}
              className={`p-2 rounded-md text-sm flex justify-between items-center ${
                index === currentSong
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-gray-50 text-gray-700'
              }`}
            >
              <div>
                {song.title} - {song.artist}
              </div>
              <button
                onClick={() => removeSong(song.id)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlaylistDemo; 