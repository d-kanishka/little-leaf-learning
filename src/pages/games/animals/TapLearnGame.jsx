import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import BackButton from '../../../components/BackButton';
import AudioToggle from '../../../components/AudioToggle';
import { animalsData } from '../../../data/natureData';
import { useAudio } from '../../../contexts/AudioContext';

export default function AnimalTapLearnGame() {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const { playAnimalSound, playSound } = useAudio(); 

  const filteredAnimals = animalsData.filter(animal => 
    !["Fish", "Snail", "Turtle"].includes(animal.name)
  );

  const handleAnimalTap = (animal) => {
    playSound('click');
    setSelectedAnimal(animal); 
    playAnimalSound(animal);
  };

  const handleSoundPlay = (animal) => {
    playAnimalSound(animal);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <AudioToggle />

      <header className="pt-4 px-4">
        <div className="max-w-2xl mx-auto">
          <BackButton to="/animals" />
          <div className="text-center mt-6 mb-4">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Tap & Learn
            </h1>
            <p className="text-blue-700">Tap an animal to hear its sound!</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        <div className="max-w-lg mx-auto">
          {/* Animal Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {filteredAnimals.map((animal) => (
              <button
                key={animal.id}
                onClick={() => handleAnimalTap(animal)}
                className={`
                  p-3 rounded-2xl transition-all duration-300 
                  ${selectedAnimal?.id === animal.id 
                    ? 'bg-blue-100 scale-110 ring-4 ring-blue-300 shadow-xl' 
                    : 'bg-white/80 hover:scale-105 shadow-md'}
                `}
              >
                <span className="text-4xl block mb-1">{animal.emoji}</span>
                <span className="text-sm font-bold block">{animal.name}</span>
              </button>
            ))}
          </div>

          {/* Selected Animal Info */}
          {selectedAnimal && (
            <div className="bg-white/90 rounded-3xl p-6 shadow-xl animate-pop-in">
              <div className="text-center mb-4">
                <span className="text-6xl block mb-2">{selectedAnimal.emoji}</span>
                <h2 className="text-2xl font-bold text-foreground">{selectedAnimal.name}</h2>
                <p className="text-lg text-blue-700 font-semibold">
                  Lives in: {selectedAnimal.shelterEmoji} {selectedAnimal.shelterName}
                </p>
              </div>
              
              <button
                onClick={() => handleSoundPlay(selectedAnimal)}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl font-bold hover:scale-105 transition-transform text-foreground"
              >
                <Volume2 className="w-6 h-6" />
                Hear {selectedAnimal.name} Sound Again
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}