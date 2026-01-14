import React, { useState } from 'react';
import BackButton from '../../../components/BackButton';
import AudioToggle from '../../../components/AudioToggle';
import { useAudio } from '../../../contexts/AudioContext';
import '../../../index.css';

export default function GrowingPlantGame() {
  const { playSound } = useAudio();
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const handlePlayAnimation = () => {
    playSound('click');
    setIsPlaying(false);
    setGameComplete(false);
    // Force reflow to restart animation
    setTimeout(() => {
      setIsPlaying(true);
      // Show completion after animation (10 seconds)
      setTimeout(() => {
        setGameComplete(true);
        playSound('correct');
      }, 10000);
    }, 10);
  };

  const resetGame = () => {
    playSound('click');
    setIsPlaying(false);
    setGameComplete(false);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <AudioToggle />

      <header className="pt-4 px-4">
        <div className="max-w-2xl mx-auto">
          <BackButton to="/seasons" />
          <div className="text-center mt-6 mb-4">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Growing Flower Plant
            </h1>
            <p className="text-muted-foreground">Watch the plant grow from seed to flower!</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        <div className="max-w-lg mx-auto">
          {!gameComplete ? (
            <>
              <div className="text-center mb-8">
                <button 
                  onClick={handlePlayAnimation}
                  className="px-8 py-4 bg-gradient-to-r from-secondary to-primary rounded-xl font-bold text-lg hover:scale-105 transition-transform">
                  {isPlaying ? 'Replay Animation' : 'Start Growing'}
                </button>
              </div>

              <div className={`plant-container ${isPlaying ? 'playing' : ''}`}>
                <div className="sun">
                  <div className="sunrays"></div>
                  <div className="circle"></div>
                </div>
                
                <div className="shadow"></div>
                
                <div className="pot"></div>
                
                {isPlaying && (
                  <>
                    <div className="water-jar"></div>
                    <div className="water"></div>
                  </>
                )}
                
                <div className="flower">
                  {isPlaying && (
                    <>
                      <div className="stem"></div>
                      <div className="leaf"></div>
                      <div className="petal petal-1"></div>
                      <div className="petal petal-2"></div>
                      <div className="petal petal-3"></div>
                      <div className="petal petal-4"></div>
                      <div className="petal petal-5"></div>
                      <div className="petal petal-6"></div>
                      <div className="dot"></div>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center animate-pop-in">
              <span className="text-6xl block mb-4">🌸</span>
              <h2 className="text-2xl font-bold mb-2 text-foreground">Your Plant is Fully Grown!</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Beautiful flower has bloomed! 🌺
              </p>
              <button
                onClick={resetGame}
                className="px-8 py-4 bg-gradient-to-r from-secondary to-primary rounded-xl font-bold text-lg hover:scale-105 transition-transform"
              >
                Grow Again
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}