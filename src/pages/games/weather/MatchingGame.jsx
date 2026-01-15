import React, { useState, useEffect } from 'react';
import BackButton from '../../../components/BackButton';
import AudioToggle from '../../../components/AudioToggle';
import { weatherData } from '../../../data/natureData';
import { useAudio } from '../../../contexts/AudioContext';

export default function WeatherMatchingGame() {
  const { playSound, speak } = useAudio();
  
  const [gameItems, setGameItems] = useState({ weathers: [], pictures: [] });
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [matched, setMatched] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize game items on component mount
  useEffect(() => {
    const items = [...weatherData].sort(() => Math.random() - 0.5).slice(0, 4);
    const pictures = [...items].sort(() => Math.random() - 0.5);
    setGameItems({ weathers: items, pictures: pictures });
  }, []);

  const handleWeatherClick = (weather) => {
    if (matched.includes(weather.id)) return;
    playSound('click');
    setSelectedWeather(weather);
  };

  const handlePictureClick = (picture) => {
    if (!selectedWeather || matched.includes(picture.id)) return;
    
    if (selectedWeather.id === picture.id) {
      playSound('correct');
      speak(`Yes! ${picture.name}!`);
      const newMatched = [...matched, picture.id];
      setMatched(newMatched);
      setSelectedWeather(null);

      if (newMatched.length === gameItems.weathers.length) {
        setTimeout(() => setShowSuccess(true), 500);
      }
    } else {
      playSound('wrong');
      setSelectedWeather(null);
    }
  };

  const resetGame = () => {
    setSelectedWeather(null);
    setMatched([]);
    setShowSuccess(false);
    
    // Re-shuffle game items
    setTimeout(() => {
      const items = [...weatherData].sort(() => Math.random() - 0.5).slice(0, 4);
      const pictures = [...items].sort(() => Math.random() - 0.5);
      setGameItems({ weathers: items, pictures: pictures });
    }, 50);
  };

  // Show loading while game items are being initialized
  if (gameItems.weathers.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-3xl animate-pulse">⛅ Loading game...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <AudioToggle />

      <header className="pt-4 px-4">
        <div className="max-w-2xl mx-auto">
          <BackButton to="/weather" />
          <div className="text-center mt-6 mb-4">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              🧩 Match the Weather
            </h1>
            <p className="text-muted-foreground">Match each weather to its picture!</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        <div className="max-w-lg mx-auto">
          {/* Weather names */}
          <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-3">
              {gameItems.weathers.map((weather) => {
                const isMatched = matched.includes(weather.id);
                const isSelected = selectedWeather?.id === weather.id;
                
                return (
                  <button
                    key={weather.id}
                    onClick={() => handleWeatherClick(weather)}
                    disabled={isMatched}
                    className={`
                      px-4 py-3 rounded-xl font-bold transition-all duration-300
                      ${isMatched 
                        ? 'bg-secondary/30 opacity-50' 
                        : isSelected
                          ? 'bg-primary/40 ring-4 ring-primary scale-105'
                          : 'bg-white shadow-md hover:scale-105'}
                    `}
                  >
                    {weather.emoji} {weather.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pictures */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              {gameItems.pictures.map((picture) => {
                const isMatched = matched.includes(picture.id);
                
                return (
                  <button
                    key={picture.id}
                    onClick={() => handlePictureClick(picture)}
                    disabled={isMatched}
                    className={`
                      rounded-2xl overflow-hidden transition-all duration-300 shadow-lg
                      ${isMatched 
                        ? 'ring-4 ring-secondary' 
                        : 'hover:scale-105'}
                    `}
                  >
                    <div className="relative aspect-square">
                      <img 
                        src={picture.image} 
                        alt={picture.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gray-100">
                              <span class="text-5xl">${picture.emoji}</span>
                            </div>
                          `;
                        }}
                      />
                      {isMatched && (
                        <div className="absolute inset-0 bg-secondary/30 flex items-center justify-center">
                          <span className="text-4xl">✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Success modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 text-center animate-pop-in mx-4">
            <span className="text-6xl block mb-4">🌈</span>
            <h2 className="text-2xl font-bold mb-2">Perfect!</h2>
            <p className="text-muted-foreground mb-4">You matched all the weather!</p>
            <button
              onClick={resetGame}
              className="px-8 py-3 bg-gradient-to-r from-secondary to-primary rounded-xl font-bold hover:scale-105 transition-transform"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}