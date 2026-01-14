import React, { useState, useMemo, useRef } from 'react';
import BackButton from '../../../components/BackButton';
import AudioToggle from '../../../components/AudioToggle';
import { animalsData, animalShelters } from '../../../data/natureData';
import { useAudio } from '../../../contexts/AudioContext';

export default function AnimalDragDropGame() {
  const { playSound, speak } = useAudio();
  
  const gameAnimals = useMemo(() => {
    return [...animalsData].sort(() => Math.random() - 0.5).slice(0, 4);
  }, []);

  const shelters = useMemo(() => {
    const uniqueShelters = [...new Set(gameAnimals.map(a => a.shelter))];
    return uniqueShelters.map(s => animalShelters.find(sh => sh.id === s)).filter(Boolean);
  }, [gameAnimals]);

  const [placedAnimals, setPlacedAnimals] = useState({});
  const [draggingAnimal, setDraggingAnimal] = useState(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [showSuccess, setShowSuccess] = useState(false);
  const containerRef = useRef(null);

  const handleDragStart = (e, animal) => {
    if (Object.values(placedAnimals).includes(animal.id)) return;
    
    e.preventDefault();
    playSound('click');
    setDraggingAnimal(animal);
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragPosition({ x: clientX, y: clientY });
  };

  const handleDragMove = (e) => {
    if (!draggingAnimal) return;
    e.preventDefault();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragPosition({ x: clientX, y: clientY });
  };

  const handleDragEnd = (e) => {
    if (!draggingAnimal) return;
    
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    
    const shelterElements = document.querySelectorAll('[data-shelter-id]');
    let droppedOnShelter = null;
    
    shelterElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        droppedOnShelter = el.getAttribute('data-shelter-id');
      }
    });

    if (droppedOnShelter) {
      if (draggingAnimal.shelter === droppedOnShelter) {
        playSound('correct');
        speak(`Yes! ${draggingAnimal.name} lives in a ${draggingAnimal.shelterName}!`);
        const newPlaced = { ...placedAnimals, [droppedOnShelter]: draggingAnimal.id };
        setPlacedAnimals(newPlaced);

        const allPlaced = gameAnimals.every(a => Object.values(newPlaced).includes(a.id));
        if (allPlaced) {
          setTimeout(() => setShowSuccess(true), 500);
        }
      }
    }
    
    setDraggingAnimal(null);
  };

  const getAnimalInShelter = (shelterId) => {
    const animalId = placedAnimals[shelterId];
    return gameAnimals.find(a => a.id === animalId);
  };

  const resetGame = () => {
    setPlacedAnimals({});
    setDraggingAnimal(null);
    setShowSuccess(false);
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-background pb-24 select-none"
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <AudioToggle />

      <header className="pt-4 px-4">
        <div className="max-w-2xl mx-auto">
          <BackButton to="/animals" />
          <div className="text-center mt-6 mb-4">
            <h1 className="text-2xl font-bold text-foreground mb-2">
             Match Shelter
            </h1>
            <p className="text-muted-foreground">Drag animals to their homes!</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        <div className="max-w-lg mx-auto">
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-3 text-center">🐾 Drag the Animals</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {gameAnimals.map((animal) => {
                const isPlaced = Object.values(placedAnimals).includes(animal.id);
                const isDragging = draggingAnimal?.id === animal.id;
                
                return (
                  <div
                    key={animal.id}
                    onMouseDown={(e) => handleDragStart(e, animal)}
                    onTouchStart={(e) => handleDragStart(e, animal)}
                    className={`
                      p-4 rounded-2xl cursor-grab active:cursor-grabbing transition-all duration-200
                      ${isPlaced 
                        ? 'opacity-30 pointer-events-none' 
                        : isDragging
                          ? 'opacity-50'
                          : 'bg-white/90 shadow-lg hover:scale-110 hover:shadow-xl border-3 border-primary/30'}
                    `}
                  >
                    <span className="text-5xl block mb-1">{animal.emoji}</span>
                    <span className="text-xs font-bold text-center block">{animal.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3 text-center">🏠 Drop Here</h3>
            <div className="grid grid-cols-2 gap-4">
              {shelters.map((shelter) => {
                const placedAnimal = getAnimalInShelter(shelter.id);
                return (
                  <div
                    key={shelter.id}
                    data-shelter-id={shelter.id}
                    className={`
                      p-4 rounded-2xl min-h-[160px] flex flex-col items-center justify-center transition-all duration-300 shadow-lg border-3 border-dashed
                      ${placedAnimal 
                        ? 'bg-secondary/30 border-secondary' 
                        : 'bg-gradient-to-br from-amber-100 to-orange-100 border-amber-400 hover:border-primary'}
                    `}
                  >
                    {placedAnimal ? (
                      <div className="text-center animate-pop-in">
                        <span className="text-5xl block mb-2">{placedAnimal.emoji}</span>
                        <span className="text-sm font-bold">{placedAnimal.name}</span>
                        <span className="text-xs text-secondary block">✓ {shelter.name}</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-2 rounded-xl overflow-hidden bg-white/50 flex items-center justify-center">
                          {shelter.image && shelter.image !== "" ? (
                            <>
                              <img 
                                src={shelter.image} 
                                alt={shelter.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  console.error(`Image failed to load: ${shelter.image}`);
                                  e.target.style.display = 'none';
                                  const emojiSpan = e.target.nextElementSibling;
                                  if (emojiSpan) emojiSpan.style.display = 'block';
                                }}
                              />
                              <span className="text-4xl" style={{ display: 'none' }}>{shelter.emoji}</span>
                            </>
                          ) : (
                            <span className="text-4xl">{shelter.emoji}</span>
                          )}
                        </div>
                        <span className="text-lg font-bold block">{shelter.name}</span>
                        <span className="text-xs text-muted-foreground block">Drop here</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {draggingAnimal && (
        <div
          className="fixed pointer-events-none z-50 animate-pulse"
          style={{
            left: dragPosition.x - 40,
            top: dragPosition.y - 40,
            transform: 'scale(1.2)'
          }}
        >
          <div className="bg-white/95 p-4 rounded-2xl shadow-2xl border-4 border-primary">
            <span className="text-5xl block">{draggingAnimal.emoji}</span>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 text-center animate-pop-in mx-4">
            <span className="text-6xl block mb-4">🎉</span>
            <h2 className="text-2xl font-bold mb-2">Amazing!</h2>
            <p className="text-muted-foreground mb-4">All animals found their homes!</p>
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