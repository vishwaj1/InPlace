'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  PlayCircle,
  PauseCircle,
  SkipForward,
  ArrowUp,
  ArrowDown,
  PlusCircle,
  Trash2
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// Dynamically import animations
const youtubeAnim = dynamic(() => import('/public/animations/youtube.json'), { ssr: false });

const videoLibrary = [
  'React Crash Course',
  'Understanding Closures in JavaScript',
  'Build a Netflix Clone',
  'Mastering CSS Grid',
  'JavaScript Call Stack Explained',
  'Next.js Full Tutorial',
  'TypeScript in 30 Minutes',
  'Intro to Node.js',
  'React Server Components',
  'State Management with Redux'
];

export const explainYouTubeQueue = () => {
  return (
    <div className="mt-4 bg-red-50 p-4 rounded-lg border border-red-200">
      <h3 className="text-lg font-semibold text-red-800 mb-2">How Video Queues Work with Arrays</h3>
      <p className="text-red-700 mb-2">
        YouTube's video queue system uses arrays to manage the playlist of videos. Here's how it works:
      </p>
      <ul className="list-disc pl-5 text-red-700 space-y-1 text-left">
        <li>Each video in the queue is an <strong>element</strong> in the array</li>
        <li>When a user adds a video, it's pushed to the end of the array</li>
        <li>When a video finishes playing, it's removed from the front of the array</li>
        <li>Arrays allow for easy reordering of videos using array methods</li>
        <li>The array maintains the order of videos as specified by the user</li>
        <li>Arrays enable quick access to any video by its index</li>
      </ul>
      <div className="mt-3 p-3 bg-red-100 rounded-md">
        <p className="text-red-800 font-medium">Code Implementation:</p>
        <pre className="text-xs text-red-900 mt-1 overflow-x-auto text-left">
{`// Video Queue implementation
class VideoQueue {
  constructor() {
    this.videos = [];
    this.currentIndex = 0;
  }
  
  addVideo(video) {
    this.videos.push(video);
  }
  
  removeVideo(index) {
    this.videos.splice(index, 1);
    if (index < this.currentIndex) {
      this.currentIndex--;
    }
  }
  
  moveUp(index) {
    if (index > 0) {
      [this.videos[index], this.videos[index - 1]] = 
      [this.videos[index - 1], this.videos[index]];
      if (index === this.currentIndex) {
        this.currentIndex--;
      } else if (index - 1 === this.currentIndex) {
        this.currentIndex++;
      }
    }
  }
  
  moveDown(index) {
    if (index < this.videos.length - 1) {
      [this.videos[index], this.videos[index + 1]] = 
      [this.videos[index + 1], this.videos[index]];
      if (index === this.currentIndex) {
        this.currentIndex++;
      } else if (index + 1 === this.currentIndex) {
        this.currentIndex--;
      }
    }
  }
  
  getCurrentVideo() {
    return this.videos[this.currentIndex];
  }
  
  nextVideo() {
    if (this.currentIndex < this.videos.length - 1) {
      this.currentIndex++;
    }
  }
  
  getLength() {
    return this.videos.length;
  }
}`}
        </pre>
      </div>
    </div>
  );
};

export default function YouTubeQueueDemo() {
  const [queue, setQueue] = useState(videoLibrary.slice(0, 3));
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (queue.length > 0 && isPlaying) {
      const timer = setTimeout(() => {
        const newQueue = [...queue];
        newQueue.splice(current, 1);
        setQueue(newQueue);
        setCurrent((prev) => (prev >= newQueue.length ? 0 : prev));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [current, queue, isPlaying]);

  const handleSkip = () => {
    const newQueue = [...queue];
    newQueue.splice(current, 1);
    setQueue(newQueue);
    setCurrent((prev) => (prev >= newQueue.length ? 0 : prev));
  };

  const handleAdd = (video) => {
    if (!queue.includes(video)) {
      setQueue((prev) => [...prev, video]);
      setTimeout(() => {
        wrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleRemove = (index) => {
    const newQueue = queue.filter((_, i) => i !== index);
    setQueue(newQueue);
    if (index < current || current === newQueue.length) {
      setCurrent((prev) => Math.max(prev - 1, 0));
    }
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newQueue = [...queue];
    [newQueue[index - 1], newQueue[index]] = [newQueue[index], newQueue[index - 1]];
    setQueue(newQueue);
    if (index === current) setCurrent(current - 1);
    if (index - 1 === current) setCurrent(current + 1);
  };

  const moveDown = (index) => {
    if (index === queue.length - 1) return;
    const newQueue = [...queue];
    [newQueue[index + 1], newQueue[index]] = [newQueue[index], newQueue[index + 1]];
    setQueue(newQueue);
    if (index === current) setCurrent(current + 1);
    if (index + 1 === current) setCurrent(current - 1);
  };

  return (
    <div className="mt-4 mx-auto px-4 w-full max-w-screen-md overflow-hidden">
      <h4 className="text-sm font-medium text-gray-700 mb-2">▶️ YouTube-style Player Simulation</h4>

      <div ref={wrapperRef} className="relative  aspect-[15/6] bg-black rounded-lg overflow-hidden shadow-md mb-6">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          {isPlaying ? (
            <PauseCircle size={40} className="text-red-500 mb-4 cursor-pointer" onClick={() => setIsPlaying(false)} />
          ) : (
            <PlayCircle size={40} className="text-green-500 mb-4 cursor-pointer" onClick={() => setIsPlaying(true)} />
          )}
          <p className="text-base font-semibold text-center px-4">
            {queue[current] || 'No videos in queue'}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h5 className="text-sm font-medium text-gray-700 mb-1">Add More Videos</h5>
        <div className="flex flex-wrap gap-2">
          {videoLibrary.map((video, i) => (
            <button
              key={i}
              onClick={() => handleAdd(video)}
              className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 flex items-center gap-1"
            >
              <PlusCircle size={14} /> {video}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
          <div className="flex flex-col gap-4">
          <AnimatePresence initial={false} mode="wait">
            {queue.map((video, index) => (
              <motion.div
                key={video}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{
                  opacity: index === current ? 1 : 0.5,
                  scale: index === current ? 1 : 0.95
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className={`flex justify-between items-center p-3 w-full rounded-md shadow-sm border text-sm transition-colors duration-300 ${index === current ? 'bg-red-100 border-red-300' : 'bg-gray-100 border-gray-200'}`}
              >
                <PlayCircle className="text-red-500 mr-2" size={20} />
                <div className="text-gray-800 text-sm flex-1 text-left">
                  {index + 1}. {video}
                </div>
                <div className="flex justify-center gap-2 flex-wrap">
                  <button onClick={() => moveUp(index)} className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">
                    <ArrowUp size={14} />
                  </button>
                  <button onClick={() => moveDown(index)} className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">
                    <ArrowDown size={14} />
                  </button>
                  <button onClick={() => handleRemove(index)} className="text-xs px-2 py-1 bg-red-200 text-red-700 rounded hover:bg-red-300">
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={handleSkip}
        className="mt-2 px-4 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded shadow flex items-center gap-2"
      >
        <SkipForward size={16} /> Skip to Next
      </button>

      <div className="mt-6">
        <button 
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center gap-1 text-red-600 hover:text-red-800"
        >
          <span>{showExplanation ? 'Hide' : 'Show'} Implementation Details</span>
          <span>{showExplanation ? '▲' : '▼'}</span>
        </button>
        {showExplanation && explainYouTubeQueue()}
      </div>
    </div>
  );
}
