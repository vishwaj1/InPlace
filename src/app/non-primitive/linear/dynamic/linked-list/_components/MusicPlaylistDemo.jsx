'use client';

import { useState } from 'react';

export const explainMusicPlaylist = () => {
  return (
    <div className="mt-4 bg-purple-50 p-4 rounded-lg border border-purple-200">
      <h3 className="text-lg font-semibold text-purple-800 mb-2">How Music Playlists Work with Linked Lists</h3>
      <p className="text-purple-700 mb-2">
        Music playlists are implemented using a singly linked list data structure. Here's how it works:
      </p>
      <ul className="list-disc pl-5 text-purple-700 space-y-1">
        <li>Each song in the playlist becomes a <strong>node</strong> in the linked list</li>
        <li>Each node contains the song data (title, artist) and a pointer to the next song</li>
        <li>The playlist maintains a pointer to the current song being played</li>
        <li>When you click "Next", the playlist moves to the next song by following the pointer</li>
        <li>When you click "Previous", the playlist needs to traverse the list to find the previous song</li>
        <li>Adding a new song creates a new node and links it to the end of the playlist</li>
        <li>Removing a song updates the pointers to skip the removed node</li>
      </ul>
      <div className="mt-3 p-3 bg-purple-100 rounded-md">
        <p className="text-purple-800 font-medium">Code Implementation:</p>
        <pre className="text-xs text-purple-900 mt-1 overflow-x-auto">
{`// Node structure
class SongNode {
  constructor(title, artist) {
    this.title = title;
    this.artist = artist;
    this.next = null;
  }
}

// Playlist implementation
class MusicPlaylist {
  constructor() {
    this.head = null;
    this.current = null;
    this.length = 0;
  }
  
  addSong(title, artist) {
    const newNode = new SongNode(title, artist);
    
    if (!this.head) {
      this.head = newNode;
      this.current = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    
    this.length++;
  }
  
  removeSong(title) {
    if (!this.head) return;
    
    if (this.head.title === title) {
      this.head = this.head.next;
      if (this.current === this.head) {
        this.current = this.head;
      }
      this.length--;
      return;
    }
    
    let current = this.head;
    while (current.next && current.next.title !== title) {
      current = current.next;
    }
    
    if (current.next) {
      if (this.current === current.next) {
        this.current = current.next.next || this.head;
      }
      current.next = current.next.next;
      this.length--;
    }
  }
  
  playNext() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
      return this.current;
    }
    return null;
  }
  
  playPrevious() {
    if (!this.head || this.current === this.head) return null;
    
    let current = this.head;
    while (current.next !== this.current) {
      current = current.next;
    }
    
    this.current = current;
    return this.current;
  }
}`}
        </pre>
      </div>
    </div>
  );
};

const MusicPlaylistDemo = () => {
  const [playlist, setPlaylist] = useState([
    { id: 1, title: 'Shape of You', artist: 'Ed Sheeran' },
    { id: 2, title: 'Blinding Lights', artist: 'The Weeknd' },
    { id: 3, title: 'Dance Monkey', artist: 'Tones and I' }
  ]);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [newSong, setNewSong] = useState({ title: '', artist: '' });
  const [showExplanation, setShowExplanation] = useState(false);

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
      
      <div className="mt-6">
        <button 
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center gap-1 text-purple-600 hover:text-purple-800"
        >
          <span>{showExplanation ? 'Hide' : 'Show'} Implementation Details</span>
          <span>{showExplanation ? '▲' : '▼'}</span>
        </button>
        {showExplanation && explainMusicPlaylist()}
      </div>
    </div>
  );
};

export default MusicPlaylistDemo; 