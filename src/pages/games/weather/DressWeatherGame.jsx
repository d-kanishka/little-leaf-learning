import React, { useState, useMemo } from 'react';
import BackButton from '../../../components/BackButton';
import AudioToggle from '../../../components/AudioToggle';
import { weatherData } from '../../../data/natureData';
import { useAudio } from '../../../contexts/AudioContext';

const allClothes = [
  { id: 'tshirt', name: 'T-shirt', emoji: '👕' },
  { id: 'shorts', name: 'Shorts', emoji: '🩳' },
  { id: 'sunglasses', name: 'Sunglasses', emoji: '🕶️' },
  { id: 'hat', name: 'Hat', emoji: '👒' },
  { id: 'raincoat', name: 'Raincoat', emoji: '🧥' },
  { id: 'umbrella', name: 'Umbrella', emoji: '☂️' },
  { id: 'boots', name: 'Boots', emoji: '👢' },
  { id: 'jacket', name: 'Jacket', emoji: '🧥' },
  { id: 'scarf', name: 'Scarf', emoji: '🧣' },
  { id: 'gloves', name: 'Gloves', emoji: '🧤' },
  { id: 'coat', name: 'Coat', emoji: '🧥' }
];

export default function DressWeatherGame() {
  const { playSound, speak } = useAudio();
  // Filter out stormy weather
  const weathers = useMemo(() => weatherData.filter(w => w.name !== 'Stormy').sort(() => Math.random() - 0.5), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedClothes, setSelectedClothes] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const currentWeather = weathers[currentIndex];

  const toggleCloth = (cloth) => {
    playSound('click');
    setSelectedClothes(prev => prev.includes(cloth.id) ? prev.filter(c => c !== cloth.id) : [...prev, cloth.id]);
  };

  const checkOutfit = () => {
    const correctClothes = currentWeather.clothes || [];
    
    // Get the names of selected clothes
    const selectedClothNames = selectedClothes.map(sc => {
      const cloth = allClothes.find(c => c.id === sc);
      return cloth?.name.toLowerCase();
    }).filter(name => name); 
    
    // Check if any selected clothes match the correct clothes
    const hasCorrect = selectedClothNames.some(selectedName => 
      correctClothes.some(correctCloth => 
        correctCloth.toLowerCase() === selectedName
      )
    );
    
    if (hasCorrect) { 
      playSound('correct'); 
      speak(`Great outfit for ${currentWeather.name}!`); 
    } else {
      playSound('wrong');
      speak(`Try different clothes for ${currentWeather.name}.`);
    }
    
    setShowResult(true);
  };

  const nextWeather = () => {
    if (currentIndex < weathers.length - 1) { 
      setCurrentIndex(i => i + 1); 
      setSelectedClothes([]); 
      setShowResult(false); 
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <AudioToggle />
      <header className="pt-4 px-4">
        <div className="max-w-2xl mx-auto">
          <BackButton to="/weather" />
          <div className="text-center mt-4 mb-2">
            <h1 className="text-2xl font-bold"> Dress for Weather</h1>
          </div>
        </div>
      </header>
      <main className="px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-6 mb-4 text-center">
            <span className="text-6xl block mb-2">{currentWeather?.emoji}</span>
            <h2 className="text-xl font-bold">{currentWeather?.name}</h2>
          </div>

          {!showResult ? (
            <>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {allClothes.map((cloth) => (
                  <button key={cloth.id} onClick={() => toggleCloth(cloth)}
                    className={`p-2 rounded-xl text-center ${selectedClothes.includes(cloth.id) ? 'bg-primary/40 ring-2 ring-primary' : 'bg-white shadow-md'}`}>
                    <span className="text-2xl block">{cloth.emoji}</span>
                    <span className="text-xs">{cloth.name}</span>
                  </button>
                ))}
              </div>
              <button 
                onClick={checkOutfit} 
                disabled={selectedClothes.length === 0} 
                className="w-full py-3 bg-gradient-to-r from-secondary to-primary rounded-xl font-bold disabled:opacity-50 hover:scale-105 transition-transform"
              >
                Check Outfit!
              </button>
            </>
          ) : (
            <div className="text-center">
              <p className="font-bold mb-2">Good clothes for {currentWeather?.name}:</p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {currentWeather?.clothes?.map((c, i) => (
                  <span key={c} className="px-3 py-1 bg-secondary/30 rounded-full">
                    {currentWeather.clothesEmoji?.[i]} {c}
                  </span>
                ))}
              </div>
              {currentIndex < weathers.length - 1 ? (
                <button 
                  onClick={nextWeather} 
                  className="px-6 py-3 bg-gradient-to-r from-secondary to-primary rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  Next →
                </button>
              ) : (
                <button 
                  onClick={() => { setCurrentIndex(0); setSelectedClothes([]); setShowResult(false); }} 
                  className="px-6 py-3 bg-gradient-to-r from-secondary to-primary rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  Play Again
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}