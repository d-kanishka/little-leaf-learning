import React, { useState, useEffect } from 'react';
import BackButton from '../../../components/BackButton';
import AudioToggle from '../../../components/AudioToggle';
import { plantsData } from '../../../data/natureData';
import { useAudio } from '../../../contexts/AudioContext';

export default function PlantTapPartGame() {
  const { playSound, speak } = useAudio();
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0);
  const [targetPart, setTargetPart] = useState('');
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(null);

  const currentPlant = plantsData[currentPlantIndex];

  useEffect(() => {
    if (currentPlant?.parts?.length > 0) {
      const randomPart = currentPlant.parts[Math.floor(Math.random() * currentPlant.parts.length)];
      setTargetPart(randomPart);
    }
  }, [currentPlantIndex, currentPlant]);

  const handlePartTap = (part) => {
    if (part === targetPart) {
      playSound('correct');
      setShowFeedback('correct');
      setScore(s => s + 1);
      
      setTimeout(() => {
        setShowFeedback(null);
        if (currentPlantIndex < plantsData.length - 1) {
          setCurrentPlantIndex(i => i + 1);
        } else {
          setCurrentPlantIndex(0);
        }
      }, 1000);
    } else {
      setShowFeedback('wrong');
      setTimeout(() => setShowFeedback(null), 500);
    }
  };

  const speakInstruction = () => {
    speak(`Tap the ${targetPart}`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <AudioToggle />

      <header className="pt-4 px-4">
        <div className="max-w-2xl mx-auto">
          <BackButton to="/plants" />
          <div className="text-center mt-6 mb-4">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Tap the Part
            </h1>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        <div className="max-w-lg mx-auto">
          <button
            onClick={speakInstruction}
            className="w-full px-6 py-4 bg-gradient-to-r from-green-200 to-emerald-200 rounded-2xl font-bold text-xl mb-6 shadow-md hover:scale-105 transition-transform"
          >
            🔊 Tap the {targetPart}
          </button>

          <div className="bg-white/80 rounded-3xl p-6 shadow-lg mb-6 text-center">
            <span className="text-6xl block mb-4">{currentPlant?.emoji}</span>
            <h2 className="text-xl font-bold">{currentPlant?.name}</h2>
          </div>

          {currentPlant?.parts && (
            <div className="grid grid-cols-2 gap-3">
              {currentPlant.parts.map((part, index) => (
                <button
                  key={part}
                  onClick={() => handlePartTap(part)}
                  className={`
                    p-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-md
                    ${showFeedback === 'correct' && part === targetPart
                      ? 'bg-secondary/50 scale-110'
                      : 'bg-white/80 hover:scale-105'}
                  `}
                >
                  <span className="text-3xl block mb-2">{currentPlant.partsEmoji?.[index] || '🌱'}</span>
                  {part}
                </button>
              ))}
            </div>
          )}


          {showFeedback && (
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
              <div className="text-8xl animate-pop-in">
                {showFeedback === 'correct' ? '🎉' : '🤔'}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}