import React, { useState, useMemo } from 'react';
import { Volume2 } from 'lucide-react';
import BackButton from '../../../components/BackButton';
import AudioToggle from '../../../components/AudioToggle';
import { animalsData } from '../../../data/natureData';
import { useAudio } from '../../../contexts/AudioContext';

export default function AnimalSoundMatchGame() {
  const { playAnimalSound, playSound } = useAudio();
  const gameAnimals = useMemo(() => {
    return [...animalsData].sort(() => Math.random() - 0.5).slice(0, 4);
  }, []);

  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  const currentAnimal = gameAnimals[currentAnimalIndex];

  const handlePlaySound = () => {
    playAnimalSound(currentAnimal);
  };

  const handleAnimalGuess = (animal) => {
    if (animal.id === currentAnimal.id) {
      playSound('correct');
      setShowResult('correct');
      setCorrectCount(c => c + 1);
    } else {
      setShowResult('try-again');
    }

    setTimeout(() => {
      setShowResult(null);
      if (showResult === 'correct' || animal.id === currentAnimal.id) {
        if (currentAnimalIndex < gameAnimals.length - 1) {
          setCurrentAnimalIndex(i => i + 1);
        } else {
          setGameComplete(true);
        }
      }
    }, 1000);
  };

  const resetGame = () => {
    setCurrentAnimalIndex(0);
    setCorrectCount(0);
    setShowResult(null);
    setGameComplete(false);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <AudioToggle />

      <header className="pt-4 px-4">
        <div className="max-w-2xl mx-auto">
          <BackButton to="/animals" />
          <div className="text-center mt-6 mb-4">
            <h1 className="text-2xl font-bold text-foreground mb-2">
             Find Sound
            </h1>
            <p className="text-muted-foreground">Listen and find which animal makes this sound!</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        <div className="max-w-lg mx-auto">
          {!gameComplete ? (
            <>
              <div className="text-center mb-6">
                <span className="text-lg font-bold">{currentAnimalIndex + 1} / {gameAnimals.length}</span>
              </div>

              <button
                onClick={handlePlaySound}
                className="w-full flex items-center justify-center gap-4 px-8 py-6 bg-gradient-to-r from-violet-200 to-purple-200 rounded-2xl font-bold text-xl shadow-lg hover:scale-105 transition-transform mb-8"
              >
                <Volume2 className="w-8 h-8" />
                Play Sound
              </button>

              <div className="grid grid-cols-2 gap-4">
                {gameAnimals.map((animal) => (
                  <button
                    key={animal.id}
                    onClick={() => handleAnimalGuess(animal)}
                    className={`
                      p-4 rounded-2xl transition-all duration-300 shadow-md
                      ${showResult && animal.id === currentAnimal.id
                        ? 'bg-secondary/50 ring-4 ring-secondary'
                        : 'bg-white/80 hover:scale-105'}
                    `}
                  >
                    <span className="text-5xl block mb-2">{animal.emoji}</span>
                    <span className="font-bold">{animal.name}</span>
                  </button>
                ))}
              </div>

              {showResult && (
                <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
                  <div className={`text-8xl animate-pop-in ${showResult === 'correct' ? 'text-secondary' : 'text-muted-foreground'}`}>
                    {showResult === 'correct' ? '🎉' : '🤔'}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center animate-pop-in">
              <span className="text-6xl block mb-4">🎉</span>
              <h2 className="text-2xl font-bold mb-2">Well Done!</h2>
              <p className="text-lg text-muted-foreground mb-6">
                You got {correctCount} out of {gameAnimals.length}!
              </p>
              <button
                onClick={resetGame}
                className="px-8 py-4 bg-gradient-to-r from-secondary to-primary rounded-xl font-bold text-lg hover:scale-105 transition-transform"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}