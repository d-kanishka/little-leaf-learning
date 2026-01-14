import React, { useState, useRef } from 'react';
import BackButton from '../../../components/BackButton';
import AudioToggle from '../../../components/AudioToggle';
import { seasonsData } from '../../../data/natureData';
import { useAudio } from '../../../contexts/AudioContext';

export default function SeasonWheelGame() {
  const { speak, collectLeaf } = useAudio();

  const [rotation, setRotation] = useState(0);
  const [currentSeasonIndex, setCurrentSeasonIndex] = useState(0);

  const wheelRef = useRef(null);
  const isDragging = useRef(false);
  const startAngle = useRef(0);

  const getAngle = (event) => {
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const point = event.touches ? event.touches[0] : event;
    const x = point.clientX - centerX;
    const y = point.clientY - centerY;

    return Math.atan2(y, x) * (180 / Math.PI);
  };

  const handleStart = (e) => {
    isDragging.current = true;
    startAngle.current = getAngle(e);
  };

  const handleMove = (e) => {
    if (!isDragging.current) return;

    const angle = getAngle(e);
    const delta = angle - startAngle.current;
    startAngle.current = angle;

    const newRotation = rotation + delta;
    setRotation(newRotation);

    const normalized = ((newRotation % 360) + 360) % 360;
    const newIndex = Math.floor(normalized / 90) % 4;

    if (newIndex !== currentSeasonIndex) {
      setCurrentSeasonIndex(newIndex);
      speak(`${seasonsData[newIndex].name}! ${seasonsData[newIndex].natureChange}`);
      collectLeaf();
    }
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  const seasonBgColors = {
    0: 'from-green-100 to-emerald-200',
    1: 'from-yellow-100 to-orange-200',
    2: 'from-amber-200 to-orange-300',
    3: 'from-blue-100 to-cyan-200'
  };

  const currentSeason = seasonsData[currentSeasonIndex];

  return (
    <div
      className={`min-h-screen pb-24 transition-all duration-1000 bg-gradient-to-b ${seasonBgColors[currentSeasonIndex]}`}
    >
      <AudioToggle />

      <header className="pt-4 px-4">
        <div className="max-w-2xl mx-auto">
          <BackButton to="/seasons" />
          <div className="text-center mt-4 mb-2">
            <h1 className="text-2xl font-bold">🎡 Season Wheel</h1>
            <p className="text-muted-foreground">
              Rotate the wheel to explore seasons
            </p>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="max-w-lg mx-auto text-center">

          {/* Wheel */}
          <div className="relative w-64 h-64 mx-auto mb-6">
            <div
              ref={wheelRef}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              className="w-full h-full rounded-full bg-white shadow-2xl border-8 border-white overflow-hidden"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {seasonsData.map((season, i) => (
                <div
                  key={season.id}
                  className="absolute w-1/2 h-1/2 flex items-center justify-center"
                  style={{
                    top: i < 2 ? 0 : '50%',
                    left: i % 2 === 0 ? 0 : '50%',
                    transformOrigin:
                      i === 0
                        ? 'bottom right'
                        : i === 1
                        ? 'bottom left'
                        : i === 2
                        ? 'top right'
                        : 'top left'
                  }}
                >
                  <img
                    src={season.image}
                    alt={season.name}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                </div>
              ))}
            </div>

            {/* Center knob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              🔄
            </div>
          </div>

          {/* GIF box */}
          <div className="mb-6 bg-white/80 rounded-3xl p-4 shadow-xl">
            <img
              src={currentSeason.gifPlaceholder}
              alt={`${currentSeason.name} animation`}
              className="w-full h-40 max-w-full max-h-full object-contain rounded-xl"
            />
          </div>

          {/* Season info */}
          <div className="bg-white/80 rounded-3xl p-2 shadow-xl">
            <span className="text-2xl block mb-2">
              {currentSeason.emoji}
            </span>
            <h2 className="text-2xl font-bold">
              {currentSeason.name}
            </h2>
            <p className="text-muted-foreground">
              {currentSeason.natureChange}
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
