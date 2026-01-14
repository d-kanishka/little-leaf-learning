import React from 'react';
import { Volume2 } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';

export default function LearningCard({ item, showImage = true }) {
  const { speak, audioEnabled } = useAudio();

  // read the description text
  const handleSpeak = () => {
    speak(`${item.name}. ${item.description}`);
  };

  return (
    <div className="nature-card max-w-md mx-auto animate-pop-in">

      <div className="text-center mb-6">
        {showImage && item.image ? (
          <div className="w-48 h-48 mx-auto rounded-3xl overflow-hidden shadow-xl border-4 border-white/50">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <span className="text-[120px] block  drop-shadow-lg">
            {item.emoji}
          </span>
        )}
      </div>

     {/* Name */}
<h2 className="text-4xl font-extrabold text-center text-foreground mb-2">
  {/* show wont show emoji for plants or seasons */}
  {item.type !== 'plant' && 
   item.category !== 'plant' && 
   item.type !== 'tree' && 
   item.type !== 'flower' && 
   item.type !== 'vegetable' && 
   item.type !== 'fruit' &&
   !item.natureChange ? `${item.emoji} ` : ''}
  {item.name}
</h2>

      {/* Shelter info for animals */}
      {item.shelterName && (
        <p className="text-xl text-center text-blue-400 font-bold mb-3 ">
          Lives in: {item.shelterEmoji} {item.shelterName}
        </p>
      )}

      {/* Parts for plants */}
      {item.parts && (
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {item.parts.map((part, i) => (
            <span key={part} className="px-3 py-1 bg-secondary/30 rounded-full text-sm font-medium">
              {item.partsEmoji?.[i]} {part}
            </span>
          ))}
        </div>
      )}

      {/* Clothes for weather/seasons */}
      {item.clothes && (
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {item.clothes.map((cloth, i) => (
            <span key={cloth} className="px-3 py-1 bg-primary/30 rounded-full text-sm font-medium">
              {item.clothesEmoji?.[i]} {cloth}
            </span>
          ))}
        </div>
      )}

      {/* Nature change for seasons */}
      {item.natureChange && (
        <p className="text-lg text-center text-secondary font-semibold mb-3">
           {item.natureChange}
        </p>
      )}

      {/* Description */}
      <p className="text-lg text-center text-muted-foreground leading-relaxed mb-6 px-2">
        {item.description}
      </p>

      {/* Hear it button - always reads description */}
      {audioEnabled && (
        <button
          onClick={handleSpeak}
          className="sound-button w-full flex items-center justify-center gap-4 px-8 py-5 rounded-2xl text-foreground font-bold text-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg touch-target"
        >
          <Volume2 className="w-7 h-7" />
          <span> Listen</span>
        </button>
      )}
    </div>
  );
}

