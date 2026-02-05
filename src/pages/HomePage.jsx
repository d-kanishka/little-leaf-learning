import React from 'react';
import { Leaf, TreeDeciduous, Sun, Cloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AudioToggle from '../components/AudioToggle';
import { categories } from '../data/natureData';
import { useAudio } from '../contexts/AudioContext';

const categoryColors = {
  animals: 'from-amber-200 to-orange-300',
  plants: 'from-emerald-200 to-green-300',
  weather: 'from-sky-200 to-blue-300',
  seasons: 'from-rose-200 to-pink-300'
};

const categoryEmojis = {
  animals: '🦁',
  plants: '🌱',
  weather: '☀️',
  seasons: '🍂'
};

export default function HomePage() {
  const navigate = useNavigate();
  const { playSound } = useAudio();

  const handleCategoryClick = (path) => {
    playSound('click');
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-nature-gradient pb-20">
      <AudioToggle />

      {/* Header */}
      <header className="pt-12 pb-8 px-4 relative">
        <div className="max-w-2xl mx-auto text-center">
          {/* Decorative icons */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <TreeDeciduous className="w-8 h-8 text-secondary/90 animate-leaf-float" />
            <Sun className="w-10 h-10 text-accent/100 animate-soft-pulse" />
            <Cloud className="w-7 h-7 text-primary/100 animate-leaf-float" style={{ animationDelay: '0.5s' }} />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 animate-slide-up flex items-center justify-center gap-3">
            <span>Little Leaf Learning</span>
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Explore the beautiful world of nature!
          </p>
        </div>
      </header>

      {/* Category buttons */}
      <main className="px-6 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.path)}
                className={`
                  bg-gradient-to-br ${categoryColors[category.id]}
                  rounded-3xl p-8 shadow-lg
                  hover:scale-105 active:scale-95
                  transition-all duration-300
                  flex flex-col items-center justify-center
                  min-h-[160px]
                  animate-pop-in
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-6xl mb-4 drop-shadow-md">
                  {categoryEmojis[category.id]}
                </span>
                <span className="text-xl font-bold text-foreground">
                  {category.name}
                </span>
              </button>
            ))}
          </div>

          {/* Form Button */}
          <button onClick={() => {playSound('click'); navigate('/games-preference');}}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-pink-200 via-orange-100 via-green-200 to-cyan-200 rounded-3xl font-bold text-lg shadow-lg hover:scale-105 transition-transform mt-6 animate-slide-up"
          style={{ animationDelay: '0.5s' }}> Which Games Do You Like?
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-16 flex items-center justify-center gap-3 bg-gradient-to-t from-background to-transparent">
        {[...Array(5)].map((_, i) => (
          <Leaf
            key={i}
            className="w-5 h-5 text-secondary/100 animate-leaf-float"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </footer>
    </div>
  );
}


