import React, { useRef, useState, useEffect } from 'react';
import BackButton from '../../../components/BackButton';
import AudioToggle from '../../../components/AudioToggle';
import { useAudio } from '../../../contexts/AudioContext';

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#F7DC6F', '#85C1E9', '#000000', '#FFFFFF'];

export default function SeasonDrawingGame() {
  const { playSound, collectLeaf } = useAudio();
  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [boardType, setBoardType] = useState('white');
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(8);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = boardType === 'white' ? '#ffffff' : '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [boardType]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (clientX - rect.left) * (canvas.width / rect.width), y: (clientY - rect.top) * (canvas.height / rect.height) };
  };

  const startDraw = (e) => { e.preventDefault(); setIsDrawing(true); draw(e); };
  const endDraw = () => setIsDrawing(false);
  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = selectedColor;
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
  };

  const clearCanvas = () => {
    playSound('click');
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = boardType === 'white' ? '#ffffff' : '#1a1a2e';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const toggleBoard = () => {
    playSound('click');
    setBoardType(b => b === 'white' ? 'black' : 'white');
    setSelectedColor(boardType === 'white' ? '#FFFFFF' : '#000000');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', paddingBottom: '6rem' }}>
      <AudioToggle />
      <header style={{ paddingTop: '1rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <div style={{ maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <BackButton to="/seasons" />
          <div style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '0.5rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Drawing Board</h1>
            <p style={{ color: '#6b7280' }}>Draw anything about seasons!</p>
          </div>
        </div>
      </header>
      <main style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
        <div style={{ maxWidth: '32rem', marginLeft: 'auto', marginRight: 'auto' }}>
          
          {/* Board */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem', gap: '8px' }}>
            <button 
              onClick={toggleBoard} 
              style={{ 
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                fontWeight: 'bold',
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>{boardType === 'white' ? '⬛' : '⬜'}</span>
              <span>{boardType === 'white' ? 'Black Board' : 'White Board'}</span>
            </button>
            <button 
              onClick={clearCanvas} 
              style={{ 
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                fontWeight: 'bold',
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>🗑️</span>
              <span>Clear</span>
            </button>
          </div>
          
          {/* Color palette */}
          <div className="flex gap-2 mb-3 justify-center flex-wrap">
            {colors.map(c => (
              <button key={c} onClick={() => { playSound('click'); setSelectedColor(c); }}
                className={`w-8 h-8 rounded-full border-3 ${selectedColor === c ? 'border-primary scale-110' : 'border-gray-300'}`}
                style={{ backgroundColor: c }} />
            ))}
</div>
          
          {/* brush size selection */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-sm">Size:</span>
            {[4, 8, 15, 25].map(s => (
              <button key={s} onClick={() => setBrushSize(s)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${brushSize === s ? 'bg-primary text-white' : 'bg-white'}`}>
                <div className="rounded-full bg-current" style={{ width: s, height: s }} />
              </button>
            ))}
</div>
          
          {/* Canvas */}
          <canvas ref={canvasRef} width={350} height={350}
            className="w-full max-w-[350px] mx-auto rounded-2xl shadow-lg touch-none"
            style={{ backgroundColor: boardType === 'white' ? '#fff' : '#1a1a2e' }}
            onMouseDown={startDraw} onMouseUp={endDraw} onMouseMove={draw} onMouseLeave={endDraw}
></canvas>
          
          {/* button */}
           <button onClick={() => { playSound('correct'); collectLeaf(); }} className="w-full mt-4 py-3 bg-gradient-to-r from-secondary to-primary rounded-xl font-bold">
            I'm Done! ⭐ 
</button>
          
        </div>
      </main>
    </div>
  );
}