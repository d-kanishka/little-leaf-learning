import React, { createContext, useContext, useState, useCallback } from 'react';

const AudioContext = createContext();

// Animal sound patterns 
const animalSounds = {
  dog: { text: "Woof! Woof! Woof!", pitch: 0.8, rate: 1.0 },
  cat: { text: "Meow! Meow! Meow!", pitch: 1.3, rate: 0.9 },
  cow: { text: "Moo! Moo! Moo!", pitch: 0.6, rate: 0.7 },
  horse: { text: "Neigh! Neigh!", pitch: 0.7, rate: 0.8 },
  rabbit: { text: "Squeak! Squeak!", pitch: 1.5, rate: 1.2 },
  sparrow: { text: "Chirp! Chirp! Chirp!", pitch: 1.8, rate: 1.3 },
  hen: { text: "Cluck! Cluck! Cluck!", pitch: 1.2, rate: 1.1 },
  duck: { text: "Quack! Quack! Quack!", pitch: 1.1, rate: 1.0 },
  butterfly: { text: "Flutter! Flutter!", pitch: 1.6, rate: 1.2 },
  ladybug: { text: "Buzz! Buzz!", pitch: 1.7, rate: 1.4 }
};

export function AudioProvider({ children }) {
  const [audioEnabled, setAudioEnabled] = useState(true);

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

  // Play animal sounds
  const playAnimalSound = useCallback((animal) => {
    if (!audioEnabled) return;
    
    window.speechSynthesis.cancel();
    
    const soundKey = animal.soundUrl || animal.name.toLowerCase();
    const sound = animalSounds[soundKey] || { text: animal.name, pitch: 1.0, rate: 1.0 };
    
    const utterance = new SpeechSynthesisUtterance(sound.text);
    utterance.rate = sound.rate;
    utterance.pitch = sound.pitch;
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
      case 'water':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
      default:
        break;
    }
  }, [audioEnabled]);

  const value = {
    audioEnabled,
    toggleAudio,
    speak,
    playSound,
    playAnimalSound,
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