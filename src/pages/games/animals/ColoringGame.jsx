import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, Eraser } from 'lucide-react';
import BackButton from '../../../components/BackButton';
import AudioToggle from '../../../components/AudioToggle';
import { animalsData } from '../../../data/natureData';
import { useAudio } from '../../../contexts/AudioContext';

const colors = [
  '#FF6B6B', '#FF9999', // Reds
  '#4ECDC4', '#88D9D9', // Teals
  '#45B7D1', '#7DC8E8', // Blues
  '#96CEB4', '#B8E6B8', // Greens
  '#FFEAA7', '#FFF4CC', // Yellows
  '#DDA0DD', '#E8B8E8', // Purples
  '#98D8C8', '#B8E6D8', // Mint
  '#F7DC6F', '#FFEE99', // Gold
  '#BB8FCE', '#D5B8E8', // Lavender
  '#85C1E9', '#A9D4F5', // Light Blue
  '#F5B041', '#FFCC80', // Orange
  '#58D68D', '#8AEFB0', // Lime
  '#000000', '#333333', '#666666', // Blacks/Grays
];

const brushSizes = [3, 6, 10, 15, 20];

export default function AnimalColoringGame() {
  const { playSound } = useAudio();
  const canvasRef = useRef(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [brushSize, setBrushSize] = useState(10);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState(null);
  const [isEraser, setIsEraser] = useState(false);
  const [outlineImage, setOutlineImage] = useState(null);

  // Load image when animal is selected
  useEffect(() => {
    if (!selectedAnimal) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Load the outline image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.8;
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      // Save the outline image data for eraser
      const outlineCanvas = document.createElement('canvas');
      outlineCanvas.width = canvas.width;
      outlineCanvas.height = canvas.height;
      const outlineCtx = outlineCanvas.getContext('2d');
      outlineCtx.drawImage(img, x, y, img.width * scale, img.height * scale);
      setOutlineImage(outlineCanvas);
    };
    img.onerror = () => {
      // Fallback: draw emoji
      ctx.font = '150px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#000000';
      ctx.fillText(selectedAnimal.emoji, canvas.width / 2, canvas.height / 2);
      // Save the emoji outline
      const outlineCanvas = document.createElement('canvas');
      outlineCanvas.width = canvas.width;
      outlineCanvas.height = canvas.height;
      const outlineCtx = outlineCanvas.getContext('2d');
      outlineCtx.font = '150px serif';
      outlineCtx.textAlign = 'center';
      outlineCtx.textBaseline = 'middle';
      outlineCtx.fillStyle = '#000000';
      outlineCtx.fillText(selectedAnimal.emoji, canvas.width / 2, canvas.height / 2);
      setOutlineImage(outlineCanvas);
    };
    img.src = selectedAnimal.outlineImage;
  }, [selectedAnimal]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const startDraw = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const pos = getPos(e);
    setLastPos(pos);
    draw(e);
  };

  const endDraw = () => {
    setIsDrawing(false);
    setLastPos(null);
  };

  const draw = (e) => {
    if (!isDrawing || !selectedAnimal) return;
    e.preventDefault();
    
    const pos = getPos(e);
    const ctx = canvasRef.current.getContext('2d');
    
    if (isEraser) {
      // Eraser mode - use destination-out compositing to erase
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)'; // Any color works with destination-out
      ctx.fillStyle = 'rgba(0,0,0,1)';
    } else {
      // Drawing mode - normal compositing
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = selectedColor;
      ctx.fillStyle = selectedColor;
    }
    
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    if (lastPos) {
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    setLastPos(pos);
  };

  const handleSelectAnimal = (animal) => {
    playSound('click');
    setSelectedAnimal(animal);
  };

  const handleBack = () => {
    playSound('click');
    setSelectedAnimal(null);
  };

  const clearCanvas = () => {
    playSound('click');
    if (selectedAnimal) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Clear the entire canvas
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Redraw the outline from saved image
      if (outlineImage) {
        ctx.drawImage(outlineImage, 0, 0);
      } else {
        // Fallback: redraw outline
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.8;
          const x = (canvas.width - img.width * scale) / 2;
          const y = (canvas.height - img.height * scale) / 2;
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };
        img.onerror = () => {
          ctx.font = '150px serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#000000';
          ctx.fillText(selectedAnimal.emoji, canvas.width / 2, canvas.height / 2);
        };
        img.src = selectedAnimal.outlineImage;
      }
    }
  };

  const toggleEraser = () => {
    playSound('click');
    setIsEraser(!isEraser);
  };

  // Selection screen
  if (!selectedAnimal) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-100 to-orange-100 pb-24">
        <AudioToggle />
        <header className="pt-4 px-4">
          <div className="max-w-2xl mx-auto">
            <BackButton to="/animals" />
            <div className="text-center mt-4 mb-4">
              <h1 className="text-2xl font-bold text-foreground">🎨 Coloring Book</h1>
              <p className="text-muted-foreground">Choose an animal to color!</p>
            </div>
          </div>
        </header>
        <main className="px-4">
          <div className="max-w-lg mx-auto grid grid-cols-3 gap-3">
            {animalsData.map((animal) => (
              <button
                key={animal.id}
                onClick={() => handleSelectAnimal(animal)}
                className="bg-white rounded-2xl p-3 shadow-lg hover:scale-105 transition-transform border-2 border-white hover:border-primary"
              >
                <div className="aspect-square flex items-center justify-center bg-gray-50 rounded-xl mb-2">
                  <img 
                    src={animal.outlineImage} 
                    alt={animal.name}
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <span className="text-5xl hidden items-center justify-center">{animal.emoji}</span>
                </div>
                <span className="text-sm font-bold block text-center">{animal.name}</span>
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Coloring screen
  return (
    <div className="min-h-screen bg-background pb-24">
      <AudioToggle />
      <header className="pt-4 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-xl shadow-md hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold">Back</span>
          </button>
          <div className="text-center mt-2 mb-2">
            <h1 className="text-xl font-bold">Color the {selectedAnimal.name} {selectedAnimal.emoji}</h1>
          </div>
        </div>
      </header>
      <main className="px-4">
        <div className="max-w-lg mx-auto">
          {/* Eraser and Brush sizes */}
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={toggleEraser}
                className={`px-4 py-2 rounded-xl font-bold shadow-md transition-transform flex items-center gap-2 ${isEraser ? 'bg-red-100 text-red-700 ring-2 ring-red-300' : 'bg-white'}`}
              >
                <Eraser className="w-4 h-4" />
                {isEraser ? 'Eraser ON' : 'Eraser'}
              </button>
              <div className="flex items-center gap-1 bg-white/80 p-2 rounded-xl">
                <span className="text-sm font-medium px-2">Brush:</span>
                {brushSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { playSound('click'); setBrushSize(size); }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${brushSize === size ? 'ring-2 ring-primary scale-110' : ''}`}
                    style={{ 
                      backgroundColor: isEraser ? '#f87171' : selectedColor,
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <div 
                      className="rounded-full bg-current"
                      style={{ 
                        width: Math.max(2, size/2), 
                        height: Math.max(2, size/2),
                        backgroundColor: isEraser ? '#ffffff' : 'currentColor'
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Color palette */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2 text-center">Colors</div>
            <div className="grid grid-cols-8 gap-2 justify-center">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => { 
                    playSound('click'); 
                    setSelectedColor(c);
                    setIsEraser(false);
                  }}
                  className={`w-8 h-8 rounded-full border-3 transition-all ${selectedColor === c && !isEraser ? 'border-foreground scale-110 ring-2 ring-offset-1' : 'border-white'}`}
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
          </div>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="w-full max-w-[400px] mx-auto rounded-2xl shadow-lg bg-white touch-none border-4 border-white"
            onMouseDown={startDraw}
            onMouseUp={endDraw}
            onMouseMove={draw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchEnd={endDraw}
            onTouchMove={draw}
          />

          {/* Actions */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={clearCanvas}
              className="flex-1 py-3 bg-white rounded-xl font-bold shadow-md hover:scale-105 transition-transform"
            >
              🗑️ Clear Drawing
            </button>
            <button
              onClick={handleBack}
              className="flex-1 py-3 bg-gradient-to-r from-secondary to-primary rounded-xl font-bold shadow-md hover:scale-105 transition-transform"
            >
              ✓ Done Coloring
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}