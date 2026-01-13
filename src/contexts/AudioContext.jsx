/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [collectedLeaves, setCollectedLeaves] = useState(0);

  const toggleAudio = useCallback(() => {
    setAudioEnabled(prev => !prev);
  }, []);

  const speak = useCallback((text) => {
    if (!audioEnabled) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8; // Slower for kids
    utterance.pitch = 1.1; // Slightly higher pitch
    utterance.volume = 0.8;
    
    window.speechSynthesis.speak(utterance);
  }, [audioEnabled]);

  // Play animal-specific sounds with voice
  const playAnimalSound = useCallback((animal) => {
    if (!audioEnabled) return;
    
    window.speechSynthesis.cancel();
    
    const soundText = animal.soundText || `This is a ${animal.name}`;
    const utterance = new SpeechSynthesisUtterance(soundText);
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    utterance.volume = 0.9;
    
    window.speechSynthesis.speak(utterance);
  }, [audioEnabled]);

  const playSound = useCallback((soundType) => {
    if (!audioEnabled) return;
    
    // Simple sound effects using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (soundType) {
      case 'correct':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
        break;
      case 'click':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.08);
        break;
      case 'leaf':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1760, audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
      default:
        break;
    }
  }, [audioEnabled]);

  const collectLeaf = useCallback(() => {
    setCollectedLeaves(prev => prev + 1);
    playSound('leaf');
  }, [playSound]);

  const value = {
    audioEnabled,
    toggleAudio,
    speak,
    playSound,
    playAnimalSound,
    collectedLeaves,
    collectLeaf
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}