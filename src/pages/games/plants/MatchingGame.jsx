import React, { useState, useEffect, useMemo } from 'react';
import BackButton from '../../../components/BackButton';
import AudioToggle from '../../../components/AudioToggle';
import { memoryGameImages } from '../../../data/natureData';
import { useAudio } from '../../../contexts/AudioContext';

export default function PlantMatchingGame() {
  const { playSound, speak } = useAudio();
  
  // Generate shuffled cards (8 pairs = 16 cards)
  const initialCards = useMemo(() => {
    const selectedImages = memoryGameImages.slice(0, 8);
    const pairs = [...selectedImages, ...selectedImages];
    return pairs
      .map((image, index) => ({
        id: `card-${index}`,
        imageId: image.id,
        image: image.image,
        emoji: image.emoji,
        name: image.name,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);
  }, []);

  const [cards, setCards] = useState(initialCards);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle card click
  const handleCardClick = (clickedCard) => {
    if (isChecking || clickedCard.isFlipped || clickedCard.isMatched) return;
    if (flippedCards.length >= 2) return;

    playSound('click');

    // Flip the card
    const updatedCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    // Check for match when 2 cards are flipped
    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      checkMatch(newFlippedCards[0], newFlippedCards[1]);
    }
  };

  // Check if two cards match
  const checkMatch = (card1, card2) => {
    if (card1.imageId === card2.imageId) {
      // Match found
      playSound('correct');
      speak(`You got it right! ${card1.name}!`);
      setMessage('You got it right! 🎉');

      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card =>
            card.imageId === card1.imageId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setFlippedCards([]);
        setIsChecking(false);
        setMessage('');
        setMatchedPairs(prev => prev + 1);
      }, 1000);
    } else {
      // No match
      setMessage('Try again!');
      
      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === card1.id || card.id === card2.id
              ? { ...card, isFlipped: false }
              : card
          )
        );
        setFlippedCards([]);
        setIsChecking(false);
        setMessage('');
      }, 1500);
    }
  };

  // Check if game is complete
  useEffect(() => {
    if (matchedPairs === 8) {
      setTimeout(() => {
        setShowSuccess(true);
        speak('Amazing! You matched all pairs!');
      }, 500);
    }
  }, [matchedPairs, speak]);

  // Reset game
  const resetGame = () => {
    playSound('click');
    const shuffled = [...initialCards]
      .map((card, index) => ({
        ...card,
        id: `card-${index}-${Date.now()}`,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);
    
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs(0);
    setIsChecking(false);
    setMessage('');
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <AudioToggle />

      <header className="pt-4 px-4">
        <div className="max-w-2xl mx-auto">
          <BackButton to="/plants" />
          <div className="text-center mt-6 mb-4">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Memory Match Game
            </h1>
            <p className="text-muted-foreground">Find all the matching pairs!</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        <div className="max-w-lg mx-auto">
        
          

          {/* Game Grid */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`
                  memory-card
                  ${card.isFlipped || card.isMatched ? 'flipped' : ''}
                  ${card.isMatched ? 'matched' : ''}
                  ${isChecking ? 'pointer-events-none' : 'cursor-pointer'}
                `}
              >
                <div className="memory-card-inner">
                  {/* Back of card */}
                  <div className="memory-card-back">
                    <span className="text-4xl">🌿</span>
                  </div>
                  
                  {/* Front of card */}
                  <div className="memory-card-front">
                    {card.image ? (
                      <img 
                        src={card.image} 
                        alt={card.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl">{card.emoji}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Restart Button */}
          <button
            onClick={resetGame}
            className="w-full py-3 bg-gradient-to-r from-secondary to-primary rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
          >
            🔄 Restart Game
          </button>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 text-center animate-pop-in mx-4 max-w-sm">
            <span className="text-6xl block mb-4">🎉</span>
            <h2 className="text-2xl font-bold mb-2">Amazing!</h2>
            <p className="text-muted-foreground mb-4">
              You found all {matchedPairs} pairs!
            </p>
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