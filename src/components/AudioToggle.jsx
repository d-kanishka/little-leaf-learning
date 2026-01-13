import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';

export default function AudioToggle() {
  const { audioEnabled, toggleAudio } = useAudio();

  return (
    <button
      onClick={toggleAudio}
      className={`
        fixed top-4 left-4 z-50 p-4 rounded-2xl shadow-lg transition-all duration-300
        border-2 hover:scale-105 active:scale-95
        ${audioEnabled 
          ? 'bg-secondary/80 border-secondary text-secondary-foreground' 
          : 'bg-muted border-muted-foreground/30 text-muted-foreground'
        }
      `}
      aria-label={audioEnabled ? 'Turn off sound' : 'Turn on sound'}
    >
      {audioEnabled ? (
        <Volume2 className="w-6 h-6" />
      ) : (
        <VolumeX className="w-6 h-6" />
      )}
    </button>
  );
}
