import React, { useState, useEffect } from 'react';
import BackButton from '../../../components/BackButton';
import AudioToggle from '../../../components/AudioToggle';
import { weatherData } from '../../../data/natureData';
import { useAudio } from '../../../contexts/AudioContext';

export default function WeatherTodayGame() {
  const { playSound, speak } = useAudio();
  
  const [weatherOptions, setWeatherOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [hasChosen, setHasChosen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize weather options on component mount
  useEffect(() => {
    const shuffled = [...weatherData].sort(() => Math.random() - 0.5);
    setWeatherOptions(shuffled);
    setIsLoading(false);
  }, []);

  const handleSelect = (weather) => {
    playSound('click');
    setSelected(weather);
  };

  const handleConfirm = () => {
    if (!selected) return;
    playSound('correct');
    speak(`Great! You chose ${selected.name}. ${selected.description}`);
    setHasChosen(true);
  };

  const resetGame = () => {
    setSelected(null);
    setHasChosen(false);
    setIsLoading(true);
    
    // Reset with new random order
    setTimeout(() => {
      const shuffled = [...weatherData].sort(() => Math.random() - 0.5);
      setWeatherOptions(shuffled);
      setIsLoading(false);
    }, 50);
  };

  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-3xl animate-pulse">⛅ Loading weather...</div>
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
              🌤️ Today's Weather
            </h1>
            <p className="text-muted-foreground">What's the weather like today? Tap to choose!</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        <div className="max-w-lg mx-auto">
          {!hasChosen ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {weatherOptions.map((weather) => (
                  <button
                    key={weather.id}
                    onClick={() => handleSelect(weather)}
                    className={`
                      p-6 rounded-2xl transition-all duration-300 shadow-lg text-center
                      ${selected?.id === weather.id 
                        ? 'bg-primary/30 ring-4 ring-primary scale-105' 
                        : 'bg-white/90 hover:scale-105'}
                    `}
                  >
                    <span className="text-6xl block mb-3">{weather.emoji}</span>
                    <span className="text-lg font-bold">{weather.name}</span>
                  </button>
                ))}
              </div>

              {selected && (
                <button
                  onClick={handleConfirm}
                  className="w-full py-4 bg-gradient-to-r from-secondary to-primary rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-lg animate-pop-in"
                >
                  ✓ This is Today's Weather!
                </button>
              )}
            </>
          ) : (
                        <div className="text-center bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 animate-pop-in">
              <span className="text-8xl block mb-4">{selected?.emoji}</span>
              <h2 className="text-3xl font-bold mb-2">{selected?.name}</h2>
              <p className="text-lg text-muted-foreground mb-6">{selected?.description}</p>
              
              <div className="mt-8">
                <p className="font-bold mb-4 text-xl"> What to wear:</p>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {selected?.clothes?.map((cloth, i) => (
                    <div 
                      key={cloth} 
                      className="bg-white/90 rounded-2xl p-4 shadow-lg min-w-[100px] flex flex-col items-center"
                    >
                      <span className="text-4xl block mb-2">{selected.clothesEmoji?.[i] || '👕'}</span>
                      <span className="text-sm font-medium">{cloth}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={resetGame}
                className="px-10 py-4 bg-gradient-to-r from-secondary to-primary rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-lg"
              >
                Choose Again
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}