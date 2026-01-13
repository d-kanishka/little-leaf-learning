import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../contexts/AudioContext';

export default function NavButton({ to, emoji, label, variant = 'primary', className = '' }) {
  const navigate = useNavigate();
  const { playSound } = useAudio();

  const handleClick = () => {
    playSound('click');
    navigate(to);
  };

  const baseClass = variant === 'primary' ? 'btn-nature' : 'btn-nature-secondary';

  return (
    <button
      onClick={handleClick}
      className={`${baseClass} flex items-center justify-center gap-3 w-full ${className}`}
    >
      <span className="text-3xl">{emoji}</span>
      <span>{label}</span>
    </button>
  );
}
