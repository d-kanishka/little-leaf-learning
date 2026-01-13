import React from 'react';
import { ArrowLeft, ArrowRight, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../contexts/AudioContext';

export default function NavigationButtons({
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  showGameButton = false,
  gamePath = '/games'
}) {
  const navigate = useNavigate();
  const { playSound } = useAudio();

  const handlePrev = () => {
    playSound('click');
    onPrev();
  };

  const handleNext = () => {
    playSound('click');
    onNext();
  };

  const handleGame = () => {
    playSound('click');
    navigate(gamePath);
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {/* Previous button */}
      <button
        onClick={handlePrev}
        disabled={!hasPrev}
        className={`
          flex items-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-200 touch-target
          ${hasPrev
            ? 'bg-secondary text-foreground hover:bg-secondary/90 hover:scale-105'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
          }
        `}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* Game button - shown at end of learning */}
      {showGameButton && !hasNext && (
        <button
          onClick={handleGame}
          className="flex items-center gap-2 px-6 py-4 rounded-xl bg-accent text-foreground font-semibold transition-all duration-200 hover:bg-accent/90 hover:scale-105 touch-target animate-soft-pulse"
        >
          <Gamepad2 className="w-5 h-5" />
          <span>Play Games!</span>
        </button>
      )}

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={!hasNext}
        className={`
          flex items-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-200 touch-target
          ${hasNext
            ? 'bg-primary text-foreground hover:bg-primary/90 hover:scale-105'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
          }
        `}
      >
        <span>Next</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
