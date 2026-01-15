import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import BackButton from '../components/BackButton';
import AudioToggle from '../components/AudioToggle';
import { animalGames, plantGames, weatherGames, seasonGames } from '../data/natureData';
import { useAudio } from '../contexts/AudioContext';

const allGames = [
  { category: '🐶 Animals', games: animalGames, color: 'from-amber-200 to-orange-200' },
  { category: '🌱 Plants', games: plantGames, color: 'from-green-200 to-emerald-200' },
  { category: '☀️ Weather', games: weatherGames, color: 'from-sky-200 to-blue-200' },
  { category: '🍂 Seasons', games: seasonGames, color: 'from-rose-200 to-pink-200' }
];

export default function GamesPage() {
  const navigate = useNavigate();
  const { playSound } = useAudio();

  const handleGameSelect = (path) => {
    playSound('click');
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-nature-gradient pb-16">
      <AudioToggle />

      <header className="pt-4 px-4">
        <div className="max-w-2xl mx-auto">
          <BackButton to="/" />
          
          <div className="text-center mt-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-accent animate-soft-pulse" />
              <h1 className="text-3xl font-extrabold text-foreground">
                 All Games
              </h1>
              <Sparkles className="w-6 h-6 text-accent animate-soft-pulse" />
            </div>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="max-w-lg mx-auto space-y-6">
          {allGames.map((section) => (
            <div key={section.category}>
              <h2 className="text-xl font-bold mb-3">{section.category}</h2>
              <div className="grid grid-cols-2 gap-3">
                {section.games.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => handleGameSelect(game.path)}
                    className={`p-4 bg-gradient-to-br ${section.color} rounded-2xl text-center hover:scale-105 transition-transform shadow-md`}
                  >
                    <span className="text-3xl block mb-2">{game.emoji}</span>
                    <span className="font-bold text-sm">{game.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
