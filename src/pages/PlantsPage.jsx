import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import BackButton from '../components/BackButton';
import AudioToggle from '../components/AudioToggle';
import LearningCard from '../components/LearningCard'; 
import NavigationButtons from '../components/NavigationButtons';
import { plantsData, plantGames } from '../data/natureData';
import { useAudio } from '../contexts/AudioContext';

export default function PlantsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGames, setShowGames] = useState(false);
  const currentPlant = plantsData[currentIndex];
  const navigate = useNavigate();
  const { playSound } = useAudio();

  const goNext = () => {
    if (currentIndex < plantsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleGameClick = (path) => {
    playSound('click');
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <AudioToggle />

      {/* Header */}
      <header className="pt-4 px-4">
        <div className="max-w-2xl mx-auto">
          <BackButton to="/" />
          
          <div className="text-center mt-6 mb-4">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Plants & Parts
            </h1>
          </div>
        </div>
      </header>

      {/* Learning content */}
      <main className="px-4 py-4">
        <LearningCard item={currentPlant} />
        
        <NavigationButtons
          onPrev={goPrev}
          onNext={goNext}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < plantsData.length - 1}
          showGameButton={false}
        />

        {/* Activities Section */}
        <div className="max-w-md mx-auto mt-6">
          <button
            onClick={() => setShowGames(!showGames)}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-200 to-emerald-200 rounded-2xl font-bold text-lg shadow-md hover:scale-105 transition-transform"
          >
            <Gamepad2 className="w-6 h-6" />
            {showGames ? 'Hide Activities' : 'Play Activities'}
          </button>

          {showGames && (
            <div className="grid grid-cols-2 gap-3 mt-4 animate-slide-up">
              {plantGames.map((game) => (
                <button
                  key={game.id}
                  onClick={() => handleGameClick(game.path)}
                  className="p-4 bg-white/80 rounded-xl shadow-md hover:scale-105 transition-transform text-center"
                >
                  <span className="text-3xl block mb-2">{game.emoji}</span>
                  <span className="font-bold text-sm block">{game.name}</span>
                  <span className="text-xs text-muted-foreground">{game.description}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}