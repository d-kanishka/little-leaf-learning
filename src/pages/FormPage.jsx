import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, CheckCircle, Gamepad2 } from 'lucide-react';
import BackButton from '../components/BackButton';
import AudioToggle from '../components/AudioToggle';
import { useAudio } from '../contexts/AudioContext';
import { 
  animalGames, 
  plantGames, 
  weatherGames, 
  seasonGames 
} from '../data/natureData';

export default function GamesPreferenceForm() {
  const navigate = useNavigate();
  const { playSound, speak } = useAudio();
  
  // State Management
  const [selectedGames, setSelectedGames] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Fix: Create unique IDs by adding category prefix
  const allGames = [
    ...animalGames.map(game => ({ ...game, uniqueId: `animal-${game.id}` })),
    ...plantGames.map(game => ({ ...game, uniqueId: `plant-${game.id}` })),
    ...weatherGames.map(game => ({ ...game, uniqueId: `weather-${game.id}` })),
    ...seasonGames.map(game => ({ ...game, uniqueId: `season-${game.id}` }))
  ];
  
  // Event Handlers
  const toggleGameSelection = (gameUniqueId) => {
    playSound('click');
    
    if (selectedGames.includes(gameUniqueId)) {
      setSelectedGames(selectedGames.filter(id => id !== gameUniqueId));
    } else {
      setSelectedGames([...selectedGames, gameUniqueId]);
    }
  };
  
  const selectAllGames = () => {
    playSound('click');
    const allGameIds = allGames.map(game => game.uniqueId);
    setSelectedGames(allGameIds);
    speak("All games selected!");
  };
  
  const clearSelection = () => {
    playSound('click');
    setSelectedGames([]);
    speak("Selection cleared!");
  };
  
  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedGames.length === 0) {
      speak("Please select at least one game you like!");
      return;
    }
    
    playSound('correct');
    setFormSubmitted(true);
    
    // Save to localStorage
    const preferences = {
      name,
      age,
      selectedGames,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('gamePreferences', JSON.stringify(preferences));
    
    speak(`Thank you! You selected ${selectedGames.length} games!`);
  };
  
  const handleReset = () => {
    playSound('click');
    setName('');
    setAge('');
    setSelectedGames([]);
    setFormSubmitted(false);
    speak("Form reset!");
  };
  
  // Success Screen
  if (formSubmitted) {
    const selectedGameObjects = allGames.filter(game => 
      selectedGames.includes(game.uniqueId)
    );
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 pb-24">
        <AudioToggle />
        
        <header className="pt-4 px-4">
          <div className="max-w-2xl mx-auto">
            <BackButton to="/" />
          </div>
        </header>
        
        <main className="px-4 mt-12">
          <div className="max-w-4xl mx-auto text-center animate-pop-in">
            <div className="bg-white/90 rounded-3xl p-10 shadow-2xl">
              <div className="text-8xl mb-6 animate-bounce">
                
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Game Preferences Saved!
              </h2>
              
              {name && (
                <p className="text-xl text-gray-600 mb-2">
                  Thank you, <span className="font-bold text-emerald-600">{name}</span>!
                </p>
              )}
              
            
              
              {/* Selected Games Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {selectedGameObjects.map((game) => (
                  <div 
                    key={game.uniqueId}
                    className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200"
                  >
                    <span className="text-3xl block mb-2">{game.emoji}</span>
                    <p className="font-semibold text-gray-800">{game.name}</p>
                    <p className="text-xs text-gray-600">{game.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  Submit Another
                </button>
                <button
                  onClick={() => navigate('/games')}
                  className="px-8 py-3 bg-pink-300 from-primary to-secondary text-white rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  Play Games Now
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  // Main Form
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-100 pb-24">
      <AudioToggle />
      
      <header className="pt-4 px-4">
        <div className="max-w-2xl mx-auto">
          <BackButton to="/" />
          
          <div className="text-center mt-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
             
              <h1 className="text-4xl font-bold text-gray-800">
                Which Games Do You Like?
              </h1>
        
            </div>
            <p className="text-lg text-gray-600">
              Select all the games you enjoy playing!
            </p>
          </div>
        </div>
      </header>
      
      <main className="px-4">
        <form 
          onSubmit={handleSubmit}
          className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
        >
          {/* Personal Info Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              About You 
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>
          
          {/* Games Selection Section */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                Select Your Favorite Games
              </h2>
              
              <div className="flex gap-3 mt-3 sm:mt-0">
                <button
                  type="button"
                  onClick={selectAllGames}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-sm font-medium hover:scale-105 transition-transform"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={clearSelection}
                  className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl text-sm font-medium hover:scale-105 transition-transform"
                >
                  Clear All
                </button>
              </div>
            </div>
            
           
            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allGames.map((game) => {
                const isSelected = selectedGames.includes(game.uniqueId);
                
                return (
                  <div
                    key={game.uniqueId}  // Use uniqueId to fix duplicate key error
                    onClick={() => toggleGameSelection(game.uniqueId)}
                    className={`
                      p-6 rounded-2xl border-3 cursor-pointer transition-all duration-300
                      ${isSelected 
                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400 scale-105 shadow-lg' 
                        : 'bg-white border-gray-200 hover:scale-105 hover:shadow-md hover:border-blue-200'
                      }
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{game.emoji}</div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-800">
                            {game.name}
                          </h3>
                          {isSelected && (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">
                          {game.description}
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">
                            {game.uniqueId.split('-')[0]} {/* Show category */}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <span className={`text-sm font-medium ${isSelected ? 'text-green-600' : 'text-gray-500'}`}>
                        {isSelected ? '' : ''}
                      </span>
                      <button
                        type="button"
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isSelected 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {isSelected ? '❤️' : '🤍'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Form Controls */}
          <div className="pt-8 border-t border-gray-200">
            {selectedGames.length === 0 && (
              <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
                <p className="text-center text-yellow-700 font-medium">
                  ⚠️ Please select at least one game you like!
                </p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-lg"
              >
                ↻ Reset Form
              </button>
              
              <button
                type="submit"
                disabled={selectedGames.length === 0}
                className={`flex-1 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3
                  ${selectedGames.length > 0
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:scale-105' 
                    : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-500 cursor-not-allowed'
                  }`}
              >
                <span>Save My Preferences</span>
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}