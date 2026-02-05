import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';

export default function BackButton({ to = '/', label = 'Back' }) {
  const navigate = useNavigate();
  const { playSound } = useAudio();

  const handleClick = () => {
    playSound('click');
    navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border-2 border-border text-foreground font-medium transition-all duration-200 hover:bg-muted hover:scale-105 touch-target"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}