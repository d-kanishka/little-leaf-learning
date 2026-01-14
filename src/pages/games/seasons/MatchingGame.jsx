import React, { useState, useRef } from 'react';
import BackButton from '../../../components/BackButton';
import AudioToggle from '../../../components/AudioToggle';
import { seasonsData } from '../../../data/natureData';
import { useAudio } from '../../../contexts/AudioContext';

const worksheetItems = [
  { id: "pumpkin", name: "Pumpkin", emoji: "🎃", season: "Autumn" },
  { id: "snowman", name: "Snowman", emoji: "⛄", season: "Winter" },
  { id: "beach", name: "Beach", emoji: "🏖️", season: "Summer" },
  { id: "flower", name: "Flower", emoji: "🌸", season: "Spring" }
];

export default function SeasonMatchingGame() {
  const { playSound, speak } = useAudio();
  const containerRef = useRef(null);
  
  const [lines, setLines] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);
  const [startItem, setStartItem] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  // Get element center position
  const getElementCenter = (elementId) => {
    const element = document.getElementById(elementId);
    const container = containerRef.current;
    if (!element || !container) return null;
    
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    return {
      x: elementRect.left + elementRect.width / 2 - containerRect.left,
      y: elementRect.top + elementRect.height / 2 - containerRect.top
    };
  };

  // Get mouse/touch position
  const getPosition = (e) => {
    const container = containerRef.current;
    if (!container) return null;
    
    const containerRect = container.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);
    
    return {
      x: clientX - containerRect.left,
      y: clientY - containerRect.top
    };
  };

  // Start drawing
  const handleStartDrawing = (item, e) => {
    if (matchedPairs.some(pair => pair.itemId === item.id)) return;
    
    e.preventDefault();
    playSound('click');
    
    const startPos = getElementCenter(`item-${item.id}`);
    const currentPos = getPosition(e);
    
    if (startPos && currentPos) {
      setStartItem(item);
      setIsDrawing(true);
      setCurrentLine({
        start: startPos,
        end: currentPos
      });
    }
  };

  // Update drawing
  const handleDrawingMove = (e) => {
    if (!isDrawing || !currentLine) return;
    
    e.preventDefault();
    const pos = getPosition(e);
    
    if (pos) {
      setCurrentLine(prev => ({
        ...prev,
        end: pos
      }));
    }
  };

  // End drawing
  const handleEndDrawing = (e) => {
    if (!isDrawing || !currentLine || !startItem) {
      setIsDrawing(false);
      setCurrentLine(null);
      setStartItem(null);
      return;
    }
    
    e.preventDefault();
    
    const endPos = getPosition(e.changedTouches ? e.changedTouches[0] : e);
    if (!endPos) {
      setIsDrawing(false);
      setCurrentLine(null);
      setStartItem(null);
      return;
    }
    
    let releasedSeason = null;
    for (const season of seasonsData) {
      const seasonElement = document.getElementById(`season-${season.name}`);
      if (!seasonElement) continue;
      
      const seasonRect = seasonElement.getBoundingClientRect();
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      
      const mouseX = endPos.x + containerRect.left;
      const mouseY = endPos.y + containerRect.top;
      
      if (
        mouseX >= seasonRect.left &&
        mouseX <= seasonRect.right &&
        mouseY >= seasonRect.top &&
        mouseY <= seasonRect.bottom
      ) {
        releasedSeason = season;
        break;
      }
    }
    
    if (releasedSeason && startItem.season === releasedSeason.name) {
      // Correct match
      playSound('correct');
      speak("Yes!");
      
      const endCenter = getElementCenter(`season-${releasedSeason.name}`);
      if (endCenter) {
        setLines(prev => [...prev, {
          start: currentLine.start,
          end: endCenter,
          color: getSeasonColor(releasedSeason.name)
        }]);
        setMatchedPairs(prev => [...prev, { 
          itemId: startItem.id, 
          seasonId: releasedSeason.id 
        }]);
      }
    } else if (releasedSeason) {
      // Wrong match
      speak("Try again");
    }
    
    setIsDrawing(false);
    setCurrentLine(null);
    setStartItem(null);
    
    // Check if all matched
    if (matchedPairs.length + 1 === worksheetItems.length) {
      setTimeout(() => {
        setGameComplete(true);
        playSound('correct');
      }, 500);
    }
  };

  const getSeasonColor = (seasonName) => {
    switch(seasonName) {
      case 'Spring': return '#10B981';
      case 'Summer': return '#F59E0B';
      case 'Autumn': return '#92400E';
      case 'Winter': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const resetGame = () => {
    playSound('click');
    setLines([]);
    setMatchedPairs([]);
    setIsDrawing(false);
    setCurrentLine(null);
    setStartItem(null);
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
              Match the Season
            </h1>
            <p className="text-muted-foreground">Draw lines to connect items with their seasons!</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        <div className="max-w-6xl mx-auto">
          {!gameComplete ? (
            <>
              <div 
                ref={containerRef}
                className="relative min-h-[500px] bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-3xl p-6"
                onMouseMove={handleDrawingMove}
                onMouseUp={handleEndDrawing}
                onMouseLeave={handleEndDrawing}
                onTouchMove={handleDrawingMove}
                onTouchEnd={handleEndDrawing}
              >
                
                {/* SVG for drawing lines */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  {/* Draw completed lines */}
                  {lines.map((line, index) => (
                    <line
                      key={index}
                      x1={line.start.x}
                      y1={line.start.y}
                      x2={line.end.x}
                      y2={line.end.y}
                      stroke={line.color}
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  ))}
                  
                  {/* Draw current line while dragging */}
                  {currentLine && isDrawing && (
                    <line
                      x1={currentLine.start.x}
                      y1={currentLine.start.y}
                      x2={currentLine.end.x}
                      y2={currentLine.end.y}
                      stroke="#3B82F6"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="8 4"
                    />
                  )}
                </svg>

                {/* Game Content */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Left Column - Items */}
                  <div className="space-y-6">
                    {worksheetItems.map((item) => {
                      const isMatched = matchedPairs.some(pair => pair.itemId === item.id);
                      
                      return (
                        <div
                          key={item.id}
                          id={`item-${item.id}`}
                          className={`
                            relative p-6 rounded-2xl transition-all duration-300 shadow-md
                            ${isMatched 
                              ? 'bg-secondary/50 ring-4 ring-secondary' 
                              : 'bg-white/80 hover:scale-105'}
                          `}
                          onMouseDown={(e) => !isMatched && handleStartDrawing(item, e)}
                          onTouchStart={(e) => !isMatched && handleStartDrawing(item, e)}
                          style={{ 
                            cursor: isMatched ? 'default' : 'grab',
                            userSelect: 'none',
                            touchAction: 'none'
                          }}
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className="text-6xl mb-4">{item.emoji}</div>
                            <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                            {isMatched && (
                              <div className="mt-2">
                                <span className="text-secondary text-2xl">✓</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                            <div className="w-8 h-8 rounded-full bg-white border-4 border-gray-400 flex items-center justify-center shadow">
                              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Middle Column - Instructions */}
                  <div className="flex flex-col items-center justify-center">
                    
                  </div>

                  {/* Right Column - Seasons */}
                  <div className="space-y-6">
                    {seasonsData.map((season) => {
                      const isMatched = matchedPairs.some(pair => {
                        const matchedItem = worksheetItems.find(item => item.id === pair.itemId);
                        return matchedItem?.season === season.name;
                      });
                      
                      return (
                        <div
                          key={season.id}
                          id={`season-${season.name}`}
                          className={`
                            relative p-3 rounded-2xl transition-all duration-300 shadow-md
                            ${isMatched 
                              ? 'bg-secondary/50 ring-4 ring-secondary' 
                              : 'bg-white/80'}
                          `}
                          style={{
                            background: isMatched 
                              ? undefined 
                              : `linear-gradient(135deg, ${getSeasonColor(season.name)}20, rgba(255, 255, 255, 0.8))`,
                            userSelect: 'none'
                          }}
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className="text-6xl mb-4">{season.emoji}</div>
                            <h3 className="text-xl font-bold text-foreground">{season.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{season.natureChange}</p>
                            {isMatched && (
                              <div className="mt-2">
                                <span className="text-secondary text-2xl">✓</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                            <div className="w-8 h-8 rounded-full bg-white border-4 border-gray-400 flex items-center justify-center shadow">
                              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center animate-pop-in">
              <span className="text-6xl block mb-4">🎉</span>
              <h2 className="text-2xl font-bold mb-2 text-foreground">Well Done!</h2>
              <p className="text-lg text-muted-foreground mb-6">
                You matched all items correctly!
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